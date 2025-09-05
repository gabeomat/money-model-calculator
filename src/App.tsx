import React, { useState, useMemo } from 'react';
import InputForm from './components/InputForm';
import HealthDashboardComponent from './components/HealthDashboard';
import SuggestionsList from './components/SuggestionsList';
import { BusinessInputs } from './types';
import { calculateHealthMetrics, createHealthDashboard } from './engine/metrics';
import { generateSuggestions } from './engine/suggestions';

const defaultInputs: BusinessInputs = {
  adSpend: 5000,
  leads: 500,
  currentCAC: 200,
  coldTrafficConversion: 2.0,
  coreOfferPrice: 97,
  coreOfferConversion: 20.0,
  day1GrossProfitPerCustomer: 400,
  grossMarginPercent: 70.0,
  monthlyChurnPercent: 8.0,
  refundRatePercent: 5.0,
  hasSLO: false,
  hasUpsells: false,
  hasAnnualOption: false,
  hasDownsell: false,
};

function App() {
  const [inputs, setInputs] = useState<BusinessInputs>(defaultInputs);

  const handleInputChange = (field: keyof BusinessInputs, value: number | boolean | number[]) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const { dashboard, suggestions } = useMemo(() => {
    const healthMetrics = calculateHealthMetrics(inputs);
    const dashboard = createHealthDashboard(healthMetrics);
    const suggestions = generateSuggestions(inputs, dashboard);
    
    return { dashboard, suggestions };
  }, [inputs]);

  return (
    <div className="container">
      <header style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ 
          color: '#1f2937', 
          marginBottom: '8px',
          fontSize: '36px',
          fontWeight: 'bold'
        }}>
          💰 Money Model Calculator
        </h1>
        <p style={{ 
          color: '#6b7280', 
          fontSize: '18px',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Based on Alex Hormozi's methodology. Analyze your business health and get specific 
          recommendations to improve your unit economics.
        </p>
      </header>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '24px',
        marginBottom: '32px',
        '@media (max-width: 1024px)': {
          gridTemplateColumns: '1fr'
        }
      } as React.CSSProperties}>
        <div>
          <InputForm 
            inputs={inputs} 
            onInputChange={handleInputChange} 
          />
        </div>
        
        <div>
          <HealthDashboardComponent dashboard={dashboard} />
        </div>
      </div>

      <SuggestionsList suggestions={suggestions} />

      <footer style={{ 
        marginTop: '48px', 
        padding: '24px', 
        textAlign: 'center', 
        borderTop: '1px solid #e5e7eb',
        color: '#6b7280',
        fontSize: '14px'
      }}>
        <p>
          Built with the principles from Alex Hormozi's "Money Models" • 
          Focus on the 6 non-negotiables for a healthy, scalable business
        </p>
        <div style={{ marginTop: '8px' }}>
          <strong>Remember:</strong> 30-day payback ≥ 2×, LTV:CAC ≥ 3:1, Gross margin ≥ 50%, Churn ≤ 5%, Refunds ≤ 10%, Cold conversion 1-3%
        </div>
      </footer>
    </div>
  );
}

export default App;