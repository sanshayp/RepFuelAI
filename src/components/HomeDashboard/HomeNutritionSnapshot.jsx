import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Footprints, Award, ArrowUpRight, Edit3, Plus, Minus, Check, Sparkles } from 'lucide-react';
import { useNutritionProgress } from '../../context/NutritionProgressContext';
import { CalorieRing } from '../Common/CalorieRing';
import { ProfileRequired } from '../Common/ProfileRequired';
import { hasSavedProfile } from '../../utils/profileUtils';
import './HomeNutritionSnapshot.css';

export const HomeNutritionSnapshot = () => {
  const {
    dailyTotals,
    dailyCalorieTarget,
    dailyRemaining,
    macroGoals,
    stepCount,
    setStepCount,
    stepGoal,
    setStepGoal,
    dailyScore,
    loggedFoods,
    todayWorkoutDone,
  } = useNutritionProgress();

  if (!hasSavedProfile()) {
    return <ProfileRequired feature="Nutrition and Progress" />;
  }

  const [isEditingSteps, setIsEditingSteps] = useState(false);
  const [tempSteps, setTempSteps] = useState(stepCount);
  const [tempGoal, setTempGoal] = useState(stepGoal);

  const stepPercent = stepGoal > 0 ? Math.min(100, Math.round((stepCount / stepGoal) * 100)) : 0;
  const calPercent = dailyCalorieTarget > 0 ? Math.round((dailyTotals.calories / dailyCalorieTarget) * 100) : 0;
  const proteinPercent = macroGoals.protein > 0 ? Math.round((dailyTotals.protein / macroGoals.protein) * 100) : 0;

  const handleSaveSteps = (e) => {
    e.preventDefault();
    setStepCount(tempSteps);
    setStepGoal(tempGoal);
    setIsEditingSteps(false);
  };

  const handleQuickAddSteps = (amount) => {
    setStepCount(Math.max(0, stepCount + amount));
  };

  return (
    <section className="home-nutrition-snapshot-section" aria-label="Today's Performance & Nutrition Snapshot">
      <div className="home-snapshot-container">
        {/* Section Header */}
        <div className="home-snapshot-header">
          <div>
            <div className="home-snapshot-badge">
              <Sparkles size={14} />
              <span>LIVE METABOLIC SNAPSHOT</span>
            </div>
            <h2 className="home-snapshot-title">Today&apos;s Nutrition &amp; Activity</h2>
            <p className="home-snapshot-desc">
              Synchronized real-time daily metrics from your Indian food logger, step tracker, and athletic progress engine.
            </p>
          </div>

          <div className="home-snapshot-actions">
            <Link to="/nutrition" className="snapshot-link-btn">
              <span>Open Food Logger</span>
              <ArrowUpRight size={16} />
            </Link>
            <Link to="/progress" className="snapshot-link-btn secondary">
              <span>View Progress Calendar</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        {/* 3-Card Glassmorphic Dashboard Row */}
        <div className="home-snapshot-grid">
          {/* Card 1: Calorie Ring & Compact Nutrition */}
          <div className="snapshot-card nutrition-card">
            <div className="snapshot-card-top">
              <div className="snapshot-icon-box orange">
                <Flame size={20} />
              </div>
              <div className="snapshot-card-title-wrap">
                <h3>Today&apos;s Nutrition</h3>
                <span className="snapshot-card-subtitle">Real-time calorie budget</span>
              </div>
            </div>

            <div className="snapshot-card-body calorie-ring-body">
              <CalorieRing
                consumed={dailyTotals.calories}
                target={dailyCalorieTarget}
                size="compact"
                showRemaining={true}
              />

              {/* Compact Macros */}
              <div className="compact-macros-list">
                <div className="compact-macro-item">
                  <div className="compact-macro-header">
                    <span className="compact-macro-dot protein" />
                    <span className="compact-macro-label">Protein</span>
                  </div>
                  <strong className="compact-macro-val">{dailyTotals.protein} g</strong>
                  <span className="compact-macro-goal">/ {macroGoals.protein}g</span>
                </div>

                <div className="compact-macro-item">
                  <div className="compact-macro-header">
                    <span className="compact-macro-dot carbs" />
                    <span className="compact-macro-label">Carbs</span>
                  </div>
                  <strong className="compact-macro-val">{dailyTotals.carbs} g</strong>
                  <span className="compact-macro-goal">/ {macroGoals.carbs}g</span>
                </div>

                <div className="compact-macro-item">
                  <div className="compact-macro-header">
                    <span className="compact-macro-dot fats" />
                    <span className="compact-macro-label">Fats</span>
                  </div>
                  <strong className="compact-macro-val">{dailyTotals.fats} g</strong>
                  <span className="compact-macro-goal">/ {macroGoals.fats}g</span>
                </div>
              </div>
            </div>

            <div className="snapshot-card-footer">
              <span className="logged-counter">
                {loggedFoods.length} meal {loggedFoods.length === 1 ? 'item' : 'items'} logged today
              </span>
              <Link to="/nutrition" className="footer-inline-link">
                Log meal +
              </Link>
            </div>
          </div>

          {/* Card 2: Step Count Tracking */}
          <div className="snapshot-card step-card">
            <div className="snapshot-card-top">
              <div className="snapshot-icon-box green">
                <Footprints size={20} />
              </div>
              <div className="snapshot-card-title-wrap">
                <h3>Daily Steps</h3>
                <span className="snapshot-card-subtitle">Manual activity entry</span>
              </div>
              <button
                type="button"
                className="step-edit-btn"
                onClick={() => {
                  setTempSteps(stepCount);
                  setTempGoal(stepGoal);
                  setIsEditingSteps(!isEditingSteps);
                }}
                title="Edit steps & daily goal"
              >
                <Edit3 size={15} />
              </button>
            </div>

            <div className="snapshot-card-body">
              {isEditingSteps ? (
                <form onSubmit={handleSaveSteps} className="step-edit-form">
                  <div className="step-input-group">
                    <label htmlFor="manual-steps-input">Current Steps:</label>
                    <input
                      id="manual-steps-input"
                      type="number"
                      min="0"
                      max="100000"
                      step="100"
                      className="step-number-input"
                      value={tempSteps}
                      onChange={(e) => setTempSteps(Number(e.target.value) || 0)}
                      autoFocus
                    />
                  </div>
                  <div className="step-input-group">
                    <label htmlFor="manual-goal-input">Daily Step Goal:</label>
                    <input
                      id="manual-goal-input"
                      type="number"
                      min="1000"
                      max="50000"
                      step="500"
                      className="step-number-input"
                      value={tempGoal}
                      onChange={(e) => setTempGoal(Number(e.target.value) || 10000)}
                    />
                  </div>
                  <div className="step-form-actions">
                    <button type="submit" className="step-save-btn">
                      <Check size={14} /> Save
                    </button>
                    <button
                      type="button"
                      className="step-cancel-btn"
                      onClick={() => setIsEditingSteps(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="step-display-wrap">
                  <div className="step-metric-primary">
                    <span className="step-number">{stepCount.toLocaleString()}</span>
                    <span className="step-divider">/</span>
                    <span className="step-goal">{stepGoal.toLocaleString()}</span>
                  </div>

                  {/* Progress Track */}
                  <div className="step-progress-track">
                    <div
                      className="step-progress-fill"
                      style={{ width: `${stepPercent}%` }}
                    />
                  </div>
                  <div className="step-subline">
                    <span className="step-pct-label">{stepPercent}% completed</span>
                    <span className="step-remaining-label">
                      {stepCount >= stepGoal
                        ? 'Goal Achieved! 🎉'
                        : `${(stepGoal - stepCount).toLocaleString()} steps left`}
                    </span>
                  </div>

                  {/* Quick Step Buttons */}
                  <div className="quick-step-steppers">
                    <button
                      type="button"
                      className="quick-step-btn"
                      onClick={() => handleQuickAddSteps(-500)}
                      title="Subtract 500 steps"
                    >
                      <Minus size={12} /> 500
                    </button>
                    <button
                      type="button"
                      className="quick-step-btn"
                      onClick={() => handleQuickAddSteps(500)}
                      title="Add 500 steps"
                    >
                      <Plus size={12} /> 500
                    </button>
                    <button
                      type="button"
                      className="quick-step-btn"
                      onClick={() => handleQuickAddSteps(1000)}
                      title="Add 1,000 steps"
                    >
                      <Plus size={12} /> 1,000
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="snapshot-card-footer">
              <span className="step-disclaimer">
                💡 Manual entry (No watch/phone backend required)
              </span>
            </div>
          </div>

          {/* Card 3: Combined Daily Progress Score */}
          <div className="snapshot-card progress-card">
            <div className="snapshot-card-top">
              <div className="snapshot-icon-box purple">
                <Award size={20} />
              </div>
              <div className="snapshot-card-title-wrap">
                <h3>Daily Consistency</h3>
                <span className="snapshot-card-subtitle">Deterministic composite score</span>
              </div>
            </div>

            <div className="snapshot-card-body">
              <div className="daily-score-hero">
                <div className="daily-score-number-wrap">
                  <span className="daily-score-big">{dailyScore}</span>
                  <span className="daily-score-denom">/ 100</span>
                </div>
                <span className="daily-score-badge">
                  {dailyScore >= 80 ? 'Optimal Performance' : dailyScore >= 60 ? 'Solid Adherence' : 'Building Momentum'}
                </span>
              </div>

              {/* Progress Track */}
              <div className="score-progress-track">
                <div
                  className="score-progress-fill"
                  style={{ width: `${dailyScore}%` }}
                />
              </div>

              {/* Breakdown metrics */}
              <div className="metrics-pill-breakdown">
                <div className="pill-metric">
                  <span className="pill-name">Calories</span>
                  <span className="pill-val">{calPercent}%</span>
                </div>
                <div className="pill-metric">
                  <span className="pill-name">Steps</span>
                  <span className="pill-val">{stepPercent}%</span>
                </div>
                <div className="pill-metric">
                  <span className="pill-name">Protein</span>
                  <span className="pill-val">{proteinPercent}%</span>
                </div>
                <div className="pill-metric">
                  <span className="pill-name">Workout</span>
                  <span className="pill-val" style={{ color: todayWorkoutDone ? 'var(--volt-green)' : 'var(--text-muted)' }}>
                    {todayWorkoutDone ? 'Done' : 'Pending'}
                  </span>
                </div>
              </div>
            </div>

            <div className="snapshot-card-footer">
              <Link to="/progress" className="footer-inline-link">
                Explore Calendar &amp; Weekly Graph &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
