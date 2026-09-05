import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  X,
  Check,
  AlertCircle,
  Dumbbell,
  Clock,
  Layers,
  ArrowRight,
  Flame,
  Zap,
  Activity,
  Shield,
  Sparkles,
  HeartPulse
} from 'lucide-react';

const getModalStyleIcon = (iconName) => {
  switch (iconName) {
    case 'Dumbbell':
      return <Dumbbell size={28} />;
    case 'Flame':
      return <Flame size={28} />;
    case 'Zap':
      return <Zap size={28} />;
    case 'Activity':
      return <Activity size={28} />;
    case 'Shield':
      return <Shield size={28} />;
    case 'Sparkles':
      return <Sparkles size={28} />;
    case 'HeartPulse':
      return <HeartPulse size={28} />;
    default:
      return <Dumbbell size={28} />;
  }
};

export const TrainingStyleDetails = ({
  style,
  onClose
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!style) return null;

  const {
    name,
    icon,
    difficulty,
    whatIsIt,
    howItWorks,
    bestFor = [],
    workoutStructure,
    advantages = [],
    considerations = [],
    exampleWorkout
  } = style;

  return (
    <div
      className="workout-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-style-title"
    >
      <div
        className="style-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close training style modal"
        >
          <X size={20} />
        </button>

        {/* Modal Top Header */}
        <div className="style-modal-top">
          <div className="style-modal-icon-box" aria-hidden="true">
            {getModalStyleIcon(icon)}
          </div>
          <div>
            <div className="modal-header-pills">
              <span className="card-difficulty-badge difficulty-intermediate">
                {difficulty} Level
              </span>
            </div>
            <h2 id="modal-style-title" className="style-modal-title">{name}</h2>
            <div className="best-for-tags">
              {bestFor.map((item, idx) => (
                <span key={idx} className="best-for-tag">{item}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Two-Column / Full-Width Content Blocks */}
        <div className="style-modal-grid">
          {/* Block 1: What Is It */}
          <div className="modal-block">
            <h3 className="modal-block-title">
              <Layers size={16} color="var(--accent-primary)" />
              <span>What Is It?</span>
            </h3>
            <p>{whatIsIt}</p>
          </div>

          {/* Block 2: How It Works */}
          <div className="modal-block">
            <h3 className="modal-block-title">
              <Activity size={16} color="var(--accent-primary)" />
              <span>How It Works</span>
            </h3>
            <p>{howItWorks}</p>
          </div>

          {/* Block 3: Typical Workout Structure */}
          <div className="modal-block full-width">
            <h3 className="modal-block-title">
              <Clock size={16} color="var(--accent-primary)" />
              <span>Typical Workout Structure</span>
            </h3>
            <p>{workoutStructure}</p>
          </div>

          {/* Block 4: Advantages */}
          <div className="modal-block">
            <h3 className="modal-block-title">
              <Check size={16} color="var(--volt-green)" />
              <span>Key Advantages</span>
            </h3>
            <ul className="modal-bullet-list">
              {advantages.map((adv, idx) => (
                <li key={idx} className="modal-bullet-item bullet-check">
                  <Check size={15} />
                  <span>{adv}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Block 5: Things to Consider */}
          <div className="modal-block">
            <h3 className="modal-block-title">
              <AlertCircle size={16} color="#FF8A00" />
              <span>Things to Consider</span>
            </h3>
            <ul className="modal-bullet-list">
              {considerations.map((con, idx) => (
                <li key={idx} className="modal-bullet-item bullet-consider">
                  <AlertCircle size={15} />
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Block 6: Example Workout */}
          {exampleWorkout && (
            <div className="modal-block full-width">
              <h3 className="modal-block-title">
                <Dumbbell size={16} color="var(--accent-primary)" />
                <span>Example Workout: {exampleWorkout.title}</span>
              </h3>
              <div className="sample-workout-panel">
                <div className="sample-workout-header">
                  <span className="sample-workout-title">{exampleWorkout.title}</span>
                  <span className="sample-workout-duration">Duration: {exampleWorkout.duration}</span>
                </div>
                <div className="sample-exercises-list">
                  {exampleWorkout.exercises.map((ex, idx) => (
                    <div key={idx} className="sample-exercise-item">
                      <div>
                        <div className="sample-ex-name">{ex.name}</div>
                        {ex.notes && <div className="exercise-target">{ex.notes}</div>}
                      </div>
                      <div className="sample-ex-meta">
                        <strong>{ex.sets}</strong> • Rest: {ex.rest}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Action CTA */}
        <div className="modal-footer-action">
          <Link
            to="/workouts"
            className="btn-view-workout"
            onClick={onClose}
          >
            <span>Browse {name} Workouts</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
};
