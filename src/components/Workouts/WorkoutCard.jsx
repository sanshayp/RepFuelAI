import React from 'react';
import { Clock, Flame, ArrowRight, Dumbbell } from 'lucide-react';

export const WorkoutCard = ({
  workout,
  onViewDetails
}) => {
  const {
    name,
    category,
    difficulty,
    duration,
    muscles = [],
    equipment,
    description,
    image,
    calories,
    rating
  } = workout;

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
    <article className="workout-card-enhanced" aria-label={`Workout: ${name}`}>
      {/* Card Image Banner */}
      <div className="card-img-container">
        <img src={image} alt={name} loading="lazy" />
        <div className="card-img-gradient-overlay" />
        <div className="card-badges-top">
          <span className="card-category-tag">{category}</span>
          <span className={`card-difficulty-badge ${getDifficultyClass(difficulty)}`}>
            {difficulty}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="workout-card-body">
        {/* Meta Stats (Duration & Calories) */}
        <div className="card-meta-chips">
          <div className="card-meta-chip">
            <Clock size={14} color="var(--accent-primary)" />
            <span>{duration}</span>
          </div>
          {calories && (
            <div className="card-meta-chip">
              <Flame size={14} color="var(--accent-primary)" />
              <span>{calories}</span>
            </div>
          )}
        </div>

        {/* Workout Name */}
        <h3 className="workout-card-name">{name}</h3>

        {/* Short Description */}
        <p className="workout-card-description">{description}</p>

        {/* Equipment Requirement */}
        <div className="card-equipment-row">
          <Dumbbell size={14} aria-hidden="true" />
          <span>Equipment: <strong className="equipment-badge">{equipment}</strong></span>
        </div>

        {/* Target Muscles */}
        <div className="card-muscles-row" aria-label="Target Muscle Groups">
          {muscles.map((muscle, idx) => (
            <span key={idx} className="muscle-tag">{muscle}</span>
          ))}
        </div>

        {/* Card Footer & CTA */}
        <div className="workout-card-footer">
          <span className="card-rating-text">★ {rating}</span>
          <button
            type="button"
            className="btn-view-workout"
            onClick={() => onViewDetails(workout)}
            aria-label={`View workout details for ${name}`}
          >
            <span>View Workout</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </article>
  );
};
