import React from 'react';
import { Clock, Flame, ArrowRight, Play } from 'lucide-react';

export const WorkoutCard = ({
  image,
  title,
  duration = "30 min",
  difficulty = "Intermediate",
  category = "Strength",
  calories = "350 kcal",
  rating = "4.9 (1k reviews)"
}) => {
  const getDifficultyClass = (diff) => {
    switch (diff.toLowerCase()) {
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
    <article className="workout-card" aria-label={`Workout: ${title}`}>
      <div className="workout-image-wrap">
        <img 
          src={image} 
          alt={title} 
          className="workout-image" 
          loading="lazy" 
        />
        <div className="workout-image-overlay"></div>
        <div className="workout-badges-row">
          <span className="workout-category-pill">{category}</span>
          <span className={`difficulty-badge ${getDifficultyClass(difficulty)}`}>
            {difficulty}
          </span>
        </div>
      </div>

      <div className="workout-card-content">
        <div className="workout-meta-row">
          <div className="workout-meta-item">
            <Clock size={15} color="var(--accent-primary)" />
            <span>{duration}</span>
          </div>
          <div className="workout-meta-item">
            <Flame size={15} color="var(--accent-primary)" />
            <span>{calories}</span>
          </div>
        </div>

        <h3 className="workout-title">{title}</h3>

        <div className="workout-card-bottom">
          <span className="workout-rating">★ {rating}</span>
          <a href="#workouts" className="workout-action-btn" aria-label={`View workout: ${title}`}>
            <span>View Workout</span>
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </article>
  );
};
