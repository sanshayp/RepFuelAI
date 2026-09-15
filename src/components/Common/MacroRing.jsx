import React from 'react';
import './MacroRing.css';

/**
 * MacroRing Component
 * Small circular progress ring for secondary macros (Protein, Carbs, Fat).
 * Displays consumed / goal, updates dynamically, visually caps at 100% when exceeded.
 */
export const MacroRing = ({
  label = 'Protein',
  consumed = 0,
  goal = 150,
  unit = 'g',
  size = 96,
}) => {
  const safeGoal = Math.max(1, Math.round(goal));
  const roundedConsumed = Math.round(consumed);
  const percent = Number(((roundedConsumed / safeGoal) * 100).toFixed(0));
  const isOver = roundedConsumed > safeGoal;
  
  const stroke = 7;
  const radius = (size - stroke * 2) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  
  // Cap visual ring at 100% so progress arc remains mathematically intact
  const visualPercent = Math.min(100, Math.max(0, percent));
  const strokeDashoffset = circumference - (visualPercent / 100) * circumference;

  const gradientId = `macro-ring-grad-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className={`macro-ring-item ${isOver ? 'is-over' : ''}`}>
      <div className="macro-ring-svg-wrap" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="macro-ring-svg"
          aria-label={`${label}: ${roundedConsumed} of ${safeGoal} ${unit} (${percent}%)`}
          role="progressbar"
          aria-valuenow={roundedConsumed}
          aria-valuemin={0}
          aria-valuemax={safeGoal}
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              {isOver ? (
                <>
                  <stop offset="0%" stopColor="#EF4444" />
                  <stop offset="100%" stopColor="#DC2626" />
                </>
              ) : (
                <>
                  <stop offset="0%" stopColor="#FF8A00" />
                  <stop offset="100%" stopColor="#FF5E1E" />
                </>
              )}
            </linearGradient>
          </defs>

          {/* Background Track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke="var(--glass-border, rgba(255, 255, 255, 0.1))"
            strokeWidth={stroke}
            className="macro-ring-track"
          />

          {/* Animated Value Arc */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke={`url(#${gradientId})`}
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${center} ${center})`}
            className="macro-ring-fill"
          />
        </svg>

        {/* Center Ring Info: Consumed, Unit, and /Goal */}
        <div className="macro-ring-center-content">
          <span className="macro-ring-consumed">{roundedConsumed}</span>
          <span className="macro-ring-unit">{unit}</span>
          <span className="macro-ring-goal">/{safeGoal}</span>
        </div>
      </div>

      {/* Label underneath small ring */}
      <span className="macro-ring-label">{label}</span>
    </div>
  );
};
