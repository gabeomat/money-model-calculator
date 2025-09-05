import React from 'react';
import { Suggestion } from '../types';

interface SuggestionsListProps {
  suggestions: Suggestion[];
}

const SuggestionsList: React.FC<SuggestionsListProps> = ({ suggestions }) => {
  if (suggestions.length === 0) {
    return (
      <div className="card">
        <h2 style={{ marginBottom: '16px', color: '#1f2937' }}>Recommendations</h2>
        <div style={{ 
          padding: '24px', 
          textAlign: 'center', 
          backgroundColor: '#ecfdf5', 
          borderRadius: '8px',
          border: '1px solid #10b981'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '8px' }}>🎉</div>
          <h3 style={{ color: '#065f46', marginBottom: '8px' }}>Excellent Work!</h3>
          <p style={{ color: '#047857' }}>
            Your business metrics are healthy. Keep monitoring and maintain these strong fundamentals.
          </p>
        </div>
      </div>
    );
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getPriorityBg = (priority: string) => {
    switch (priority) {
      case 'high': return '#fef2f2';
      case 'medium': return '#fef3c7';
      case 'low': return '#eff6ff';
      default: return '#f9fafb';
    }
  };

  return (
    <div className="card">
      <h2 style={{ marginBottom: '24px', color: '#1f2937' }}>
        Recommendations to Fix Your Business
      </h2>
      
      <div style={{ marginBottom: '16px', fontSize: '14px', color: '#6b7280' }}>
        Based on your metrics, here are the specific levers you should pull to improve your business health:
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {suggestions.map((suggestion, index) => (
          <div 
            key={index}
            style={{
              border: `2px solid ${getPriorityColor(suggestion.priority)}`,
              borderRadius: '8px',
              padding: '20px',
              backgroundColor: getPriorityBg(suggestion.priority)
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <span 
                style={{
                  backgroundColor: getPriorityColor(suggestion.priority),
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  marginRight: '12px'
                }}
              >
                {suggestion.priority} Priority
              </span>
              <h3 style={{ color: '#1f2937', margin: 0 }}>{suggestion.title}</h3>
            </div>
            
            <p style={{ 
              color: '#374151', 
              marginBottom: '12px', 
              fontSize: '16px',
              lineHeight: '1.5'
            }}>
              {suggestion.description}
            </p>
            
            <div style={{ 
              backgroundColor: 'rgba(59, 130, 246, 0.1)', 
              padding: '12px', 
              borderRadius: '6px',
              marginBottom: '16px'
            }}>
              <strong style={{ color: '#1e40af' }}>Expected Impact: </strong>
              <span style={{ color: '#1f2937' }}>{suggestion.expectedImpact}</span>
            </div>
            
            <div>
              <h4 style={{ color: '#374151', marginBottom: '8px', fontSize: '14px' }}>
                Implementation Steps:
              </h4>
              <ul style={{ 
                paddingLeft: '20px', 
                color: '#4b5563', 
                fontSize: '14px',
                lineHeight: '1.6'
              }}>
                {suggestion.implementation.map((step, stepIndex) => (
                  <li key={stepIndex} style={{ marginBottom: '4px' }}>{step}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div style={{ 
        marginTop: '24px', 
        padding: '16px', 
        backgroundColor: '#f0f9ff', 
        borderRadius: '8px',
        border: '1px solid #0ea5e9'
      }}>
        <h4 style={{ color: '#0c4a6e', marginBottom: '8px' }}>💡 Pro Tip</h4>
        <p style={{ color: '#0369a1', fontSize: '14px', margin: 0 }}>
          Implement high-priority suggestions first. Test one change at a time so you can measure 
          the impact of each improvement. Don't try to fix everything at once.
        </p>
      </div>
    </div>
  );
};

export default SuggestionsList;