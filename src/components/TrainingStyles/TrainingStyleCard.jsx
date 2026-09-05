import React from 'react';
import { Dumbbell, Flame, Zap, Activity, Shield, Sparkles, HeartPulse, ArrowRight } from 'lucide-react';

const getStyleIcon = (iconName) => {
  switch (iconName) {
    case 'Dumbbell':
      return <Dumbbell size={26} />;
    case 'Flame':
      return <Flame size={26} />;
    case 'Zap':
      return <Zap size={26} />;
    case 'Activity':
      return <Activity size={26} />;
    case 'Shield':
      return <Shield size={26} />;
    case 'Sparkles':
      return <Sparkles size={26} />;
    case 'HeartPulse':
      return <HeartPulse size={26} />;
    default:
      return <Dumbbell size={26} />;
  }
};

export const TrainingStyleCard = ({
  style,
  onExplore
}) => {
  const {
    name,
    icon,
    shortDescription,
    bestFor = [],
    difficulty,
    tag
  } = style;

  const getDifficultyClass = (diff) => {
    switch (diff?.toLowerCase()) {
      case 'beginner':
        return 'difficulty-beginner';
      case 'intermediate':
        return 'difficulty-intermediate';
      case 'advanced':
        return 'difficulty-advanced';
      default:
        return 'difficulty-intermediate';
    }
  };

  return (
    <article className="training-style-card" aria-label={`Training Style: ${name}`}>
      {/* Icon & Difficulty Header */}
      <div className="style-card-header">
        <div className="style-icon-box" aria-hidden="true">
          {getStyleIcon(icon)}
        </div>
        <span className={`style-difficulty-pill ${getDifficultyClass(difficulty)}`}>
          {difficulty}
        </span>
      </div>

      {/* Title & Description */}
      <h3 className="style-name">{name}</h3>
      <p className="style-description">{shortDescription}</p>

      {/* Best For Tags */}
      <div className="style-best-for-section">
        <span className="best-for-label">Best For</span>
        <div className="best-for-tags" aria-label="Target objectives">
          {bestFor.map((item, idx) => (
            <span key={idx} className="best-for-tag">{item}</span>
          ))}
        </div>
      </div>

      {/* Footer & Explore CTA */}
      <div className="style-card-footer">
        <span className="style-tag-badge">{tag}</span>
        <button
          type="button"
          className="btn-explore-style"
          onClick={() => onExplore(style)}
          aria-label={`Explore ${name} training style methodology`}
        >
          <span>Explore Style</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </article>
  );
};
