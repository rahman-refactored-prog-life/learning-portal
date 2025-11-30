import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import learningService, { type Topic } from '../services/learningService';
import progressService, { type TopicProgress } from '../services/progressService';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';
// import { CodeTabs } from '../components/CodeTabs'; // TODO: Implement multi-language code tabs
import './TopicDetailPage.css';

export const TopicDetailPage: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [progress, setProgress] = useState<TopicProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [markingComplete, setMarkingComplete] = useState(false);
  const [allTopics, setAllTopics] = useState<Topic[]>([]);
  const [currentTopicIndex, setCurrentTopicIndex] = useState<number>(-1);

  useEffect(() => {
    if (topicId) {
      loadTopic(parseInt(topicId));
    }
  }, [topicId]);

  const loadTopic = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      const topicData = await learningService.getTopicById(id);
      setTopic(topicData);

      // Load all topics for pagination
      if (topicData.moduleId) {
        const topicsResponse = await learningService.getTopicsByModule(topicData.moduleId, 0, 100);
        setAllTopics(topicsResponse.content);
        const index = topicsResponse.content.findIndex(t => t.id === id);
        setCurrentTopicIndex(index);
      }

      // Load progress if user is logged in
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await progressService.startTopic(id);
          const progressData = await progressService.getTopicProgress(id);
          setProgress(progressData);
        } catch (err) {
          console.log('Progress not available:', err);
        }
      }

      setLoading(false);
    } catch (err: any) {
      setError(err.message || 'Failed to load topic');
      setLoading(false);
    }
  };

  const handleMarkComplete = async () => {
    if (!topic || !topicId) return;

    try {
      setMarkingComplete(true);
      const updatedProgress = await progressService.completeTopic(parseInt(topicId));
      setProgress(updatedProgress);
    } catch (err: any) {
      console.error('Failed to mark complete:', err);
    } finally {
      setMarkingComplete(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handlePrevious = () => {
    if (currentTopicIndex > 0) {
      const prevTopic = allTopics[currentTopicIndex - 1];
      navigate(`/topics/${prevTopic.id}`);
    }
  };

  const handleNext = () => {
    if (currentTopicIndex < allTopics.length - 1) {
      const nextTopic = allTopics[currentTopicIndex + 1];
      navigate(`/topics/${nextTopic.id}`);
    }
  };

  // TODO: Implement parseCodeBlocks for multi-language code tabs
  // const parseCodeBlocks = (content: string) => {
  //   const codeBlockRegex = /```(\w+)\n([\s\S]*?)```/g;
  //   const matches = [...content.matchAll(codeBlockRegex)];
  //   const solutions: { language: string; code: string }[] = [];
  //   matches.forEach(match => {
  //     solutions.push({
  //       language: match[1],
  //       code: match[2].trim()
  //     });
  //   });
  //   return solutions;
  // };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'BEGINNER':
        return 'var(--color-success)';
      case 'INTERMEDIATE':
        return 'var(--color-warning)';
      case 'ADVANCED':
        return 'var(--color-error)';
      default:
        return 'var(--color-neutral-500)';
    }
  };

  if (loading) {
    return <Loading text="Loading topic..." />;
  }

  if (error) {
    return (
      <div className="topic-detail-page">
        <ErrorMessage message={error} />
        <Button onClick={handleBack}>Go Back</Button>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="topic-detail-page">
        <ErrorMessage message="Topic not found" />
        <Button onClick={handleBack}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="topic-detail-page">
      {/* Breadcrumb Navigation */}
      <nav className="breadcrumb">
        <button onClick={handleBack} className="breadcrumb-link">
          ← {topic.moduleName || 'Back'}
        </button>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">{topic.title}</span>
      </nav>

      {/* Topic Header */}
      <div className="topic-header">
        <div className="topic-title-row">
          <h1>{topic.title}</h1>
          <span
            className="difficulty-badge"
            style={{ backgroundColor: getDifficultyColor(topic.difficulty) }}
          >
            {topic.difficulty}
          </span>
        </div>
        <p className="topic-description">{topic.description}</p>
        <div className="topic-meta">
          <span>⏱️ {topic.estimatedMinutes} minutes</span>
          {topic.questionCount !== undefined && topic.questionCount > 0 && (
            <span>📝 {topic.questionCount} practice questions</span>
          )}
          {topic.codeExampleCount !== undefined && topic.codeExampleCount > 0 && (
            <span>💻 {topic.codeExampleCount} code examples</span>
          )}
        </div>
      </div>

      {/* Topic Content */}
      <div className="topic-content">
        {topic.content ? (
          <ReactMarkdown
            components={{
              code({ className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || '');
                const isInline = !match;
                return !isInline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus as any}
                    language={match[1]}
                    PreTag="div"
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              a({ href, children, ...props }: any) {
                // Handle anchor links for table of contents
                if (href?.startsWith('#')) {
                  return (
                    <a
                      href={href}
                      onClick={(e) => {
                        e.preventDefault();
                        const id = href.substring(1);
                        const element = document.getElementById(id);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      {...props}
                    >
                      {children}
                    </a>
                  );
                }
                return <a href={href} {...props}>{children}</a>;
              },
              h2({ children, ...props }: any) {
                const text = String(children);
                const id = text.toLowerCase().replace(/[^\w]+/g, '-');
                return <h2 id={id} {...props}>{children}</h2>;
              },
              h3({ children, ...props }: any) {
                const text = String(children);
                const id = text.toLowerCase().replace(/[^\w]+/g, '-');
                return <h3 id={id} {...props}>{children}</h3>;
              },
            }}
          >
            {topic.content}
          </ReactMarkdown>
        ) : (
          <div className="no-content">
            <p>Content coming soon...</p>
            <p className="hint">
              This topic will follow the Content_Methodology_v3_Framework with 10 comprehensive layers.
            </p>
          </div>
        )}
      </div>

      {/* Progress Status */}
      {progress && (
        <div className="progress-status">
          {progress.isCompleted ? (
            <div className="completed-badge">
              ✓ Completed on {new Date(progress.completedAt!).toLocaleDateString()}
            </div>
          ) : (
            <div className="in-progress-badge">
              {Math.round(progress.completionPercentage)}% Complete
            </div>
          )}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="topic-navigation">
        <div className="nav-buttons">
          <Button 
            onClick={handlePrevious} 
            variant="secondary"
            disabled={currentTopicIndex <= 0}
          >
            ← Previous Topic
          </Button>
          <Button 
            onClick={handleNext} 
            variant="secondary"
            disabled={currentTopicIndex >= allTopics.length - 1}
          >
            Next Topic →
          </Button>
        </div>
        {currentTopicIndex >= 0 && (
          <div className="nav-info">
            Topic {currentTopicIndex + 1} of {allTopics.length}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="topic-actions">
        <Button onClick={handleBack} variant="secondary">
          ← Back to Topics
        </Button>
        {progress && !progress.isCompleted && (
          <Button 
            variant="primary" 
            onClick={handleMarkComplete}
            disabled={markingComplete}
          >
            {markingComplete ? 'Marking...' : 'Mark as Complete'}
          </Button>
        )}
      </div>
    </div>
  );
};
