import React, { useEffect } from 'react';
import {
  X,
  Check,
  AlertCircle,
  Dumbbell,
  Clock,
  Layers,
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
    whatIsIt,
    howItWorks,
    keyIdea
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
        className="style-modal-container about-style-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button (X) */}
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label={`Close about ${name}`}
        >
          <X size={20} />
        </button>

        {/* Modal Top Header */}
        <div className="style-modal-top about-modal-top">
          <div className="style-icon-box" aria-hidden="true">
            {getModalStyleIcon(icon)}
          </div>
          <div>
            <h2 id="modal-style-title" className="style-modal-title">
              About {name}
            </h2>
          </div>
        </div>

        {/* Simple About Content */}
        <div className="about-modal-body">
          <div className="about-block">
            <h4 className="about-block-title">What it is</h4>
            <p className="about-block-text">{whatIsIt}</p>
          </div>

          <div className="about-block">
            <h4 className="about-block-title">How it works</h4>
            <p className="about-block-text">{howItWorks}</p>
          </div>

          <div className="about-block">
            <h4 className="about-block-title">Key idea</h4>
            <p className="about-block-text key-idea-text">{keyIdea}</p>
          </div>
        </div>

        {/* Modal Footer with Close Button */}
        <div className="about-modal-footer">
          <button
            type="button"
            className="btn-modal-close-action"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
