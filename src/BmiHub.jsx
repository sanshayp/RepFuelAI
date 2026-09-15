import React from 'react';

export const BmiHub = ({ height = 172, weight = 71, onHeightChange, onWeightChange }) => {
  // Use parsed values for slider rendering, default to safety ranges if blank
  const currentHeight = Number(height) > 0 ? Number(height) : 170;
  const currentWeight = Number(weight) > 0 ? Number(weight) : 70;

  const bmi = (currentWeight / ((currentHeight / 100) ** 2)).toFixed(1);
  const tdee = Math.round((10 * currentWeight + 6.25 * currentHeight - 5 * 25 + 5) * 1.375);

  const getBmiCategory = (val) => {
    if (val < 18.5) return { label: 'Underweight', color: '#ffb703' };
    if (val < 24.9) return { label: 'Optimal Weight', color: '#06d6a0' };
    if (val < 29.9) return { label: 'Overweight', color: '#fb8500' };
    return { label: 'Obese', color: '#e63946' };
  };

  const status = getBmiCategory(bmi);

  return (
    <div style={{ background: '#1e1e1e', padding: '20px', borderRadius: '12px', border: '1px solid #333' }}>
      <h3>📊 Fitness Metrics Hub</h3>
      <div style={{ marginBottom: '15px' }}>
        <label>Height: <strong>{currentHeight} cm</strong></label>
        <input 
          type="range" 
          min="120" 
          max="220" 
          value={currentHeight} 
          onChange={(e) => onHeightChange && onHeightChange(e.target.value)} 
          style={{ width: '100%', accentColor: '#ff6b00' }} 
        />
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label>Weight: <strong>{currentWeight} kg</strong></label>
        <input 
          type="range" 
          min="40" 
          max="140" 
          value={currentWeight} 
          onChange={(e) => onWeightChange && onWeightChange(e.target.value)} 
          style={{ width: '100%', accentColor: '#ff6b00' }} 
        />
      </div>

      <div style={{ padding: '15px', background: '#2a2a2a', borderRadius: '8px' }}>
        <p style={{ margin: '0 0 8px 0' }}>BMI Score: <strong>{bmi}</strong> (<span style={{ color: status.color, fontWeight: 'bold' }}>{status.label}</span>)</p>
        <p style={{ margin: 0 }}>Est. Daily Calories: <strong>{tdee} kcal</strong></p>
      </div>
    </div>
  );
};