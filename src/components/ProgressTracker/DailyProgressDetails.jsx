import React from 'react';
import { 
  Flame, 
  Footprints, 
  Dumbbell, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Calendar as CalendarIcon, 
  ArrowLeft, 
  ArrowRight 
} from 'lucide-react';
import './DailyProgressDetails.css';

export const DailyProgressDetails = ({
  selectedDay,
  onNavigateDay = () => {},
  hasPrev = false,
  hasNext = false,
}) => {
  if (!selectedDay) return null;

  const {
    dayNumber,
    dayName,
    dateString,
    calories = 0,
    calorieTarget = 2400,
    protein = 0,
    proteinGoal = 140,
    steps = 0,
    stepGoal = 10000,
    score = 0,
    hasCheatMeal = false,
    cheatMealName = '',
    workoutDone = false,
    xpEarned = 0,
    isToday = false,
  } = selectedDay;

  const calPercent = calorieTarget > 0 ? Math.round((calories / calorieTarget) * 100) : 0;
  const proteinPercent = proteinGoal > 0 ? Math.round((protein / proteinGoal) * 100) : 0;
  const stepPercent = stepGoal > 0 ? Math.round((steps / stepGoal) * 100) : 0;

  return (
    <div className="daily-progress-details-card" role="region" aria-label={`Details for ${dateString}`}>
      {/* Card Header with Day Navigation */}
      <div className="details-header-bar">
        <div className="details-title-wrap">
          <div className="details-icon-box">
            <CalendarIcon size={18} />
          </div>
          <div>
            <div className="details-badge-row">
              <h3>{dateString || `Day ${dayNumber}`}</h3>
              {isToday && <span className="details-today-badge">Today (Live Sync)</span>}
            </div>
            <p className="details-subtitle">{dayName} &bull; Daily Adherence Record</p>
          </div>
        </div>

        {/* Day navigation arrows */}
        <div className="details-nav-arrows">
          <button
            type="button"
            className="details-nav-btn"
            onClick={() => onNavigateDay(-1)}
            disabled={!hasPrev}
            title="Previous Day"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            type="button"
            className="details-nav-btn"
            onClick={() => onNavigateDay(1)}
            disabled={!hasNext}
            title="Next Day"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Main Composite Score Hero */}
      <div className="details-score-hero">
        <div className="details-score-left">
          <span className="details-score-label">Daily Goal Score</span>
          <div className="details-score-number-wrap">
            <span className="details-score-num">{score}%</span>
            <span className="details-score-pts">({score} / 100)</span>
          </div>
        </div>

        <div className="details-xp-badge">
          <Sparkles size={14} />
          <span>+{xpEarned} XP earned</span>
        </div>
      </div>

      {/* Score Track */}
      <div className="details-score-track">
        <div 
          className="details-score-fill"
          style={{ width: `${Math.min(100, Math.max(0, score))}%` }}
        />
      </div>

      {/* 4-Metric Grid */}
      <div className="details-metrics-grid">
        {/* Metric 1: Calories */}
        <div className="detail-metric-box">
          <div className="detail-metric-top">
            <div className="detail-metric-icon orange">
              <Flame size={15} />
            </div>
            <span className="detail-metric-title">Calories</span>
          </div>
          <div className="detail-metric-values">
            <strong>{calories.toLocaleString()}</strong>
            <span>/ {calorieTarget.toLocaleString()} kcal</span>
          </div>
          <div className="detail-metric-progress">
            <div 
              className="detail-metric-fill orange"
              style={{ width: `${Math.min(100, calPercent)}%` }}
            />
          </div>
          <span className="detail-metric-sub">{calPercent}% of target</span>
        </div>

        {/* Metric 2: Protein */}
        <div className="detail-metric-box">
          <div className="detail-metric-top">
            <div className="detail-metric-icon blue">
              <Dumbbell size={15} />
            </div>
            <span className="detail-metric-title">Protein</span>
          </div>
          <div className="detail-metric-values">
            <strong>{protein}</strong>
            <span>/ {proteinGoal} g</span>
          </div>
          <div className="detail-metric-progress">
            <div 
              className="detail-metric-fill blue"
              style={{ width: `${Math.min(100, proteinPercent)}%` }}
            />
          </div>
          <span className="detail-metric-sub">{proteinPercent}% achieved</span>
        </div>

        {/* Metric 3: Steps */}
        <div className="detail-metric-box">
          <div className="detail-metric-top">
            <div className="detail-metric-icon green">
              <Footprints size={15} />
            </div>
            <span className="detail-metric-title">Steps</span>
          </div>
          <div className="detail-metric-values">
            <strong>{steps.toLocaleString()}</strong>
            <span>/ {stepGoal.toLocaleString()}</span>
          </div>
          <div className="detail-metric-progress">
            <div 
              className="detail-metric-fill green"
              style={{ width: `${Math.min(100, stepPercent)}%` }}
            />
          </div>
          <span className="detail-metric-sub">{stepPercent}% completed</span>
        </div>

        {/* Metric 4: Cheat Meal & Workout Status */}
        <div className="detail-metric-box">
          <div className="detail-metric-top">
            <div className="detail-metric-icon purple">
              <Award size={15} />
            </div>
            <span className="detail-metric-title">Status</span>
          </div>
          
          <div className="detail-status-lines">
            <div className="status-line-item">
              <span className="status-label">Cheat Meal:</span>
              <strong className={hasCheatMeal ? 'cheat-yes' : 'cheat-no'}>
                {hasCheatMeal ? `🍔 Yes ${cheatMealName ? `(${cheatMealName})` : ''}` : 'No'}
              </strong>
            </div>

            <div className="status-line-item">
              <span className="status-label">Workout:</span>
              <strong className={workoutDone ? 'workout-yes' : 'workout-no'}>
                {workoutDone ? '✓ Completed' : '✕ Rest / Skipped'}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
