import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CategoryCard } from './CategoryCard';
import '../../styles/components/category-grid.css';

export const CategoryGrid = ({
  badge = "TAILORED DISCIPLINES",
  title = "Explore Training Styles",
  subtitle = "Select the discipline tailored to your goals. RepFuelAI adapts dynamically to your equipment, schedule, and target intensity.",
  items = []
}) => {
  // Show preview selection of 3 top training disciplines on the home page
  const previewItems = items.slice(0, 3);

  return (
    <section id="categories" className="categories-section" aria-label="Fitness Categories">
      <div className="categories-container">
        <div className="categories-header">
          <div className="categories-badge">
            <Sparkles size={14} aria-hidden="true" />
            <span>{badge}</span>
          </div>
          <h2 className="categories-title">{title}</h2>
          <p className="categories-subtitle">{subtitle}</p>
        </div>

        <div className="categories-grid">
          {previewItems.map((cat) => (
            <CategoryCard
              key={cat.id}
              icon={cat.icon}
              title={cat.title}
              description={cat.description}
              tag={cat.tag}
              href="/training-styles"
            />
          ))}
        </div>

        {/* Explore Training Styles CTA */}
        <div className="categories-cta-wrapper" style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-10)' }}>
          <Link
            to="/training-styles"
            className="navbar-cta-btn"
            style={{ padding: '0.75rem 1.75rem', fontSize: '0.95rem' }}
          >
            <span>Explore Training Styles</span>
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
};
