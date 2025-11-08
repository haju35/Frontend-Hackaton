import { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import SymptomChecker from './components/SymptomChecker';
import './styles.css';

function App() {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div className="app-container">
      {/* Animated background elements */}
      <div className="background-blobs">
        <div className="blob blob-1 animate-blob"></div>
        <div className="blob blob-2 animate-blob animation-delay-2s"></div>
        <div className="blob blob-3 animate-blob animation-delay-4s"></div>
      </div>

      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="header-flex">
            <div className="header-logo-section">
              <div className="logo-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div className="header-title-section">
                <h1>AI Health Assistant</h1>
                <p>Your personal health companion powered by AI</p>
              </div>
            </div>
            <div className="header-disclaimer">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Not a substitute for medical advice</span>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <div className="tab-container">
          <button
            onClick={() => setActiveTab('chat')}
            className={`tab-button ${activeTab === 'chat' ? 'active' : ''}`}
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>Chat Assistant</span>
          </button>
          <button
            onClick={() => setActiveTab('symptoms')}
            className={`tab-button ${activeTab === 'symptoms' ? 'active' : ''}`}
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <span>Symptom Checker</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-wrapper">
          {activeTab === 'chat' ? <ChatInterface /> : <SymptomChecker />}
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-card">
            <p>This AI assistant provides general health information only.</p>
            <p>Always consult with qualified healthcare professionals for medical concerns.</p>
            <div className="footer-meta">
              <span>Powered by Google Gemini</span>
              <span>•</span>
              <span>Built with React & Pure CSS</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
