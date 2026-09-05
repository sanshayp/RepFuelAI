import React, { useEffect } from 'react';
import { X, Clock, Flame, Dumbbell, Target, Layers, CheckCircle2 } from 'lucide-react';

export const WorkoutDetails = ({
  workout,
  onClose
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    // Prevent background scrolling when modal is active
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!workout) return null;

  const {
    name,
    category,
    difficulty,
    duration,
    equipment,
    muscles = [],
    calories,
    overview,
    exercises = [],
    image
  } = workout;

  return (
    <div
      className="workout-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-workout-title"
    >
      <div
        className="workout-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close workout details modal"
        >
          <X size={20} />
        </button>

        {/* Modal Hero Cover */}
        <div className="modal-hero-cover">
          <img src={image} alt={name} />
          <div className="modal-hero-overlay" />
        </div>

        <div className="modal-content-inner">
          {/* Header Pills */}
          <div className="modal-header-pills">
            <span className="card-category-tag">{category}</span>
            <span className="card-difficulty-badge difficulty-intermediate">
              {difficulty}
            </span>
          </div>

          <h2 id="modal-workout-title" className="modal-workout-title">
            {name}
          </h2>

          {/* Key Metrics Grid */}
          <div className="modal-meta-grid">
            <div className="modal-meta-cell">
              <span className="meta-cell-label">Duration</span>
              <span className="modal-meta-value">{duration}</span>
            </div>
            <div className="modal-meta-cell">
              <span className="meta-cell-label">Equipment</span>
              <span className="modal-meta-value">{equipment}</span>
            </div>
            <div className="modal-meta-cell">
              <span className="meta-cell-label">Est. Burn</span>
              <span className="modal-meta-value">{calories}</span>
            </div>
            <div className="modal-meta-cell">
              <span className="meta-cell-label">Level</span>
              <span className="modal-meta-value">{difficulty}</span>
            </div>
          </div>

          {/* Workout Overview */}
          <h3 className="modal-section-title">
            <Layers size={18} color="var(--accent-primary)" />
            <span>Workout Overview</span>
          </h3>
          <p className="modal-overview-text">{overview}</p>

          {/* Target Muscles */}
          <h3 className="modal-section-title">
            <Target size={18} color="var(--accent-primary)" />
            <span>Target Muscle Groups</span>
          </h3>
          <div className="card-muscles-row modal-muscles-wrap">
            {muscles.map((muscle, idx) => (
              <span key={idx} className="muscle-tag">{muscle}</span>
            ))}
          </div>

          {/* Exercises Breakdown */}
          <h3 className="modal-section-title">
            <Dumbbell size={18} color="var(--accent-primary)" />
            <span>Exercise Routine ({exercises.length} Exercises)</span>
          </h3>
          <div className="exercises-list">
            {exercises.map((ex, idx) => (
              <div key={idx} className="exercise-row-card">
                <div className="exercise-left">
                  <div className="exercise-index">{idx + 1}</div>
                  <div>
                    <h4 className="exercise-name">{ex.name}</h4>
                    <span className="exercise-target">Target: {ex.target}</span>
                  </div>
                </div>

                <div className="exercise-right">
                  <span className="exercise-sets-reps">
                    {ex.sets} sets × {ex.reps}
                  </span>
                  <span className="exercise-rest">
                    Rest: {ex.rest}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
