import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './SymptomChecker.css';

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [currentSymptom, setCurrentSymptom] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleAddSymptom = (e) => {
    e.preventDefault();
    if (currentSymptom.trim() && !symptoms.includes(currentSymptom.trim())) {
      setSymptoms([...symptoms, currentSymptom.trim()]);
      setCurrentSymptom('');
    }
  };

  const handleRemoveSymptom = (symptomToRemove) => {
    setSymptoms(symptoms.filter(s => s !== symptomToRemove));
  };

  const handleAnalyzeSymptoms = async () => {
    if (symptoms.length === 0) {
      setError('Please add at least one symptom');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const response = await fetch(`${API_URL}/api/symptom-check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze symptoms');
      }

      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      console.error('Error analyzing symptoms:', err);
      setError(err.message || 'Failed to analyze symptoms. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSymptoms([]);
    setCurrentSymptom('');
    setAnalysis(null);
    setError(null);
  };

  return (
    <div className="symptom-container">
      {/* Header */}
      <div className="symptom-header">
        <div className="symptom-header-flex">
          <div className="symptom-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <div className="symptom-title-section">
            <h2>Symptom Checker</h2>
            <p>AI-powered health symptom analysis</p>
          </div>
        </div>
        <p className="symptom-description">
          Describe your symptoms to get general information about possible conditions and recommendations.
        </p>
      </div>

      {/* Add Symptom Form */}
      <form onSubmit={handleAddSymptom} className="add-symptom-form">
        <div className="input-group">
          <div className="symptom-input-container">
            <input
              type="text"
              value={currentSymptom}
              onChange={(e) => setCurrentSymptom(e.target.value)}
              placeholder="Enter a symptom (e.g., headache, fever, cough)"
              className="symptom-input"
            />
            <div className="input-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
          </div>
          <button type="submit" className="add-button">
            Add
          </button>
        </div>
      </form>

      {/* Symptoms List */}
      {symptoms.length > 0 && (
        <div className="symptoms-list-section">
          <h3 className="symptoms-list-header">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span>Your Symptoms ({symptoms.length})</span>
          </h3>
          <div className="symptoms-grid">
            {symptoms.map((symptom, index) => (
              <div key={index} className="symptom-pill">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="symptom-text">{symptom}</span>
                <button onClick={() => handleRemoveSymptom(symptom)} className="remove-symptom">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="action-buttons">
        <button
          onClick={handleAnalyzeSymptoms}
          disabled={isLoading || symptoms.length === 0}
          className="analyze-button"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin" fill="none" viewBox="0 0 24 24">
                <circle style={{opacity: 0.25}} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path style={{opacity: 0.75}} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Analyzing Your Symptoms...</span>
            </>
          ) : (
            <>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <span>Analyze Symptoms</span>
            </>
          )}
        </button>

        {(symptoms.length > 0 || analysis) && (
          <button onClick={handleReset} className="reset-button">
            Reset
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="error-box">
          <div className="error-content-box">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="error-message">{error}</span>
          </div>
        </div>
      )}

      {/* Analysis Results */}
      {analysis && (
        <div className="analysis-section">
          <div className="analysis-divider">
            <h3 className="analysis-header">
              <div className="analysis-header-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span>Analysis Results</span>
            </h3>

            <div className="analysis-result-box">
              <div className="analysis-text">
                <ReactMarkdown>{analysis.analysis}</ReactMarkdown>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="disclaimer-box">
              <div className="disclaimer-content">
                <div className="disclaimer-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <p className="disclaimer-title">Important Disclaimer</p>
                  <p className="disclaimer-text">{analysis.disclaimer}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Notice */}
      <div className="emergency-box">
        <div className="emergency-content">
          <div className="emergency-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <p className="emergency-title">Emergency Warning</p>
            <p className="emergency-text">
              If you are experiencing severe symptoms, chest pain, difficulty breathing, or any medical emergency,
              call emergency services immediately or go to the nearest emergency room.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;
