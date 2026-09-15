import React, { useState } from 'react';
import { ArrowRight, Check, X } from 'lucide-react';

export const OnboardingModal = ({ isOpen, onClose, onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    goal: '',
    experience: '',
    activityLevel: 'moderate',
    equipment: 'gym',
    diet: 'balanced',
    workoutDays: '3',
    height: '175',
    weight: '70'
  });

  if (!isOpen) return null;

  const totalSteps = 5;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete(formData);
      onClose();
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px'
    }}>
      <div style={{
        background: '#18181b',
        border: '1px solid #27272a',
        borderRadius: '16px',
        maxWidth: '520px',
        width: '100%',
        padding: '32px',
        position: 'relative',
        color: '#fff',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'transparent',
            border: 'none',
            color: '#a1a1aa',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        {/* Progress Bar */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '24px' }}>
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => (
            <div 
              key={s} 
              style={{
                flex: 1,
                height: '4px',
                borderRadius: '2px',
                background: s <= step ? '#ff6b00' : '#27272a',
                transition: 'all 0.3s'
              }}
            />
          ))}
        </div>

        {/* STEP 1: GOAL */}
        {step === 1 && (
          <div>
            <span style={{ color: '#ff6b00', fontSize: '0.85rem', fontWeight: 'bold' }}>STEP 1 OF {totalSteps}</span>
            <h2 style={{ fontSize: '1.4rem', margin: '8px 0 16px 0' }}>What is your primary fitness goal?</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { id: 'muscle', label: '💪 Build Muscle & Strength' },
                { id: 'fatloss', label: '🔥 Fat Loss & Toning' },
                { id: 'endurance', label: '⚡ Athleticism & Endurance' },
                { id: 'recomp', label: '🔄 Body Recomposition' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setFormData({ ...formData, goal: item.id })}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: formData.goal === item.id ? '2px solid #ff6b00' : '1px solid #27272a',
                    background: formData.goal === item.id ? '#ff6b0015' : '#27272a50',
                    color: '#fff',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: EXPERIENCE & DAYS */}
        {step === 2 && (
          <div>
            <span style={{ color: '#ff6b00', fontSize: '0.85rem', fontWeight: 'bold' }}>STEP 2 OF {totalSteps}</span>
            <h2 style={{ fontSize: '1.4rem', margin: '8px 0 16px 0' }}>Experience & Schedule</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
              {[
                { id: 'beginner', label: 'Beginner (0 - 1 year experience)' },
                { id: 'intermediate', label: 'Intermediate (1 - 3 years experience)' },
                { id: 'advanced', label: 'Advanced (3+ years experience)' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setFormData({ ...formData, experience: item.id })}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: formData.experience === item.id ? '2px solid #ff6b00' : '1px solid #27272a',
                    background: formData.experience === item.id ? '#ff6b0015' : '#27272a50',
                    color: '#fff',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '6px' }}>
              Workouts per week: <strong style={{ color: '#ff6b00' }}>{formData.workoutDays} days</strong>
            </label>
            <input 
              type="range" 
              min="1" 
              max="7" 
              value={formData.workoutDays}
              onChange={(e) => setFormData({ ...formData, workoutDays: e.target.value })}
              style={{ width: '100%', accentColor: '#ff6b00' }}
            />
          </div>
        )}

        {/* STEP 3: EQUIPMENT */}
        {step === 3 && (
          <div>
            <span style={{ color: '#ff6b00', fontSize: '0.85rem', fontWeight: 'bold' }}>STEP 3 OF {totalSteps}</span>
            <h2 style={{ fontSize: '1.4rem', margin: '8px 0 16px 0' }}>Where do you usually work out?</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { id: 'gym', label: '🏋️ Fully Equipped Commercial Gym' },
                { id: 'home_dumbbells', label: '🏠 Home Gym (Dumbbells / Resistance Bands)' },
                { id: 'bodyweight', label: '🤸 Bodyweight Only (Calisthenics)' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setFormData({ ...formData, equipment: item.id })}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: formData.equipment === item.id ? '2px solid #ff6b00' : '1px solid #27272a',
                    background: formData.equipment === item.id ? '#ff6b0015' : '#27272a50',
                    color: '#fff',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: ACTIVITY & DIET PREFERENCE */}
        {step === 4 && (
          <div>
            <span style={{ color: '#ff6b00', fontSize: '0.85rem', fontWeight: 'bold' }}>STEP 4 OF {totalSteps}</span>
            <h2 style={{ fontSize: '1.4rem', margin: '8px 0 14px 0' }}>Lifestyle & Nutrition Style</h2>
            
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', color: '#a1a1aa' }}>Daily Activity Level</label>
            <select
              value={formData.activityLevel}
              onChange={(e) => setFormData({ ...formData, activityLevel: e.target.value })}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #27272a',
                background: '#09090b',
                color: '#fff',
                marginBottom: '14px'
              }}
            >
              <option value="sedentary">Sedentary (Desk job, little movement)</option>
              <option value="moderate">Moderately Active (Light exercise / walking)</option>
              <option value="very_active">Very Active (Heavy daily exercise or labor)</option>
            </select>

            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', color: '#a1a1aa' }}>Dietary Preference</label>
            <select
              value={formData.diet}
              onChange={(e) => setFormData({ ...formData, diet: e.target.value })}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #27272a',
                background: '#09090b',
                color: '#fff'
              }}
            >
              <option value="balanced">Balanced / Omnivore</option>
              <option value="high_protein">High Protein Focus</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="keto">Keto / Low Carb</option>
            </select>
          </div>
        )}

        {/* STEP 5: BODY METRICS */}
        {step === 5 && (
          <div>
            <span style={{ color: '#ff6b00', fontSize: '0.85rem', fontWeight: 'bold' }}>STEP 5 OF {totalSteps}</span>
            <h2 style={{ fontSize: '1.4rem', margin: '8px 0 16px 0' }}>Enter Body Metrics</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px' }}>Height (cm)</label>
                <input 
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #27272a',
                    background: '#09090b',
                    color: '#fff'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px' }}>Weight (kg)</label>
                <input 
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #27272a',
                    background: '#09090b',
                    color: '#fff'
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Footer Navigation Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              style={{
                padding: '10px 18px',
                borderRadius: '8px',
                border: '1px solid #27272a',
                background: 'transparent',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              Back
            </button>
          ) : <div />}

          <button
            onClick={handleNext}
            disabled={step === 1 && !formData.goal}
            style={{
              padding: '10px 24px',
              borderRadius: '8px',
              border: 'none',
              background: '#ff6b00',
              color: '#fff',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              opacity: (step === 1 && !formData.goal) ? 0.5 : 1
            }}
          >
            {step === totalSteps ? 'Complete Profile' : 'Next'}
            {step === totalSteps ? <Check size={16} /> : <ArrowRight size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
};