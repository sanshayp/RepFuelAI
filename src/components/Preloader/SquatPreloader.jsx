import React, { useState, useEffect } from 'react';
import '../../styles/components/preloader.css';

export const SquatPreloader = ({ minDisplayTime = 2200, onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [repCount, setRepCount] = useState(1);

  useEffect(() => {
    // Rep counter cycle syncs with squat animation (every 2.2 seconds)
    const repInterval = setInterval(() => {
      setRepCount((prev) => (prev >= 3 ? 1 : prev + 1));
    }, 2200);

    // Timeout to finish preloading
    const timer = setTimeout(() => {
      setIsFading(true);
      const exitTimer = setTimeout(() => {
        setIsVisible(false);
        if (onComplete) onComplete();
      }, 600); // matches fade-out duration
      return () => clearTimeout(exitTimer);
    }, minDisplayTime);

    return () => {
      clearInterval(repInterval);
      clearTimeout(timer);
    };
  }, [minDisplayTime, onComplete]);

  if (!isVisible) return null;

  return (
    <div 
      className={`preloader-overlay ${isFading ? 'fade-out' : ''}`}
      role="status" 
      aria-label="Loading RepFuelAI application"
    >
      <div className="preloader-card">
        <div className="preloader-svg-wrap">
          <svg 
            viewBox="0 0 200 230" 
            className="squat-svg" 
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="figureGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#FF5E1E" />
                <stop offset="100%" stop-color="#FF8A00" />
              </linearGradient>
              <linearGradient id="accentVolt" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#00F59B" />
                <stop offset="100%" stop-color="#00D284" />
              </linearGradient>
              <filter id="dumbbellGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Floor Contact Shadow */}
            <ellipse 
              cx="100" 
              cy="204" 
              rx="40" 
              ry="7" 
              fill="rgba(0, 0, 0, 0.45)" 
              className="svg-floor-shadow" 
            />

            {/* Ground Line Reference */}
            <line 
              x1="45" 
              y1="204" 
              x2="155" 
              y2="204" 
              stroke="var(--glass-border)" 
              strokeWidth="2" 
              strokeDasharray="4 4"
            />

            {/* Fixed Feet Anchors */}
            <path d="M72 201 L88 201" stroke="var(--text-primary)" strokeWidth="5" strokeLinecap="round" />
            <path d="M112 201 L128 201" stroke="var(--text-primary)" strokeWidth="5" strokeLinecap="round" />

            {/* Articulated Lower Body Shins */}
            <g className="svg-shin-left">
              <line x1="82" y1="156" x2="80" y2="201" stroke="var(--text-primary)" strokeWidth="5.5" strokeLinecap="round" />
            </g>
            <g className="svg-shin-right">
              <line x1="118" y1="156" x2="120" y2="201" stroke="var(--text-primary)" strokeWidth="5.5" strokeLinecap="round" />
            </g>

            {/* Upper Body + Dumbbells (Descends and Rises as a cohesive unit) */}
            <g className="svg-upper-body">
              {/* Thighs */}
              <g className="svg-thigh-left">
                <line x1="93" y1="116" x2="82" y2="156" stroke="var(--text-primary)" strokeWidth="6" strokeLinecap="round" />
              </g>
              <g className="svg-thigh-right">
                <line x1="107" y1="116" x2="118" y2="156" stroke="var(--text-primary)" strokeWidth="6" strokeLinecap="round" />
              </g>

              {/* Pelvis */}
              <line x1="91" y1="116" x2="109" y2="116" stroke="var(--text-primary)" strokeWidth="7" strokeLinecap="round" />

              {/* Spine / Torso */}
              <line x1="100" y1="68" x2="100" y2="116" stroke="var(--text-primary)" strokeWidth="6.5" strokeLinecap="round" />

              {/* Shoulders */}
              <line x1="72" y1="74" x2="128" y2="74" stroke="var(--text-primary)" strokeWidth="5.5" strokeLinecap="round" />

              {/* Head with glowing visor */}
              <circle cx="100" cy="48" r="13" fill="var(--text-primary)" />
              <path d="M93 48 Q100 44 107 48" stroke="#0F0F11" strokeWidth="2.5" strokeLinecap="round" fill="none" />

              {/* Left Arm & Dumbbell */}
              <line x1="72" y1="74" x2="62" y2="124" stroke="var(--text-primary)" strokeWidth="5" strokeLinecap="round" />
              <g filter="url(#dumbbellGlow)" className="dumbbell-plate">
                <line x1="50" y1="124" x2="74" y2="124" stroke="var(--text-secondary)" strokeWidth="3.5" strokeLinecap="round" />
                <rect x="47" y="112" width="6" height="24" rx="2" fill="url(#figureGradient)" />
                <rect x="71" y="112" width="6" height="24" rx="2" fill="url(#figureGradient)" />
                {/* Weight collar ring */}
                <circle cx="62" cy="124" r="3" fill="url(#accentVolt)" />
              </g>

              {/* Right Arm & Dumbbell */}
              <line x1="128" y1="74" x2="138" y2="124" stroke="var(--text-primary)" strokeWidth="5" strokeLinecap="round" />
              <g filter="url(#dumbbellGlow)" className="dumbbell-plate">
                <line x1="126" y1="124" x2="150" y2="124" stroke="var(--text-secondary)" strokeWidth="3.5" strokeLinecap="round" />
                <rect x="123" y="112" width="6" height="24" rx="2" fill="url(#figureGradient)" />
                <rect x="147" y="112" width="6" height="24" rx="2" fill="url(#figureGradient)" />
                {/* Weight collar ring */}
                <circle cx="138" cy="124" r="3" fill="url(#accentVolt)" />
              </g>
            </g>
          </svg>
        </div>

        <div className="preloader-brand">
          <span className="preloader-brand-name">RepFuel<span>AI</span></span>
        </div>

        <div className="preloader-rep-counter">
          <span>⚡</span>
          <span>CALIBRATING REP {repCount} OF 3</span>
        </div>

        <div className="preloader-status">
          <span>Engine Initializing</span>
        </div>

        <div className="preloader-progress-bar">
          <div className="preloader-progress-fill"></div>
        </div>
      </div>
    </div>
  );
};
