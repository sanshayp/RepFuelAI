import React from 'react';
import { ArrowRight, Play, Zap, Award, Activity } from 'lucide-react';
import '../../styles/components/hero.css';

export const Hero = ({
  badge = "⚡ NEXT-GEN ATHLETIC INTELLIGENCE",
  headline = "Transform Your Body, Fuel Your Performance",
  subheadline = "AI-engineered workout regimens, progressive overload tracking, and precision nutrition protocols designed to elevate every single rep.",
  primaryCta = { text: "Start Your Journey", href: "#categories" },
  secondaryCta = { text: "Explore Workouts", href: "#workouts" },
  stats = [],
  heroImage = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=85"
}) => {
  return (
    <section id="hero" className="hero-section" aria-label="Hero Introduction">
      {/* Background Image with theme overlay */}
      <div className="hero-bg-container">
        <img 
          src={heroImage} 
          alt="High performance athlete training in modern fitness facility" 
          className="hero-bg-image" 
          loading="eager"
        />
        <div className="hero-bg-overlay"></div>
      </div>

      <div className="hero-container">
        {/* Left Column: Headlines, CTAs, Social Proof */}
        <div className="hero-content">
          <div className="hero-badge">
            <span>{badge}</span>
          </div>

          <h1 className="hero-headline">
            Transform Your Body, <span className="headline-gradient">Fuel Your Performance</span>
          </h1>

          <p className="hero-subheadline">
            {subheadline}
          </p>

          <div className="hero-cta-group">
            <a href={primaryCta.href} className="hero-btn-primary">
              <span>{primaryCta.text}</span>
              <ArrowRight size={18} />
            </a>

            <a href={secondaryCta.href} className="hero-btn-secondary">
              <Play size={16} fill="currentColor" />
              <span>{secondaryCta.text}</span>
            </a>
          </div>

          {/* Social Proof Stats */}
          {stats.length > 0 && (
            <div className="hero-stats-row">
              {stats.map((stat, idx) => (
                <div key={idx} className="hero-stat-item">
                  <span className="hero-stat-value">{stat.value}</span>
                  <span className="hero-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Sleek Glass Performance Visual Card */}
        <div className="hero-visual-card">
          {/* Top Left Floating Badge */}
          <div className="floating-badge floating-badge-left">
            <div className="badge-icon">
              <Zap size={18} />
            </div>
            <div>
              <div className="badge-text-primary">Overload Calibrated</div>
              <div className="badge-text-sub">+5kg Next Bench Set</div>
            </div>
          </div>

          {/* Core Glass Dashboard */}
          <div className="hero-glass-dashboard">
            <div className="dashboard-header">
              <div className="dashboard-user">
                <div className="dashboard-avatar">RF</div>
                <div className="dashboard-user-info">
                  <h4>Marcus Vance</h4>
                  <span>Pro Strength Tier • Day 42</span>
                </div>
              </div>
              <div className="live-indicator">
                <span className="live-dot"></span>
                <span>LIVE SESSION</span>
              </div>
            </div>

            <div className="dashboard-metrics-grid">
              <div className="metric-pill">
                <div className="metric-pill-label">Form Accuracy</div>
                <div className="metric-pill-value">97.8%</div>
                <div className="metric-pill-sub">↑ 2.4% vs last week</div>
              </div>
              <div className="metric-pill">
                <div className="metric-pill-label">Total Volume</div>
                <div className="metric-pill-value">12,480 kg</div>
                <div className="metric-pill-sub">PB Intensity</div>
              </div>
            </div>

            {/* Rep Velocity Waveform */}
            <div className="dashboard-graph-preview">
              <div className="graph-header">
                <span>REP POWER VELOCITY (m/s)</span>
                <span style={{ color: 'var(--volt-green)' }}>0.82 m/s avg</span>
              </div>
              <div className="graph-bars">
                <div className="graph-bar" style={{ height: '45%' }}></div>
                <div className="graph-bar" style={{ height: '65%' }}></div>
                <div className="graph-bar" style={{ height: '80%' }}></div>
                <div className="graph-bar active" style={{ height: '95%' }}></div>
                <div className="graph-bar active" style={{ height: '88%' }}></div>
                <div className="graph-bar" style={{ height: '70%' }}></div>
                <div className="graph-bar" style={{ height: '60%' }}></div>
              </div>
            </div>
          </div>

          {/* Bottom Right Floating Badge */}
          <div className="floating-badge floating-badge-right">
            <div className="badge-icon" style={{ background: 'linear-gradient(135deg, #00F59B 0%, #00B26E 100%)' }}>
              <Award size={18} />
            </div>
            <div>
              <div className="badge-text-primary">100% Rep Quality</div>
              <div className="badge-text-sub">Zero Form Breakdown</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
