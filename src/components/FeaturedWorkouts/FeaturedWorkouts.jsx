import React from 'react';
import { WorkoutCard } from './WorkoutCard';
import { ArrowRight } from 'lucide-react';
import '../../styles/components/featured-workouts.css';

export const FeaturedWorkouts = ({
  badge = "PROVEN PROTOCOLS",
  title = "Featured Workouts",
  subtitle = "Handcrafted, battle-tested routines programmed by world-class strength coaches and amplified by AI tracking.",
  items = []
}) => {
  return (
    <section id="workouts" className="workouts-section" aria-label="Featured Workouts">
      <div className="workouts-container">
        <div className="workouts-header">
          <div className="workouts-header-content">
            <div className="workouts-badge">
              <span>{badge}</span>
            </div>
            <h2 className="workouts-title">{title}</h2>
            <p className="workouts-subtitle">{subtitle}</p>
          </div>

          <a href="#workouts" className="workouts-view-all">
            <span>Explore All Routines</span>
            <ArrowRight size={16} />
          </a>
        </div>

        <div className="workouts-grid">
          {items.map((workout) => (
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
      </div>
    </section>
  );
};
