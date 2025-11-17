import React, { useState } from 'react';
import './GlobalHeader.css';

interface GlobalHeaderProps {
  user?: {
    username: string;
    email: string;
  };
  onLogout?: () => void;
}

export const GlobalHeader: React.FC<GlobalHeaderProps> = ({ user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  return (
    <header className="global-header">
      <div className="header-container">
        {/* Logo and Brand */}
        <div className="header-left">
          <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            <span className="hamburger-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
          <div className="header-logo">
            <span className="logo-icon">📚</span>
            <span className="logo-text">Learning Portal</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="header-center">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search topics, questions, or concepts..."
              className="search-input"
            />
          </div>
        </div>

        {/* User Actions */}
        <div className="header-right">
          {user ? (
            <div className="user-menu">
              <button className="user-avatar" onClick={toggleUserMenu} aria-label="User menu">
                <span className="avatar-text">
                  {user.username.charAt(0).toUpperCase()}
                </span>
              </button>
              {isUserMenuOpen && (
                <div className="user-dropdown">
                  <div className="user-info">
                    <div className="user-name">{user.username}</div>
                    <div className="user-email">{user.email}</div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item" onClick={() => {}}>
                    Profile
                  </button>
                  <button className="dropdown-item" onClick={() => {}}>
                    Settings
                  </button>
                  <button className="dropdown-item" onClick={() => {}}>
                    Progress
                  </button>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item logout" onClick={onLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <button className="btn-login">Login</button>
              <button className="btn-signup">Sign Up</button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <nav className="mobile-nav">
            <a href="#" className="mobile-nav-item">Dashboard</a>
            <a href="#" className="mobile-nav-item">Java</a>
            <a href="#" className="mobile-nav-item">Data Structures</a>
            <a href="#" className="mobile-nav-item">Algorithms</a>
            <a href="#" className="mobile-nav-item">System Design</a>
            <a href="#" className="mobile-nav-item">Databases</a>
          </nav>
        </div>
      )}
    </header>
  );
};
