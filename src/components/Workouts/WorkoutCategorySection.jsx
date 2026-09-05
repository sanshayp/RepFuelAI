import React from 'react';
import { Dumbbell, HeartPulse, Flame, Zap, Sparkles, Shield } from 'lucide-react';

const getCategoryIcon = (iconName) => {
  switch (iconName) {
    case 'Dumbbell':
      return <Dumbbell size={22} />;
    case 'HeartPulse':
      return <HeartPulse size={22} />;
    case 'Flame':
      return <Flame size={22} />;
    case 'Zap':
      return <Zap size={22} />;
    case 'Sparkles':
      return <Sparkles size={22} />;
    case 'Shield':
      return <Shield size={22} />;
    default:
      return <Dumbbell size={22} />;
  }
};

export const WorkoutCategorySection = ({
  categories = [],
  activeCategory = "All",
  onSelectCategory
}) => {
  return (
    <section className="workout-categories-wrapper" aria-label="Workout Categories">
      <div className="workout-categories-header">
        <h2>Explore By Discipline</h2>
      </div>

      <div className="categories-scroll-grid">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.name;
          return (
            <button
              key={cat.id}
              type="button"
              className={`workout-category-tile ${isActive ? 'active' : ''}`}
              onClick={() => onSelectCategory(isActive ? "All" : cat.name)}
              aria-pressed={isActive}
            >
              <div className="category-tile-icon" aria-hidden="true">
                {getCategoryIcon(cat.icon)}
              </div>
              <div>
                <h3 className="category-tile-title">{cat.name}</h3>
                <span className="category-tile-count">{cat.workoutCount}</span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
