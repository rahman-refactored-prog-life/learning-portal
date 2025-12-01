import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState<string[]>(['java']);
  const [javaTopics, setJavaTopics] = useState<SidebarItem[]>([]);

  // Fetch Java topics on mount
  React.useEffect(() => {
    const fetchJavaTopics = async () => {
      try {
        const response = await fetch('http://localhost:2025/api/learning/modules');
        const modules = await response.json();
        const javaModule = modules.find((m: any) => m.type === 'JAVA');
        
        if (javaModule) {
          const topicsResponse = await fetch(`http://localhost:2025/api/learning/modules/${javaModule.id}/topics?page=0&size=100`);
          const topicsData = await topicsResponse.json();
          
          const topics = topicsData.content.map((topic: any) => ({
            id: topic.id.toString(),
            title: topic.title,
            completed: false,
            locked: false
          }));
          
          setJavaTopics(topics);
        }
      } catch (error) {
        console.error('Failed to fetch topics:', error);
        // Fallback to empty array
        setJavaTopics([]);
      }
    };
    
    fetchJavaTopics();
  }, []);

  const sections: SidebarSection[] = [
    {
      id: 'java',
      title: 'Java',
      icon: '☕',
      progress: 1,
      items: javaTopics.length > 0 ? javaTopics : [
        { id: 'loading', title: 'Loading topics...', completed: false, locked: true },
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
            <div className={`section-header ${expandedSections.includes(section.id) ? 'expanded' : ''}`}>
              <button
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  padding: 0, 
                  flex: 1, 
                  display: 'flex', 
                  alignItems: 'center',
                  cursor: 'pointer',
                  color: 'inherit'
                }}
                onClick={() => {
                  // Navigate to module page if it's Java
                  if (section.id === 'java') {
                    navigate('/modules/java');
                  } else {
                    toggleSection(section.id);
                  }
                }}
              >
                <span className="section-icon">{section.icon}</span>
                {!isCollapsed && (
                  <>
                    <span className="section-title">{section.title}</span>
                    <span className="section-progress">{section.progress}%</span>
                  </>
                )}
              </button>
              {!isCollapsed && section.id !== 'java' && (
                <span 
                  className="section-arrow"
                  onClick={() => toggleSection(section.id)}
                  style={{ cursor: 'pointer', padding: '0 8px' }}
                >
                  {expandedSections.includes(section.id) ? '▼' : '▶'}
                </span>
              )}
            </div>

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
                    <button
                      onClick={() => {
                        if (!item.locked && section.id === 'java') {
                          navigate(`/topics/${item.id}`);
                        }
                      }}
                      className={`item-link ${item.completed ? 'completed' : ''} ${
                        item.locked ? 'locked' : ''
                      }`}
                      disabled={item.locked}
                      style={{
                        background: 'none',
                        border: 'none',
                        width: '100%',
                        textAlign: 'left',
                        cursor: item.locked ? 'not-allowed' : 'pointer',
                        color: 'inherit',
                        padding: '8px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <span className="item-status">
                        {item.completed ? '✓' : item.locked ? '🔒' : '○'}
                      </span>
                      <span className="item-title">{item.title}</span>
                    </button>
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
