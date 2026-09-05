import React from 'react';
import { Link } from 'react-router-dom';
import { WorkoutCard } from './WorkoutCard';
import { ArrowRight, Dumbbell } from 'lucide-react';
import '../../styles/components/featured-workouts.css';

export const FeaturedWorkouts = ({
  badge = "PROVEN PROTOCOLS",
  title = "Featured Workouts",
  subtitle = "Handcrafted, battle-tested routines programmed by world-class strength coaches and amplified by AI tracking.",
  items = []
}) => {
  // Preview small selection of 3 workouts on the home page
  const previewItems = items.slice(0, 3);

  return (
    <section id="workouts" className="workouts-section" aria-label="Featured Workouts">
      <div className="workouts-container">
        <div className="workouts-header">
          <div className="workouts-header-content">
            <div className="workouts-badge">
              <Dumbbell size={14} aria-hidden="true" />
              <span>{badge}</span>
            </div>
            <h2 className="workouts-title">{title}</h2>
            <p className="workouts-subtitle">{subtitle}</p>
          </div>

          <Link to="/workouts" className="workouts-view-all">
            <span>Explore All Workouts</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="workouts-grid">
          {previewItems.map((workout) => (
            <WorkoutCard
              key={workout.id}
              image={workout.image}
              title={workout.title}
              duration={workout.duration}
              difficulty={workout.difficulty}
              category={workout.category}
              calories={workout.calories}
              rating={workout.rating}
            />
          ))}
        </div>

        {/* Explore All Workouts Bottom CTA */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-10)' }}>
          <Link
            to="/workouts"
            className="navbar-cta-btn"
            style={{ padding: '0.75rem 1.75rem', fontSize: '0.95rem' }}
          >
            <span>Explore All Workouts</span>
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
};
