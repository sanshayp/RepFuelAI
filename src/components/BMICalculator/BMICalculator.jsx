import React, { useState } from 'react';
import { Activity, ArrowRight, Calculator } from 'lucide-react';
import '../../styles/components/bmi-calculator.css';

const getBmiCategory = (bmi) => {
  if (bmi < 18.5) return { label: 'Underweight', tone: 'cool' };
  if (bmi < 25) return { label: 'Healthy range', tone: 'healthy' };
  if (bmi < 30) return { label: 'Overweight', tone: 'warm' };
  return { label: 'Obesity range', tone: 'alert' };
};

export const BMICalculator = ({
  badge = 'PERSONAL METRICS',
  title = 'Check your BMI',
  subtitle = 'Get a quick estimate from your height and weight, then use it as one signal in your broader health picture.'
}) => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const heightInMeters = Number(height) / 100;
    const weightInKilograms = Number(weight);

    if (!heightInMeters || !weightInKilograms || heightInMeters <= 0 || weightInKilograms <= 0) {
      setResult(null);
      setError('Enter a valid height and weight to calculate your BMI.');
      return;
    }

    const bmi = weightInKilograms / (heightInMeters * heightInMeters);
    setError('');
    setResult({ value: bmi.toFixed(1), ...getBmiCategory(bmi) });
  };

  return (
    <section id="bmi" className="bmi-section" aria-label="BMI calculator">
      <div className="bmi-container">
        <div className="bmi-intro">
          <div className="bmi-badge">
            <Activity size={14} aria-hidden="true" />
            <span>{badge}</span>
          </div>
          <h2 className="bmi-title">{title}</h2>
          <p className="bmi-subtitle">{subtitle}</p>
          <p className="bmi-note">BMI is a general screening measure and does not account for muscle mass, body composition, or individual health factors.</p>
        </div>

        <div className="bmi-panel">
          <div className="bmi-panel-heading">
            <div className="bmi-icon-box" aria-hidden="true">
              <Calculator size={24} />
            </div>
            <div>
              <span className="bmi-panel-label">Metric calculator</span>
              <h3>Enter your measurements</h3>
            </div>
          </div>

          <form className="bmi-form" onSubmit={handleSubmit}>
            <label className="bmi-field">
              <span>Height <small>(cm)</small></span>
              <input
                type="number"
                min="50"
                max="300"
                step="0.1"
                value={height}
                onChange={(event) => setHeight(event.target.value)}
                placeholder=" e.g. 175"
                required
              />
            </label>
            <label className="bmi-field">
              <span>Weight <small>(kg)</small></span>
              <input
                type="number"
                min="10"
                max="500"
                step="0.1"
                value={weight}
                onChange={(event) => setWeight(event.target.value)}
                placeholder=" e.g. 72"
                required
              />
            </label>
            <button type="submit" className="bmi-submit">
              Calculate BMI
              <ArrowRight size={17} aria-hidden="true" />
            </button>
          </form>

          {error && <p className="bmi-error" role="alert">{error}</p>}

          {result && (
            <div className={`bmi-result bmi-result-${result.tone}`} aria-live="polite">
              <div>
                <span className="bmi-result-label">Your estimated BMI</span>
                <strong>{result.value}</strong>
              </div>
              <span className="bmi-category">{result.label}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};