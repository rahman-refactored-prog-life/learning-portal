import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card } from '../components';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-page" style={{ padding: 'var(--space-6)' }}>
      <h1>Welcome back, {user?.username}!</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>
        Continue your learning journey
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-4)' }}>
        <Card>
          <h3>Your Progress</h3>
          <p>15 / 100 topics completed</p>
        </Card>

        <Card>
          <h3>Current Streak</h3>
          <p>5 days 🔥</p>
        </Card>

        <Card>
          <h3>Questions Solved</h3>
          <p>42 / 10,000</p>
        </Card>
      </div>
    </div>
  );
};
