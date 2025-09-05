import { BusinessInputs, HealthMetrics, MetricResult, MetricStatus, HealthDashboard } from '../types';

export function calculateHealthMetrics(inputs: BusinessInputs): HealthMetrics {
  // Calculate basic derived values
  const customersFromSpend = inputs.leads * (inputs.coreOfferConversion / 100);
  const averageLifetimeMonths = inputs.averageLifetimeMonths || (1 / (inputs.monthlyChurnPercent / 100));
  
  // Calculate LTV (simplified)
  let baseLTV = inputs.coreOfferPrice * averageLifetimeMonths;
  
  // Add upsell value to LTV if they have upsells
  if (inputs.hasUpsells && inputs.upsellPrices && inputs.upsellTakeRates) {
    const upsellValue = inputs.upsellPrices.reduce((total, price, index) => {
      const takeRate = (inputs.upsellTakeRates?.[index] || 0) / 100;
      return total + (price * takeRate);
    }, 0);
    baseLTV += upsellValue;
  }
  
  const currentLTV = baseLTV;
  
  // Calculate the 6 core metrics
  const thirtyDayPayback = inputs.day1GrossProfitPerCustomer / inputs.currentCAC;
  const ltvCacRatio = currentLTV / inputs.currentCAC;
  const grossMargin = inputs.grossMarginPercent;
  const monthlyChurn = inputs.monthlyChurnPercent;
  const refundRate = inputs.refundRatePercent;
  const coldConversion = inputs.coldTrafficConversion;
  
  return {
    thirtyDayPayback,
    ltvCacRatio,
    grossMargin,
    monthlyChurn,
    refundRate,
    coldConversion,
    currentLTV,
    customersFromSpend,
  };
}

function getMetricStatus(value: number, target: number, isReversed: boolean = false): MetricStatus {
  const ratio = value / target;
  
  if (isReversed) {
    // For metrics where lower is better (churn, refunds)
    if (ratio <= 1) return 'green';
    if (ratio <= 1.5) return 'yellow';
    return 'red';
  } else {
    // For metrics where higher is better (payback, LTV:CAC, margin)
    if (ratio >= 1) return 'green';
    if (ratio >= 0.7) return 'yellow';
    return 'red';
  }
}

function getConversionStatus(conversion: number): MetricStatus {
  if (conversion >= 1 && conversion <= 3) return 'green';
  if (conversion >= 0.5 && conversion <= 5) return 'yellow';
  return 'red';
}

export function createHealthDashboard(metrics: HealthMetrics): HealthDashboard {
  const thirtyDayPayback: MetricResult = {
    value: metrics.thirtyDayPayback,
    status: getMetricStatus(metrics.thirtyDayPayback, 2.0),
    target: '≥ 2.0×',
    description: '30-Day Payback Multiple (GP ÷ CAC)',
  };
  
  const ltvCacRatio: MetricResult = {
    value: metrics.ltvCacRatio,
    status: getMetricStatus(metrics.ltvCacRatio, 3.0),
    target: '≥ 3:1',
    description: 'Lifetime Value to CAC Ratio',
  };
  
  const grossMargin: MetricResult = {
    value: metrics.grossMargin,
    status: getMetricStatus(metrics.grossMargin, 50),
    target: '≥ 50%',
    description: 'Gross Margin Percentage',
  };
  
  const monthlyChurn: MetricResult = {
    value: metrics.monthlyChurn,
    status: getMetricStatus(metrics.monthlyChurn, 5, true),
    target: '≤ 5%',
    description: 'Monthly Churn Rate',
  };
  
  const refundRate: MetricResult = {
    value: metrics.refundRate,
    status: getMetricStatus(metrics.refundRate, 10, true),
    target: '≤ 10%',
    description: 'Refund Rate',
  };
  
  const coldConversion: MetricResult = {
    value: metrics.coldConversion,
    status: getConversionStatus(metrics.coldConversion),
    target: '1-3%',
    description: 'Cold Traffic Conversion Rate',
  };
  
  // Determine overall status
  const allMetrics = [thirtyDayPayback, ltvCacRatio, grossMargin, monthlyChurn, refundRate, coldConversion];
  const redCount = allMetrics.filter(m => m.status === 'red').length;
  const yellowCount = allMetrics.filter(m => m.status === 'yellow').length;
  
  let overallStatus: MetricStatus = 'green';
  if (redCount > 0) overallStatus = 'red';
  else if (yellowCount > 2) overallStatus = 'red';
  else if (yellowCount > 0) overallStatus = 'yellow';
  
  return {
    thirtyDayPayback,
    ltvCacRatio,
    grossMargin,
    monthlyChurn,
    refundRate,
    coldConversion,
    overallStatus,
  };
}