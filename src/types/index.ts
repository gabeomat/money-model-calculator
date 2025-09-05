export interface BusinessInputs {
  // Traffic & Acquisition
  adSpend: number;
  leads: number;
  cpl?: number; // Cost per lead (calculated if not provided)
  
  // Current Performance
  currentCAC: number;
  coldTrafficConversion: number; // % (e.g., 2 for 2%)
  
  // Core Offer
  coreOfferPrice: number;
  coreOfferConversion: number; // % conversion rate
  
  // Day 1 Financial Performance
  day1GrossProfitPerCustomer: number;
  grossMarginPercent: number;
  
  // Lifetime Value & Retention
  monthlyChurnPercent: number;
  refundRatePercent: number;
  averageLifetimeMonths?: number; // Calculated if not provided
  
  // Optional Offers (Levers)
  hasSLO: boolean;
  sloPrice?: number;
  sloTakeRate?: number; // %
  
  hasUpsells: boolean;
  upsellPrices?: number[];
  upsellTakeRates?: number[]; // %
  
  hasAnnualOption: boolean;
  annualPrice?: number;
  annualAttachRate?: number; // %
  
  hasDownsell: boolean;
  downsellPrice?: number;
  downsellTakeRate?: number; // %
}

export interface HealthMetrics {
  // The 6 Non-Negotiables
  thirtyDayPayback: number; // Should be >= 2.0
  ltvCacRatio: number; // Should be >= 3.0
  grossMargin: number; // Should be >= 50%
  monthlyChurn: number; // Should be <= 5%
  refundRate: number; // Should be <= 10%
  coldConversion: number; // Should be 1-3%
  
  // Supporting calculations
  currentLTV: number;
  customersFromSpend: number;
}

export type MetricStatus = 'green' | 'yellow' | 'red';

export interface MetricResult {
  value: number;
  status: MetricStatus;
  target: string;
  description: string;
}

export interface HealthDashboard {
  thirtyDayPayback: MetricResult;
  ltvCacRatio: MetricResult;
  grossMargin: MetricResult;
  monthlyChurn: MetricResult;
  refundRate: MetricResult;
  coldConversion: MetricResult;
  overallStatus: MetricStatus;
}

export interface Suggestion {
  priority: 'high' | 'medium' | 'low';
  lever: 'slo' | 'upsell' | 'annual' | 'downsell' | 'retention' | 'margin';
  title: string;
  description: string;
  expectedImpact: string;
  implementation: string[];
}