import React from 'react';
import { TipCard } from './TipCard';
import '../../styles/components/tips-section.css';

export const TipsSection = ({
  badge = "HOLISTIC FUELING",
  title = "Nutrition & Fitness Tips",
  subtitle = "Precision nutritional habits designed to accelerate recovery, fuel workouts, and maintain lean body composition.",
  items = []
}) => {
  return (
    <section id="nutrition" className="tips-section" aria-label="Nutrition and Fitness Tips">
      <div className="tips-container">
        <div className="tips-header">
          <div className="tips-badge">
            <span>{badge}</span>
          </div>
          <h2 className="tips-title">{title}</h2>
          <p className="tips-subtitle">{subtitle}</p>
        </div>

        <div className="tips-grid">
          {items.map((tip) => (
            <TipCard
              key={tip.id}
              icon={tip.icon}
              category={tip.category}
              title={tip.title}
              description={tip.description}
              bulletPoints={tip.bulletPoints}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
