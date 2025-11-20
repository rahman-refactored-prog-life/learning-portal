import React, { useState } from 'react';
import {
  Button,
  Input,
  Card,
  Loading,
  ErrorMessage,
  Badge,
  ProgressBar,
  Tooltip,
  Modal,
  Tabs,
  Accordion,
  Toast,
  ToastProvider,
  useToast,
  Breadcrumbs,
  CodeBlock,
  Search,
  Filter,
  Pagination,
  QuestionCard,
  TopicCard
} from '../components';

const DemoContent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { showToast } = useToast();

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Components', path: '/demo' },
    { label: 'Demo' }
  ];

  const javaCode = `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`;

  return (
    <div style={{ padding: 'var(--space-6)', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>UI Components Demo</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-8)' }}>
        All 21 components showcased with live examples
      </p>

      {/* Breadcrumbs */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Breadcrumbs</h2>
        <Breadcrumbs items={breadcrumbItems} />
      </section>

      {/* Buttons */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Buttons</h2>
        <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="primary" disabled>Disabled</Button>
          <Button variant="primary" loading>Loading</Button>
        </div>
      </section>

      {/* Inputs */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Inputs</h2>
        <div style={{ display: 'grid', gap: 'var(--space-4)', maxWidth: '400px' }}>
          <Input type="text" placeholder="Enter text" />
          <Input type="email" placeholder="Enter email" />
          <Input type="password" placeholder="Enter password" />
          <Input type="text" placeholder="With error" error="This field is required" />
        </div>
      </section>

      {/* Badges */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Badges</h2>
        <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', alignItems: 'center' }}>
          <Badge color="success">Easy</Badge>
          <Badge color="warning">Medium</Badge>
          <Badge color="danger">Hard</Badge>
          <Badge color="info">Info</Badge>
          <Badge color="neutral">Neutral</Badge>
          <Badge color="success" variant="outlined">Outlined</Badge>
          <Badge color="warning" variant="dot">With Dot</Badge>
        </div>
      </section>

      {/* Progress Bars */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Progress Bars</h2>
        <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
          <ProgressBar value={25} color="primary" showLabel />
          <ProgressBar value={50} color="success" showLabel />
          <ProgressBar value={75} color="warning" showLabel />
          <ProgressBar value={100} color="danger" showLabel />
          <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
            <ProgressBar value={30} type="circular" size={80} />
            <ProgressBar value={60} type="circular" size={80} color="success" />
            <ProgressBar value={90} type="circular" size={80} color="warning" />
          </div>
        </div>
      </section>

      {/* Cards */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Cards</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-4)' }}>
          <Card variant="default">
            <h3>Default Card</h3>
            <p>This is a default card with some content.</p>
          </Card>
          <Card variant="elevated">
            <h3>Elevated Card</h3>
            <p>This card has a shadow effect.</p>
          </Card>
          <Card variant="outlined">
            <h3>Outlined Card</h3>
            <p>This card has a border.</p>
          </Card>
        </div>
      </section>

      {/* Tooltips */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Tooltips</h2>
        <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
          <Tooltip content="Tooltip on top" position="top">
            <Button>Top</Button>
          </Tooltip>
          <Tooltip content="Tooltip on bottom" position="bottom">
            <Button>Bottom</Button>
          </Tooltip>
          <Tooltip content="Tooltip on left" position="left">
            <Button>Left</Button>
          </Tooltip>
          <Tooltip content="Tooltip on right" position="right">
            <Button>Right</Button>
          </Tooltip>
        </div>
      </section>

      {/* Tabs */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Tabs</h2>
        <Tabs
          tabs={[
            { id: 'tab1', label: 'Overview', content: <div>Overview content goes here</div> },
            { id: 'tab2', label: 'Details', content: <div>Details content goes here</div> },
            { id: 'tab3', label: 'Settings', content: <div>Settings content goes here</div> }
          ]}
        />
      </section>

      {/* Accordion */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Accordion</h2>
        <Accordion
          items={[
            { id: '1', title: 'What is Java?', content: 'Java is a high-level, class-based, object-oriented programming language.' },
            { id: '2', title: 'What are data structures?', content: 'Data structures are ways of organizing and storing data efficiently.' },
            { id: '3', title: 'What is an algorithm?', content: 'An algorithm is a step-by-step procedure for solving a problem.' }
          ]}
        />
      </section>

      {/* Code Block */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Code Block</h2>
        <CodeBlock
          code={javaCode}
          language="java"
          showLineNumbers
          showCopyButton
        />
      </section>

      {/* Modal */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Modal</h2>
        <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Example Modal"
          size="medium"
        >
          <p>This is a modal dialog. You can put any content here.</p>
          <div style={{ marginTop: 'var(--space-4)', display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end' }}>
            <Button variant="tertiary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setIsModalOpen(false)}>Confirm</Button>
          </div>
        </Modal>
      </section>

      {/* Toast */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Toast Notifications</h2>
        <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
          <Button onClick={() => showToast('success', 'Success! Operation completed.')}>Success Toast</Button>
          <Button onClick={() => showToast('error', 'Error! Something went wrong.')}>Error Toast</Button>
          <Button onClick={() => showToast('warning', 'Warning! Please be careful.')}>Warning Toast</Button>
          <Button onClick={() => showToast('info', 'Info: Here is some information.')}>Info Toast</Button>
        </div>
      </section>

      {/* Search */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Search</h2>
        <Search
          placeholder="Search questions, topics, or concepts..."
          value={searchValue}
          onChange={setSearchValue}
          onSearch={(value) => console.log('Searching for:', value)}
          suggestions={['Arrays', 'Linked Lists', 'Binary Trees', 'Sorting Algorithms']}
        />
      </section>

      {/* Filter */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Filter</h2>
        <Filter
          options={[
            { value: 'easy', label: 'Easy', count: 150 },
            { value: 'medium', label: 'Medium', count: 300 },
            { value: 'hard', label: 'Hard', count: 100 }
          ]}
          selectedValues={[]}
          onChange={(values) => console.log('Selected:', values)}
          label="Difficulty"
        />
      </section>

      {/* Pagination */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Pagination</h2>
        <Pagination
          currentPage={currentPage}
          totalPages={10}
          onPageChange={setCurrentPage}
          pageSize={20}
          onPageSizeChange={(size) => console.log('Page size:', size)}
        />
      </section>

      {/* Question Card */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Question Card</h2>
        <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
          <QuestionCard
            id="q1"
            title="Two Sum Problem"
            difficulty="Easy"
            companies={['Google', 'Amazon', 'Facebook']}
            tags={['Array', 'Hash Table']}
            isCompleted={false}
            isBookmarked={false}
            onView={() => console.log('View question')}
            onBookmark={() => console.log('Bookmark toggled')}
          />
          <QuestionCard
            id="q2"
            title="Merge K Sorted Lists"
            difficulty="Hard"
            companies={['Microsoft', 'Apple']}
            tags={['Linked List', 'Divide and Conquer', 'Heap']}
            isCompleted={true}
            isBookmarked={true}
            onView={() => console.log('View question')}
            onBookmark={() => console.log('Bookmark toggled')}
          />
        </div>
      </section>

      {/* Topic Card */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Topic Card</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-4)' }}>
          <TopicCard
            id="arrays"
            title="Arrays & Strings"
            description="Learn about arrays, strings, and common operations"
            progress={75}
            completedCount={15}
            totalCount={20}
            difficulty="Easy"
            estimatedTime="2 hours"
            onNavigate={() => console.log('Navigate to topic')}
          />
          <TopicCard
            id="trees"
            title="Binary Trees"
            description="Master tree data structures and traversal algorithms"
            progress={30}
            completedCount={6}
            totalCount={20}
            difficulty="Medium"
            estimatedTime="4 hours"
            onNavigate={() => console.log('Navigate to topic')}
          />
        </div>
      </section>

      {/* Loading & Error */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Loading & Error States</h2>
        <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
          <Card>
            <Loading type="spinner" size="medium" />
          </Card>
          <Card>
            <Loading type="skeleton" count={3} />
          </Card>
          <ErrorMessage
            message="An error occurred while loading the data"
            type="banner"
            onRetry={() => console.log('Retry clicked')}
          />
        </div>
      </section>
    </div>
  );
};

export const ComponentDemoPage: React.FC = () => {
  return (
    <ToastProvider position="top-right">
      <DemoContent />
    </ToastProvider>
  );
};
