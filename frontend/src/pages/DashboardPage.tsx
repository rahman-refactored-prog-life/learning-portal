import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Card,
  Badge,
  ProgressBar,
  Button,
  Tabs,
  TopicCard,
  QuestionCard
} from '../components';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const recentTopics = [
    {
      id: 'arrays',
      title: 'Arrays & Strings',
      description: 'Master array manipulation and string operations',
      progress: 75,
      completedCount: 15,
      totalCount: 20,
      difficulty: 'Easy' as const,
      estimatedTime: '2 hours'
    },
    {
      id: 'linked-lists',
      title: 'Linked Lists',
      description: 'Learn about singly and doubly linked lists',
      progress: 40,
      completedCount: 8,
      totalCount: 20,
      difficulty: 'Medium' as const,
      estimatedTime: '3 hours'
    },
    {
      id: 'trees',
      title: 'Binary Trees',
      description: 'Understand tree structures and traversals',
      progress: 20,
      completedCount: 4,
      totalCount: 20,
      difficulty: 'Medium' as const,
      estimatedTime: '4 hours'
    }
  ];

  const recentQuestions = [
    {
      id: 'q1',
      title: 'Two Sum',
      difficulty: 'Easy' as const,
      companies: ['Google', 'Amazon'],
      tags: ['Array', 'Hash Table'],
      isCompleted: true,
      isBookmarked: false
    },
    {
      id: 'q2',
      title: 'Add Two Numbers',
      difficulty: 'Medium' as const,
      companies: ['Microsoft'],
      tags: ['Linked List', 'Math'],
      isCompleted: false,
      isBookmarked: true
    }
  ];

  return (
    <div className="dashboard-page" style={{ padding: 'var(--space-6)', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Welcome Section */}
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <h1 style={{ marginBottom: 'var(--space-2)' }}>Welcome back, {user?.username}! 👋</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-lg)' }}>
          Continue your learning journey
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: 'var(--space-4)',
        marginBottom: 'var(--space-8)'
      }}>
        <Card variant="elevated">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 'var(--space-4)' }}>
            <div>
              <h3 style={{ marginBottom: 'var(--space-2)' }}>Your Progress</h3>
              <p style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-accent)' }}>
                15 / 100
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>Topics completed</p>
            </div>
            <Badge color="success">15%</Badge>
          </div>
          <ProgressBar value={15} color="success" showLabel />
        </Card>

        <Card variant="elevated">
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <h3 style={{ marginBottom: 'var(--space-2)' }}>Current Streak</h3>
            <p style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-secondary)' }}>
              5 days 🔥
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>Keep it going!</p>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            {[1, 2, 3, 4, 5, 6, 7].map((day, i) => (
              <div
                key={day}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-base)',
                  backgroundColor: i < 5 ? 'var(--color-secondary)' : 'var(--bg-tertiary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'var(--font-size-xs)',
                  color: i < 5 ? 'white' : 'var(--text-tertiary)'
                }}
              >
                {i < 5 ? '✓' : ''}
              </div>
            ))}
          </div>
        </Card>

        <Card variant="elevated">
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <h3 style={{ marginBottom: 'var(--space-2)' }}>Questions Solved</h3>
            <p style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-primary)' }}>
              42 / 10,000
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
              <div>
                <Badge color="success" size="small">Easy: 25</Badge>
              </div>
              <div>
                <Badge color="warning" size="small">Medium: 15</Badge>
              </div>
              <div>
                <Badge color="danger" size="small">Hard: 2</Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content with Tabs */}
      <Tabs
        tabs={[
          {
            id: 'continue',
            label: 'Continue Learning',
            content: (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                  <h2>Recent Topics</h2>
                  <Button variant="tertiary" onClick={() => navigate('/demo')}>
                    View All Components →
                  </Button>
                </div>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
                  gap: 'var(--space-4)' 
                }}>
                  {recentTopics.map(topic => (
                    <TopicCard
                      key={topic.id}
                      {...topic}
                      onNavigate={() => console.log('Navigate to', topic.id)}
                    />
                  ))}
                </div>
              </div>
            )
          },
          {
            id: 'questions',
            label: 'Recent Questions',
            content: (
              <div>
                <h2 style={{ marginBottom: 'var(--space-4)' }}>Questions You've Attempted</h2>
                <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
                  {recentQuestions.map(question => (
                    <QuestionCard
                      key={question.id}
                      {...question}
                      onView={() => console.log('View', question.id)}
                      onBookmark={() => console.log('Bookmark', question.id)}
                    />
                  ))}
                </div>
              </div>
            )
          },
          {
            id: 'stats',
            label: 'Statistics',
            content: (
              <div>
                <h2 style={{ marginBottom: 'var(--space-4)' }}>Your Learning Statistics</h2>
                <div style={{ display: 'grid', gap: 'var(--space-6)' }}>
                  <Card>
                    <h3 style={{ marginBottom: 'var(--space-4)' }}>Progress by Topic</h3>
                    <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                          <span>Java Fundamentals</span>
                          <Badge color="success">75%</Badge>
                        </div>
                        <ProgressBar value={75} color="success" />
                      </div>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                          <span>Data Structures</span>
                          <Badge color="warning">45%</Badge>
                        </div>
                        <ProgressBar value={45} color="warning" />
                      </div>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                          <span>Algorithms</span>
                          <Badge color="danger">20%</Badge>
                        </div>
                        <ProgressBar value={20} color="danger" />
                      </div>
                    </div>
                  </Card>

                  <Card>
                    <h3 style={{ marginBottom: 'var(--space-4)' }}>Time Spent Learning</h3>
                    <div style={{ display: 'flex', gap: 'var(--space-6)', alignItems: 'center' }}>
                      <ProgressBar value={65} type="circular" size={120} color="primary" showLabel />
                      <div>
                        <p style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)' }}>
                          12.5 hours
                        </p>
                        <p style={{ color: 'var(--text-secondary)' }}>This week</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )
          }
        ]}
        variant="underline"
      />
    </div>
  );
};
