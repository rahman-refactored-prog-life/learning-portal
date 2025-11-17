import React, { useState } from 'react';
import './Sidebar.css';

interface SidebarSection {
  id: string;
  title: string;
  icon: string;
  items: SidebarItem[];
  progress?: number;
}

interface SidebarItem {
  id: string;
  title: string;
  completed: boolean;
  locked?: boolean;
}

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed = false, onToggle }) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['java']);

  const sections: SidebarSection[] = [
    {
      id: 'java',
      title: 'Java',
      icon: '☕',
      progress: 15,
      items: [
        { id: 'java-basics', title: 'Java Basics', completed: true },
        { id: 'oop', title: 'OOP Concepts', completed: true },
        { id: 'collections', title: 'Collections', completed: false },
        { id: 'streams', title: 'Streams & Lambda', completed: false },
        { id: 'concurrency', title: 'Concurrency', completed: false, locked: true },
      ],
    },
    {
      id: 'data-structures',
      title: 'Data Structures',
      icon: '🗂️',
      progress: 0,
      items: [
        { id: 'arrays', title: 'Arrays', completed: false },
        { id: 'linked-lists', title: 'Linked Lists', completed: false },
        { id: 'stacks-queues', title: 'Stacks & Queues', completed: false },
        { id: 'trees', title: 'Trees', completed: false, locked: true },
        { id: 'graphs', title: 'Graphs', completed: false, locked: true },
      ],
    },
    {
      id: 'algorithms',
      title: 'Algorithms',
      icon: '⚡',
      progress: 0,
      items: [
        { id: 'sorting', title: 'Sorting', completed: false },
        { id: 'searching', title: 'Searching', completed: false },
        { id: 'dynamic-programming', title: 'Dynamic Programming', completed: false, locked: true },
      ],
    },
    {
      id: 'system-design',
      title: 'System Design',
      icon: '🏗️',
      progress: 0,
      items: [
        { id: 'design-patterns', title: 'Design Patterns', completed: false },
        { id: 'scalability', title: 'Scalability', completed: false, locked: true },
        { id: 'case-studies', title: 'Case Studies', completed: false, locked: true },
      ],
    },
    {
      id: 'databases',
      title: 'Databases',
      icon: '🗄️',
      progress: 0,
      items: [
        { id: 'sql', title: 'SQL', completed: false },
        { id: 'nosql', title: 'NoSQL', completed: false, locked: true },
      ],
    },
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <aside className={`sidebar ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        {!isCollapsed && <h2 className="sidebar-title">Learning Path</h2>}
        <button className="sidebar-toggle" onClick={onToggle} aria-label="Toggle sidebar">
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      {/* Sidebar Content */}
      <nav className="sidebar-nav">
        {sections.map((section) => (
          <div key={section.id} className="sidebar-section">
            {/* Section Header */}
            <button
              className={`section-header ${expandedSections.includes(section.id) ? 'expanded' : ''}`}
              onClick={() => toggleSection(section.id)}
            >
              <span className="section-icon">{section.icon}</span>
              {!isCollapsed && (
                <>
                  <span className="section-title">{section.title}</span>
                  <span className="section-progress">{section.progress}%</span>
                  <span className="section-arrow">
                    {expandedSections.includes(section.id) ? '▼' : '▶'}
                  </span>
                </>
              )}
            </button>

            {/* Progress Bar */}
            {!isCollapsed && (
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${section.progress}%` }}
                ></div>
              </div>
            )}

            {/* Section Items */}
            {!isCollapsed && expandedSections.includes(section.id) && (
              <ul className="section-items">
                {section.items.map((item) => (
                  <li key={item.id} className="section-item">
                    <a
                      href={`#${item.id}`}
                      className={`item-link ${item.completed ? 'completed' : ''} ${
                        item.locked ? 'locked' : ''
                      }`}
                    >
                      <span className="item-status">
                        {item.completed ? '✓' : item.locked ? '🔒' : '○'}
                      </span>
                      <span className="item-title">{item.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>

      {/* Overall Progress */}
      {!isCollapsed && (
        <div className="sidebar-footer">
          <div className="overall-progress">
            <div className="progress-label">Overall Progress</div>
            <div className="progress-stats">15 / 100 topics</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '15%' }}></div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
