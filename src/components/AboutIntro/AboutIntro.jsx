import React from 'react';
import { TrendingUp, Activity, Flame, CheckCircle, ShieldCheck } from 'lucide-react';
import '../../styles/components/about-intro.css';

const getPillarIcon = (iconName) => {
  switch (iconName) {
    case 'TrendingUp':
      return <TrendingUp size={22} />;
    case 'Activity':
      return <Activity size={22} />;
    case 'Flame':
      return <Flame size={22} />;
    default:
      return <ShieldCheck size={22} />;
  }
};

export const AboutIntro = ({
  badge = "BUILT FOR THE DEDICATED",
  title = "Why RepFuelAI?",
  description = "RepFuelAI is engineered for athletes and fitness enthusiasts who demand science-backed results. By uniting algorithmic overload tracking, bio-individual nutrition guidance, and an unrelenting global community, we eliminate guesswork so you can unlock your absolute peak potential.",
  pillars = [],
  metricsPreview = {
    activePacing: "94% Optimal Form",
    weeklyVolume: "+14.2% Strength Gain",
    calorieBurn: "Avg. 480 kcal/session"
  }
}) => {
  return (
    <section id="about" className="about-section" aria-label="About RepFuelAI">
      <div className="about-container">
        {/* Left Column: Heading, Welcoming Mission, Feature Pillars */}
        <div className="about-content">
          <div className="about-header">
            <div className="about-badge">
              <span>{badge}</span>
            </div>
            <h2 className="about-title">{title}</h2>
            <p className="about-desc">{description}</p>
          </div>

          <div className="about-pillars">
            {pillars.map((pillar) => (
              <div key={pillar.id} className="pillar-item">
                <div className="pillar-icon-box" aria-hidden="true">
                  {getPillarIcon(pillar.icon)}
                </div>
                <div className="pillar-info">
                  <h3>{pillar.title}</h3>
                  <p>{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Visual Feature Showcase */}
        <div className="about-visual-side">
          <div className="about-visual-card">
            <img 
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1000&q=80" 
              alt="Athlete engaged in focused dumbbell training session" 
              className="about-image"
              loading="lazy"
            />
            <div className="about-card-overlay">
              <div className="about-overlay-stats">
                <div className="about-stat-box">
                  <h4>{metricsPreview.activePacing}</h4>
                  <p>AI Form Precision</p>
                </div>
                <div className="about-stat-box">
                  <h4 style={{ color: 'var(--volt-green)' }}>{metricsPreview.weeklyVolume}</h4>
                  <p>4-Week Progression</p>
                </div>
                <div className="about-stat-box">
                  <h4>{metricsPreview.calorieBurn}</h4>
                  <p>Metabolic Output</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
