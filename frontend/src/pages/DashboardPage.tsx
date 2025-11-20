import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Card,
  Badge,
  ProgressBar,
  Button,
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
      progress: 75,
      completedCount: 15,
      totalCount: 20,
      difficulty: 'Easy' as const
    },
    {
      id: 'linked-lists',
      title: 'Linked Lists',
      progress: 40,
      completedCount: 8,
      totalCount: 20,
      difficulty: 'Medium' as const
    },
    {
      id: 'trees',
      title: 'Binary Trees',
      progress: 20,
      completedCount: 4,
      totalCount: 20,
      difficulty: 'Medium' as const
    }
  ];

  const recentQuestions = [
    {
      id: 'q1',
      title: 'Two Sum',
      difficulty: 'Easy' as const,
      companies: ['Google', 'Amazon'],
      isCompleted: true,
      isBookmarked: false
    },
    {
      id: 'q2',
      title: 'Add Two Numbers',
      difficulty: 'Medium' as const,
      companies: ['Microsoft'],
      isCompleted: false,
      isBookmarked: true
    }
  ];

  return (
    <div className="dashboard-page" style={{ padding: 'var(--space-8)', maxWidth: '1600px', margin: '0 auto' }}>
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
        <Card>
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

        <Card>
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

        <Card>
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <h3 style={{ marginBottom: 'var(--space-2)' }}>Questions Solved</h3>
            <p style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-primary)' }}>
              42 / 10,000
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
              <Badge color="success" size="small">Easy: 25</Badge>
              <Badge color="warning" size="small">Medium: 15</Badge>
              <Badge color="danger" size="small">Hard: 2</Badge>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Topics */}
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
          <h2>Continue Learning</h2>
          <Button variant="outline" onClick={() => navigate('/demo')}>
            View Component Demo →
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

      {/* Recent Questions */}
      <div>
        <h2 style={{ marginBottom: 'var(--space-4)' }}>Recent Questions</h2>
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
    </div>
  );
};
