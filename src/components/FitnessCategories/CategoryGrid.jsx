import React from 'react';
import { CategoryCard } from './CategoryCard';
import '../../styles/components/category-grid.css';

export const CategoryGrid = ({
  badge = "TAILORED DISCIPLINES",
  title = "Explore Training Styles",
  subtitle = "Select the discipline tailored to your goals. RepFuelAI adapts dynamically to your equipment, schedule, and target intensity.",
  items = []
}) => {
  return (
    <section id="categories" className="categories-section" aria-label="Fitness Categories">
      <div className="categories-container">
        <div className="categories-header">
          <div className="categories-badge">
            <span>{badge}</span>
          </div>
          <h2 className="categories-title">{title}</h2>
          <p className="categories-subtitle">{subtitle}</p>
        </div>

        <div className="categories-grid">
          {items.map((cat) => (
            <CategoryCard
              key={cat.id}
              icon={cat.icon}
              title={cat.title}
              description={cat.description}
              tag={cat.tag}
              href={cat.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
