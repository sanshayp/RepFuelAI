import React, { useState, useEffect } from 'react';
import { Activity, ArrowRight, Calculator, User, Sliders } from 'lucide-react';
import { getSavedProfile } from '../../utils/profileUtils';
import '../../styles/components/bmi-calculator.css';

const getBmiCategory = (bmi) => {
  if (bmi < 18.5) return { label: 'Underweight', tone: 'cool' };
  if (bmi < 25) return { label: 'Normal', tone: 'healthy' };
  if (bmi < 30) return { label: 'Overweight', tone: 'warm' };
  return { label: 'Obesity range', tone: 'alert' };
};

export const BMICalculator = ({
  badge = 'PERSONAL METRICS',
  title = 'Check your BMI',
  subtitle = 'Get a quick estimate from your height and weight, then use it as one signal in your broader health picture.'
}) => {
  const [calcMode, setCalcMode] = useState('profile'); // 'profile' | 'manual'
  const [manualHeight, setManualHeight] = useState('');
  const [manualWeight, setManualWeight] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const savedProfile = getSavedProfile();
  const hasProfileData = Boolean(savedProfile && savedProfile.height && savedProfile.weight);

  // Clear result/error when switching mode
  const handleModeChange = (mode) => {
    setCalcMode(mode);
    setResult(null);
    setError('');
  };

  const handleCalculateProfile = () => {
    if (!hasProfileData) {
      setError('No profile details found. Please enter measurements manually or set up your profile.');
      return;
    }
    const heightInM = Number(savedProfile.height) / 100;
    const weightInKg = Number(savedProfile.weight);

    if (!heightInM || !weightInKg || heightInM <= 0 || weightInKg <= 0) {
      setError('Invalid height or weight in your saved profile.');
      return;
    }

    const bmi = weightInKg / (heightInM * heightInM);
    setError('');
    setResult({
      value: bmi.toFixed(1),
      mode: 'profile',
      height: savedProfile.height,
      weight: savedProfile.weight,
      ...getBmiCategory(bmi),
    });
  };

  const handleCalculateManual = (e) => {
    e.preventDefault();
    const heightInM = Number(manualHeight) / 100;
    const weightInKg = Number(manualWeight);

    if (!heightInM || !weightInKg || heightInM <= 0 || weightInKg <= 0) {
      setError('Enter a valid height and weight to calculate BMI.');
      return;
    }

    const bmi = weightInKg / (heightInM * heightInM);
    setError('');
    setResult({
      value: bmi.toFixed(1),
      mode: 'manual',
      height: manualHeight,
      weight: manualWeight,
      ...getBmiCategory(bmi),
    });
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
          <p className="bmi-note">
            BMI is a general screening measure and does not account for muscle mass, body composition, or individual health factors.
          </p>
        </div>

        <div className="bmi-panel">
          <div className="bmi-panel-heading">
            <div className="bmi-icon-box" aria-hidden="true">
              <Calculator size={24} />
            </div>
            <div>
              <span className="bmi-panel-label">Metric Calculator</span>
              <h3>Check your BMI</h3>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="bmi-mode-selector-wrap">
            <span className="bmi-mode-prompt">How do you want to calculate?</span>
            <div className="bmi-mode-tabs" role="tablist" aria-label="BMI Calculation Mode">
              <button
                type="button"
                role="tab"
                aria-selected={calcMode === 'profile'}
                className={`bmi-mode-tab ${calcMode === 'profile' ? 'active' : ''}`}
                onClick={() => handleModeChange('profile')}
              >
                <User size={15} />
                <span>My Details</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={calcMode === 'manual'}
                className={`bmi-mode-tab ${calcMode === 'manual' ? 'active' : ''}`}
                onClick={() => handleModeChange('manual')}
              >
                <Sliders size={15} />
                <span>Manual</span>
              </button>
            </div>
          </div>

          <div className="bmi-mode-divider" />

          {/* Mode 1: My Details */}
          {calcMode === 'profile' && (
            <div className="bmi-profile-mode-box">
              <h4 className="bmi-mode-heading">Calculate using my details</h4>
              {hasProfileData ? (
                <>
                  <div className="bmi-details-card">
                    <div className="bmi-detail-item">
                      <span className="bmi-detail-label">Height:</span>
                      <strong className="bmi-detail-val">{savedProfile.height} cm</strong>
                    </div>
                    <div className="bmi-detail-item">
                      <span className="bmi-detail-label">Weight:</span>
                      <strong className="bmi-detail-val">{savedProfile.weight} kg</strong>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="bmi-submit"
                    onClick={handleCalculateProfile}
                  >
                    Calculate BMI
                    <ArrowRight size={17} aria-hidden="true" />
                  </button>
                </>
              ) : (
                <div className="bmi-no-profile-msg">
                  <p>No saved profile details found yet.</p>
                  <button
                    type="button"
                    className="bmi-switch-inline-btn"
                    onClick={() => handleModeChange('manual')}
                  >
                    Switch to Manual Mode
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mode 2: Calculate Manually */}
          {calcMode === 'manual' && (
            <div className="bmi-manual-mode-box">
              <h4 className="bmi-mode-heading">Calculate manually</h4>
              <form className="bmi-form" onSubmit={handleCalculateManual}>
                <label className="bmi-field">
                  <span>Height <small>(cm)</small></span>
                  <input
                    type="number"
                    min="50"
                    max="300"
                    step="0.1"
                    value={manualHeight}
                    onChange={(event) => setManualHeight(event.target.value)}
                    placeholder="e.g. 175"
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
                    value={manualWeight}
                    onChange={(event) => setManualWeight(event.target.value)}
                    placeholder="e.g. 72"
                    required
                  />
                </label>
                <button type="submit" className="bmi-submit">
                  Calculate BMI
                  <ArrowRight size={17} aria-hidden="true" />
                </button>
              </form>
            </div>
          )}

          {error && <p className="bmi-error" role="alert">{error}</p>}

          {/* Clean BMI Result */}
          {result && (
            <div className={`bmi-result bmi-result-${result.tone}`} aria-live="polite">
              <div className="bmi-result-main">
                <span className="bmi-result-label">
                  {result.mode === 'profile' ? 'Your BMI' : 'BMI'}
                </span>
                <strong className="bmi-result-number">{result.value}</strong>
                <span className="bmi-category">{result.label}</span>
              </div>
              <div className="bmi-result-meta">
                {result.mode === 'profile' ? (
                  <>
                    <span className="bmi-meta-caption">Based on:</span>
                    <span className="bmi-meta-text">Height {result.height} cm</span>
                    <span className="bmi-meta-text">Weight {result.weight} kg</span>
                  </>
                ) : (
                  <span className="bmi-meta-manual-badge">Manual calculation</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};