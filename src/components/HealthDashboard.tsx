import React from 'react';
import { HealthDashboard, MetricResult } from '../types';

interface HealthDashboardProps {
  dashboard: HealthDashboard;
}

const MetricCard: React.FC<{ metric: MetricResult; formatValue: (value: number) => string }> = ({ metric, formatValue }) => (
  <div className={`metric-card ${metric.status}`}>
    <div className="metric-value">{formatValue(metric.value)}</div>
    <div className="metric-label">{metric.description}</div>
    <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
      Target: {metric.target}
    </div>
  </div>
);

const HealthDashboardComponent: React.FC<HealthDashboardProps> = ({ dashboard }) => {
  const formatPercent = (value: number) => `${value.toFixed(1)}%`;
  const formatRatio = (value: number) => `${value.toFixed(1)}×`;

  const getOverallStatusMessage = () => {
    switch (dashboard.overallStatus) {
      case 'green':
        return { message: '✅ Healthy Business - Ready to Scale', color: '#10b981' };
      case 'yellow':
        return { message: '⚠️ Some Issues - Fix Before Scaling', color: '#f59e0b' };
      case 'red':
        return { message: '🚨 Critical Issues - Do Not Scale', color: '#ef4444' };
    }
  };

  const statusMessage = getOverallStatusMessage();

  return (
    <div className="card">
      <div style={{ marginBottom: '24px', textAlign: 'center' }}>
        <h2 style={{ color: '#1f2937', marginBottom: '8px' }}>Business Health Dashboard</h2>
        <div 
          style={{ 
            padding: '12px 24px', 
            borderRadius: '6px', 
            backgroundColor: dashboard.overallStatus === 'green' ? '#ecfdf5' : 
                             dashboard.overallStatus === 'yellow' ? '#fef3c7' : '#fef2f2',
            border: `2px solid ${statusMessage.color}`,
            fontSize: '18px',
            fontWeight: 'bold',
            color: statusMessage.color
          }}
        >
          {statusMessage.message}
        </div>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '16px',
        marginBottom: '24px'
      }}>
        <MetricCard 
          metric={dashboard.thirtyDayPayback} 
          formatValue={formatRatio} 
        />
        <MetricCard 
          metric={dashboard.ltvCacRatio} 
          formatValue={(value) => `${value.toFixed(1)}:1`} 
        />
        <MetricCard 
          metric={dashboard.grossMargin} 
          formatValue={formatPercent} 
        />
        <MetricCard 
          metric={dashboard.monthlyChurn} 
          formatValue={formatPercent} 
        />
        <MetricCard 
          metric={dashboard.refundRate} 
          formatValue={formatPercent} 
        />
        <MetricCard 
          metric={dashboard.coldConversion} 
          formatValue={formatPercent} 
        />
      </div>

      <div style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>
        <h4 style={{ marginBottom: '8px', color: '#374151' }}>The 6 Non-Negotiables:</h4>
        <ul style={{ paddingLeft: '20px' }}>
          <li><strong>30-Day Payback:</strong> Get back 2× your CAC + COGS in gross profit within 30 days</li>
          <li><strong>LTV:CAC Ratio:</strong> Customer lifetime value should be at least 3× your customer acquisition cost</li>
          <li><strong>Gross Margin:</strong> Maintain at least 50% gross margins for sustainable scaling</li>
          <li><strong>Monthly Churn:</strong> Keep monthly churn below 5% for subscription businesses</li>
          <li><strong>Refund Rate:</strong> Keep refunds below 10% to maintain healthy unit economics</li>
          <li><strong>Cold Conversion:</strong> Convert 1-3% of cold traffic to first purchase</li>
        </ul>
      </div>
    </div>
  );
};

export default HealthDashboardComponent;