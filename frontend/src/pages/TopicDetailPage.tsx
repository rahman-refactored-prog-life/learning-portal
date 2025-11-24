import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import learningService, { type Topic } from '../services/learningService';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';
import './TopicDetailPage.css';

export const TopicDetailPage: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      setLoading(false);
    } catch (err: any) {
      setError(err.message || 'Failed to load topic');
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

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
          <ReactMarkdown>{topic.content}</ReactMarkdown>
        ) : (
          <div className="no-content">
            <p>Content coming soon...</p>
            <p className="hint">
              This topic will follow the Content_Methodology_v3_Framework with 10 comprehensive layers.
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="topic-actions">
        <Button onClick={handleBack} variant="secondary">
          ← Back to Topics
        </Button>
        <Button variant="primary">
          Mark as Complete
        </Button>
      </div>
    </div>
  );
};
