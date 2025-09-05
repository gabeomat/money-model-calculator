import React from 'react';
import { BusinessInputs } from '../types';

interface InputFormProps {
  inputs: BusinessInputs;
  onInputChange: (field: keyof BusinessInputs, value: number | boolean | number[]) => void;
}

const InputForm: React.FC<InputFormProps> = ({ inputs, onInputChange }) => {
  const handleNumberChange = (field: keyof BusinessInputs) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    onInputChange(field, value);
  };

  const handleCheckboxChange = (field: keyof BusinessInputs) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(field, e.target.checked);
  };

  return (
    <div className="card">
      <h2 style={{ marginBottom: '24px', color: '#1f2937' }}>Current Business Data</h2>
      
      {/* Core Performance Section */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ marginBottom: '16px', color: '#374151', borderBottom: '2px solid #e5e7eb', paddingBottom: '8px' }}>
          Traffic & Acquisition
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
          <div className="input-group">
            <label>Monthly Ad Spend ($)</label>
            <input
              type="number"
              value={inputs.adSpend}
              onChange={handleNumberChange('adSpend')}
              placeholder="5000"
            />
          </div>
          <div className="input-group">
            <label>Monthly Leads</label>
            <input
              type="number"
              value={inputs.leads}
              onChange={handleNumberChange('leads')}
              placeholder="500"
            />
          </div>
          <div className="input-group">
            <label>Current CAC ($)</label>
            <input
              type="number"
              value={inputs.currentCAC}
              onChange={handleNumberChange('currentCAC')}
              placeholder="200"
            />
          </div>
          <div className="input-group">
            <label>Cold Traffic Conversion (%)</label>
            <input
              type="number"
              step="0.1"
              value={inputs.coldTrafficConversion}
              onChange={handleNumberChange('coldTrafficConversion')}
              placeholder="2.0"
            />
          </div>
        </div>
      </div>

      {/* Core Offer Section */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ marginBottom: '16px', color: '#374151', borderBottom: '2px solid #e5e7eb', paddingBottom: '8px' }}>
          Core Offer Performance
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
          <div className="input-group">
            <label>Core Offer Price ($)</label>
            <input
              type="number"
              value={inputs.coreOfferPrice}
              onChange={handleNumberChange('coreOfferPrice')}
              placeholder="97"
            />
          </div>
          <div className="input-group">
            <label>Core Offer Conversion (%)</label>
            <input
              type="number"
              step="0.1"
              value={inputs.coreOfferConversion}
              onChange={handleNumberChange('coreOfferConversion')}
              placeholder="20.0"
            />
          </div>
          <div className="input-group">
            <label>Day-1 Gross Profit per Customer ($)</label>
            <input
              type="number"
              value={inputs.day1GrossProfitPerCustomer}
              onChange={handleNumberChange('day1GrossProfitPerCustomer')}
              placeholder="400"
            />
          </div>
          <div className="input-group">
            <label>Gross Margin (%)</label>
            <input
              type="number"
              step="0.1"
              value={inputs.grossMarginPercent}
              onChange={handleNumberChange('grossMarginPercent')}
              placeholder="70.0"
            />
          </div>
        </div>
      </div>

      {/* Retention & Lifetime */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ marginBottom: '16px', color: '#374151', borderBottom: '2px solid #e5e7eb', paddingBottom: '8px' }}>
          Retention & Lifetime Value
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
          <div className="input-group">
            <label>Monthly Churn Rate (%)</label>
            <input
              type="number"
              step="0.1"
              value={inputs.monthlyChurnPercent}
              onChange={handleNumberChange('monthlyChurnPercent')}
              placeholder="8.0"
            />
          </div>
          <div className="input-group">
            <label>Refund Rate (%)</label>
            <input
              type="number"
              step="0.1"
              value={inputs.refundRatePercent}
              onChange={handleNumberChange('refundRatePercent')}
              placeholder="5.0"
            />
          </div>
        </div>
      </div>

      {/* Optional Offers Section */}
      <div>
        <h3 style={{ marginBottom: '16px', color: '#374151', borderBottom: '2px solid #e5e7eb', paddingBottom: '8px' }}>
          Current Offers (Check what you have)
        </h3>
        
        {/* SLO/Tripwire */}
        <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'flex', alignItems: 'center', fontWeight: '500' }}>
              <input
                type="checkbox"
                checked={inputs.hasSLO}
                onChange={handleCheckboxChange('hasSLO')}
                style={{ marginRight: '8px' }}
              />
              Self-Liquidating Offer (SLO/Tripwire)
            </label>
          </div>
          {inputs.hasSLO && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginLeft: '24px' }}>
              <div className="input-group">
                <label>SLO Price ($)</label>
                <input
                  type="number"
                  value={inputs.sloPrice || 0}
                  onChange={handleNumberChange('sloPrice')}
                  placeholder="47"
                />
              </div>
              <div className="input-group">
                <label>SLO Take Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.sloTakeRate || 0}
                  onChange={handleNumberChange('sloTakeRate')}
                  placeholder="20.0"
                />
              </div>
            </div>
          )}
        </div>

        {/* Upsells */}
        <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'flex', alignItems: 'center', fontWeight: '500' }}>
              <input
                type="checkbox"
                checked={inputs.hasUpsells}
                onChange={handleCheckboxChange('hasUpsells')}
                style={{ marginRight: '8px' }}
              />
              Upsells (High-Ticket Offers)
            </label>
          </div>
          {inputs.hasUpsells && (
            <div style={{ marginLeft: '24px' }}>
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>
                For simplicity, enter your main upsell details:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="input-group">
                  <label>Main Upsell Price ($)</label>
                  <input
                    type="number"
                    value={inputs.upsellPrices?.[0] || 0}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value) || 0;
                      onInputChange('upsellPrices', [value]);
                    }}
                    placeholder="997"
                  />
                </div>
                <div className="input-group">
                  <label>Upsell Take Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={inputs.upsellTakeRates?.[0] || 0}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value) || 0;
                      onInputChange('upsellTakeRates', [value]);
                    }}
                    placeholder="15.0"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Annual Option */}
        <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'flex', alignItems: 'center', fontWeight: '500' }}>
              <input
                type="checkbox"
                checked={inputs.hasAnnualOption}
                onChange={handleCheckboxChange('hasAnnualOption')}
                style={{ marginRight: '8px' }}
              />
              Annual Prepay Option
            </label>
          </div>
          {inputs.hasAnnualOption && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginLeft: '24px' }}>
              <div className="input-group">
                <label>Annual Price ($)</label>
                <input
                  type="number"
                  value={inputs.annualPrice || 0}
                  onChange={handleNumberChange('annualPrice')}
                  placeholder="997"
                />
              </div>
              <div className="input-group">
                <label>Annual Attach Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.annualAttachRate || 0}
                  onChange={handleNumberChange('annualAttachRate')}
                  placeholder="25.0"
                />
              </div>
            </div>
          )}
        </div>

        {/* Downsell */}
        <div style={{ padding: '16px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'flex', alignItems: 'center', fontWeight: '500' }}>
              <input
                type="checkbox"
                checked={inputs.hasDownsell}
                onChange={handleCheckboxChange('hasDownsell')}
                style={{ marginRight: '8px' }}
              />
              Downsell Recovery Offer
            </label>
          </div>
          {inputs.hasDownsell && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginLeft: '24px' }}>
              <div className="input-group">
                <label>Downsell Price ($)</label>
                <input
                  type="number"
                  value={inputs.downsellPrice || 0}
                  onChange={handleNumberChange('downsellPrice')}
                  placeholder="297"
                />
              </div>
              <div className="input-group">
                <label>Downsell Take Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.downsellTakeRate || 0}
                  onChange={handleNumberChange('downsellTakeRate')}
                  placeholder="8.0"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InputForm;