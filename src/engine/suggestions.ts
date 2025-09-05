import { BusinessInputs, HealthDashboard, Suggestion } from '../types';

export function generateSuggestions(inputs: BusinessInputs, dashboard: HealthDashboard): Suggestion[] {
  const suggestions: Suggestion[] = [];
  
  // Priority 1: Fix critical 30-day payback
  if (dashboard.thirtyDayPayback.status === 'red') {
    if (!inputs.hasUpsells) {
      suggestions.push({
        priority: 'high',
        lever: 'upsell',
        title: 'Add High-Value Upsell',
        description: 'Your 30-day payback is below 2×. Adding a $497-997 upsell at 15-20% take rate could fix this immediately.',
        expectedImpact: `Could improve payback from ${dashboard.thirtyDayPayback.value.toFixed(1)}× to ~2.2×`,
        implementation: [
          'Create a complementary high-value offer (coaching, done-for-you, advanced training)',
          'Present immediately after core purchase',
          'Target 15-20% take rate with proper positioning'
        ]
      });
    }
    
    if (!inputs.hasAnnualOption) {
      suggestions.push({
        priority: 'high',
        lever: 'annual',
        title: 'Add Annual Prepay Option',
        description: 'Annual prepay improves day-1 cash flow significantly. Offer 2 months free + bonus.',
        expectedImpact: `At 40% attach rate, could boost day-1 cash by $${(inputs.coreOfferPrice * 2).toFixed(0)} per customer`,
        implementation: [
          'Price annual at 10-12 months instead of 12 (2 months free)',
          'Add exclusive annual-only bonuses',
          'Present at checkout with urgency'
        ]
      });
    }
  }
  
  // Priority 2: Fix LTV:CAC ratio
  if (dashboard.ltvCacRatio.status === 'red' || dashboard.ltvCacRatio.status === 'yellow') {
    if (dashboard.monthlyChurn.status === 'red') {
      suggestions.push({
        priority: 'high',
        lever: 'retention',
        title: 'Fix Churn Crisis',
        description: `${dashboard.monthlyChurn.value}% monthly churn is killing your LTV. Focus on onboarding and early wins.`,
        expectedImpact: 'Reducing churn to 5% could double your LTV',
        implementation: [
          'Implement 30-day onboarding sequence',
          'Create "quick wins" in first 7 days',
          'Add milestone rewards for staying 90+ days',
          'Survey churning customers to find friction points'
        ]
      });
    }
  }
  
  // Priority 3: Improve conversion if too low
  if (dashboard.coldConversion.status === 'red') {
    if (!inputs.hasSLO) {
      suggestions.push({
        priority: 'medium',
        lever: 'slo',
        title: 'Add Self-Liquidating Offer (SLO)',
        description: 'Low cold traffic conversion suggests price/value disconnect. A $47 tripwire can warm traffic.',
        expectedImpact: 'Could improve overall conversion from cold traffic',
        implementation: [
          'Create $47 starter pack or mini-course',
          'Use SLO buyers to warm traffic for main offer',
          'Target 15-25% SLO conversion rate'
        ]
      });
    }
    
    if (!inputs.hasDownsell) {
      suggestions.push({
        priority: 'medium',
        lever: 'downsell',
        title: 'Add Downsell Recovery',
        description: 'Recover some revenue from people who decline your main offer.',
        expectedImpact: 'Could recover 8-12% of declines',
        implementation: [
          'Create payment plan version of main offer',
          'Trigger on main offer decline',
          'Price slightly higher for payment convenience'
        ]
      });
    }
  }
  
  // Priority 4: Improve margins if too low
  if (dashboard.grossMargin.status === 'red') {
    suggestions.push({
      priority: 'medium',
      lever: 'margin',
      title: 'Improve Unit Economics',
      description: `${dashboard.grossMargin.value}% gross margin makes scaling difficult. Review COGS and pricing.`,
      expectedImpact: 'Target 60%+ margins for healthy scaling',
      implementation: [
        'Audit all delivery costs (COGS)',
        'Consider price increase with value stacking',
        'Automate or outsource expensive manual processes',
        'Bundle low-margin items with high-margin ones'
      ]
    });
  }
  
  // Sort by priority
  return suggestions.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}