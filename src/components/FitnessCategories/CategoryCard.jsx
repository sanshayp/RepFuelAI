import React from 'react';
import { Dumbbell, Flame, Zap, HeartPulse, Sparkles, Shield, ArrowRight } from 'lucide-react';

const getCategoryIcon = (iconName) => {
  switch (iconName) {
    case 'Dumbbell':
      return <Dumbbell size={26} />;
    case 'Flame':
      return <Flame size={26} />;
    case 'Zap':
      return <Zap size={26} />;
    case 'HeartPulse':
      return <HeartPulse size={26} />;
    case 'Sparkles':
      return <Sparkles size={26} />;
    case 'Shield':
      return <Shield size={26} />;
    default:
      return <Dumbbell size={26} />;
  }
};

export const CategoryCard = ({
  icon = "Dumbbell",
  title,
  description,
  tag,
  href = "#workouts"
}) => {
  return (
    <a href={href} className="category-card" aria-label={`Explore ${title}`}>
      <div className="category-card-top">
        <div className="category-icon-box" aria-hidden="true">
          {getCategoryIcon(icon)}
        </div>
        {tag && <span className="category-tag">{tag}</span>}
      </div>

      <div className="category-card-body">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div className="category-card-cta">
        <span>Explore Protocols</span>
        <ArrowRight size={16} />
      </div>
    </a>
  );
};
