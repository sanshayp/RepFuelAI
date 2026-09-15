import React, { useState, useMemo } from 'react';
import { 
  Flame, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  Edit3, 
  ArrowRight, 
  RefreshCw, 
  SlidersHorizontal,
  Info
} from 'lucide-react';
import { useNutritionProgress } from '../../context/NutritionProgressContext';
import { CalorieRing } from '../Common/CalorieRing';
import { getSavedProfile } from '../../utils/profileUtils';
import { getCompensationOptions } from '../../utils/nutritionUtils';
import '../../styles/components/calorie-tracker.css';

export const CalorieTracker = () => {
  const {
    dailyCalorieTarget,
    setDailyCalorieTarget,
    mealBreakdown,
    dailyTotals,
    dailyRemaining,
    macroGoals,
    isOverDaily,
    overDailyBy,
    baseMealTargets,
    effectiveMealTargets,
    mealCompensations,
    applyMealCompensation,
    resetMealCompensation,
  } = useNutritionProgress();

  const [isEditingTarget, setIsEditingTarget] = useState(false);
  const [tempTarget, setTempTarget] = useState(dailyCalorieTarget);
  const [selectedOptionId, setSelectedOptionId] = useState('');
  const [activeOverMealKey, setActiveOverMealKey] = useState(null);
  const [compensationSuccessMsg, setCompensationSuccessMsg] = useState('');
  const savedProfile = getSavedProfile();
  const maintenanceCalories = savedProfile.bmr ? Math.round(savedProfile.bmr * 1.2) : null;
  const goalAdjustment = maintenanceCalories ? dailyCalorieTarget - maintenanceCalories : null;

  const handleTargetSubmit = (e) => {
    e.preventDefault();
    const val = Number(tempTarget);
    if (val && val >= 800 && val <= 6000) {
      setDailyCalorieTarget(val);
    } else {
      setTempTarget(dailyCalorieTarget);
    }
    setIsEditingTarget(false);
  };

  const consumedPercent = dailyCalorieTarget > 0 
    ? Math.min(100, Math.round((dailyTotals.calories / dailyCalorieTarget) * 100))
    : 0;

  const mealEntries = [
    { key: 'breakfast', label: 'Breakfast', ratio: '25%' },
    { key: 'lunch', label: 'Lunch', ratio: '35%' },
    { key: 'dinner', label: 'Dinner', ratio: '30%' },
    { key: 'snacks', label: 'Snacks', ratio: '10%' },
  ];

  // Detect which meal is over target and needs compensation
  const overMeals = useMemo(() => {
    return mealEntries.filter(({ key }) => {
      const mealData = mealBreakdown[key];
      return mealData && mealData.isOver && mealData.overBy > 0;
    });
  }, [mealBreakdown]);

  // Set the primary over meal to inspect
  const currentOverMeal = activeOverMealKey 
    ? overMeals.find((m) => m.key === activeOverMealKey) || overMeals[0]
    : overMeals[0];

  // Compensation options for the current over-limit meal
  const compensationOptions = useMemo(() => {
    if (!currentOverMeal) return [];
    const mealData = mealBreakdown[currentOverMeal.key];
    return getCompensationOptions(
      currentOverMeal.key, 
      mealData.overBy, 
      baseMealTargets
    );
  }, [currentOverMeal, mealBreakdown, baseMealTargets]);

  const handleApplyCompensation = (option) => {
    if (!option) return;
    if (option.id === 'keep_current') {
      setCompensationSuccessMsg('Kept current allocation plan without reductions.');
    } else {
      applyMealCompensation(option.adjustments);
      setCompensationSuccessMsg(`Dynamic compensation applied! Remaining meal targets redistributed.`);
    }
    setTimeout(() => setCompensationSuccessMsg(''), 4000);
  };

  const hasActiveCompensations = Object.keys(mealCompensations).length > 0;

  return (
    <section className="calorie-tracker-section" aria-label="Calorie and Nutrition Overview">
      {/* 1. Daily Overview Hero Card with Circular Calorie Ring */}
      <div className="calorie-hero-card">
        <div className="calorie-hero-top">
          <div className="calorie-hero-title-wrap">
            <div className="calorie-hero-icon" aria-hidden="true">
              <Flame size={24} />
            </div>
            <div>
              <h2>Daily Calorie &amp; Macro Target</h2>
              <p>Dynamic metabolic fuel breakdown scaled to your training intensity</p>
            </div>
          </div>

          {/* User-Configurable Daily Calorie Target */}
          <div className="calorie-target-editor">
            <label htmlFor="daily-target-input">Daily Budget:</label>
            {isEditingTarget ? (
              <form onSubmit={handleTargetSubmit} className="calorie-target-input-wrap">
                <input
                  id="daily-target-input"
                  type="number"
                  min="800"
                  max="6000"
                  step="50"
                  className="calorie-target-input"
                  value={tempTarget}
                  onChange={(e) => setTempTarget(e.target.value)}
                  autoFocus
                  onBlur={handleTargetSubmit}
                />
                <span className="calorie-unit">kcal</span>
              </form>
            ) : (
              <div 
                className="calorie-target-input-wrap"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setTempTarget(dailyCalorieTarget);
                  setIsEditingTarget(true);
                }}
                title="Click to edit daily calorie budget"
              >
                <span className="metric-number" style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                  {dailyCalorieTarget.toLocaleString()}
                </span>
                <span className="calorie-unit">kcal</span>
                <Edit3 size={14} style={{ opacity: 0.7, marginLeft: 4 }} />
              </div>
            )}
          </div>
        </div>

        {savedProfile.bmr && (
          <div className="goal-summary-banner" role="status">
              <div>
              <span className="goal-summary-label">{savedProfile.goal === 'gain' ? 'Weight gain plan' : savedProfile.goal === 'maintain' ? 'Weight maintenance plan' : 'Weight loss plan'}</span>
              <strong>{dailyCalorieTarget.toLocaleString()} kcal daily target</strong>
            </div>
            <span>
              {goalAdjustment === 0 ? 'At estimated maintenance' : `${Math.abs(goalAdjustment).toLocaleString()} kcal ${goalAdjustment > 0 ? 'surplus' : 'deficit'} from estimated maintenance`}
            </span>
          </div>
        )}

        {/* Dynamic Alerts Banner */}
        {isOverDaily ? (
          <div className="calorie-alert-banner warning" role="alert">
            <AlertTriangle className="calorie-alert-icon" size={20} />
            <div className="calorie-alert-content">
              <h4>Daily Calorie Target Exceeded</h4>
              <p>
                You have consumed <strong>{dailyTotals.calories.toLocaleString()} kcal</strong> ({overDailyBy.toLocaleString()} kcal over your {dailyCalorieTarget.toLocaleString()} kcal target).
                Use smart meal compensation below to redistribute upcoming portions.
              </p>
            </div>
          </div>
        ) : dailyTotals.calories > 0 && dailyRemaining <= 200 ? (
          <div className="calorie-alert-banner success" role="status">
            <CheckCircle2 className="calorie-alert-icon" size={20} />
            <div className="calorie-alert-content">
              <h4>Calorie Target Almost Achieved</h4>
              <p>
                You have <strong>{dailyRemaining} kcal remaining</strong>. Great precision fueling today!
              </p>
            </div>
          </div>
        ) : null}

        {/* Visual Calorie Ring & Core Metrics Grid */}
        <div className="calorie-hero-main-layout">
          {/* Calorie Progress Ring */}
          <div className="calorie-ring-hero-box">
            <CalorieRing
              consumed={dailyTotals.calories}
              target={dailyCalorieTarget}
              size="standard"
              showRemaining={true}
            />
          </div>

          {/* 3-Column Metrics Column */}
          <div className="calorie-metrics-grid">
            <div className="metric-box consumed">
              <span className="metric-label">Consumed</span>
              <div className="metric-value-wrap">
                <span className="metric-number">{dailyTotals.calories.toLocaleString()}</span>
                <span className="metric-unit">kcal</span>
              </div>
              <span className="metric-subtext">
                {consumedPercent}% of daily budget
              </span>
            </div>

            <div className="metric-box target">
              <span className="metric-label">Daily Target</span>
              <div className="metric-value-wrap">
                <span className="metric-number">{dailyCalorieTarget.toLocaleString()}</span>
                <span className="metric-unit">kcal</span>
              </div>
              <span className="metric-subtext">Configurable metabolic goal</span>
            </div>

            <div className={`metric-box ${isOverDaily ? 'over-target' : 'remaining'}`}>
              <span className="metric-label">{isOverDaily ? 'Over Target' : 'Remaining'}</span>
              <div className="metric-value-wrap">
                <span className="metric-number" style={{ color: isOverDaily ? '#EF4444' : 'var(--volt-green)' }}>
                  {isOverDaily ? `+${overDailyBy.toLocaleString()}` : dailyRemaining.toLocaleString()}
                </span>
                <span className="metric-unit">kcal</span>
              </div>
              <span className="metric-subtext">
                {isOverDaily ? 'Exceeded daily limit' : 'Left for upcoming meals'}
              </span>
            </div>
          </div>
        </div>

        {/* Macronutrient Tracking Grid */}
        <div className="macros-card-grid">
          {/* Protein */}
          <div className="macro-card">
            <div className="macro-header">
              <span className="macro-name">
                <span className="macro-dot protein" />
                Protein
              </span>
              <span className="macro-goal-text">Goal: {macroGoals.protein}g</span>
            </div>
            <div className="macro-value">{dailyTotals.protein}g</div>
            <div className="macro-track">
              <div 
                className="macro-fill protein"
                style={{ width: `${Math.min(100, Math.round((dailyTotals.protein / macroGoals.protein) * 100))}%` }}
              />
            </div>
          </div>

          {/* Carbs */}
          <div className="macro-card">
            <div className="macro-header">
              <span className="macro-name">
                <span className="macro-dot carbs" />
                Carbohydrates
              </span>
              <span className="macro-goal-text">Goal: {macroGoals.carbs}g</span>
            </div>
            <div className="macro-value">{dailyTotals.carbs}g</div>
            <div className="macro-track">
              <div 
                className="macro-fill carbs"
                style={{ width: `${Math.min(100, Math.round((dailyTotals.carbs / macroGoals.carbs) * 100))}%` }}
              />
            </div>
          </div>

          {/* Fats */}
          <div className="macro-card">
            <div className="macro-header">
              <span className="macro-name">
                <span className="macro-dot fats" />
                Fats
              </span>
              <span className="macro-goal-text">Goal: {macroGoals.fats}g</span>
            </div>
            <div className="macro-value">{dailyTotals.fats}g</div>
            <div className="macro-track">
              <div 
                className="macro-fill fats"
                style={{ width: `${Math.min(100, Math.round((dailyTotals.fats / macroGoals.fats) * 100))}%` }}
              />
            </div>
          </div>
        </div>

        {/* ==================================================== */}
        {/* 2. SMART MEAL CALORIE COMPENSATION SECTION */}
        {/* ==================================================== */}
        {currentOverMeal && (
          <div className="smart-compensation-card" role="region" aria-label="Smart Meal Calorie Compensation">
            <div className="compensation-header">
              <div className="compensation-badge">
                <SlidersHorizontal size={14} />
                <span>SMART MEAL CALORIE COMPENSATION</span>
              </div>
              <span className="compensation-status-pill">
                Active Redistribution Engine
              </span>
            </div>

            <div className="compensation-alert-banner">
              <AlertTriangle size={18} style={{ color: '#F59E0B', flexShrink: 0 }} />
              <div className="compensation-alert-text">
                <strong>{currentOverMeal.label} is {mealBreakdown[currentOverMeal.key].overBy} kcal over its target.</strong>
                <p>
                  Allocated: {mealBreakdown[currentOverMeal.key].baseTarget} kcal &bull; Consumed: {mealBreakdown[currentOverMeal.key].calories} kcal.
                  Choose a strategy below to redistribute remaining calories across upcoming meals.
                </p>
              </div>
            </div>

            {/* Over Meal Switcher if multiple meals are exceeded */}
            {overMeals.length > 1 && (
              <div className="over-meal-tabs">
                <span>Select meal to balance:</span>
                {overMeals.map((m) => (
                  <button
                    key={m.key}
                    type="button"
                    className={`over-meal-tab ${currentOverMeal.key === m.key ? 'active' : ''}`}
                    onClick={() => {
                      setActiveOverMealKey(m.key);
                      setSelectedOptionId('');
                    }}
                  >
                    {m.label} (+{mealBreakdown[m.key].overBy} kcal)
                  </button>
                ))}
              </div>
            )}

            <div className="compensation-form">
              <h4 className="compensation-prompt-title">
                How would you like to adjust your remaining meals?
              </h4>

              <div className="compensation-options-list">
                {compensationOptions.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;
                  return (
                    <label 
                      key={opt.id} 
                      className={`compensation-option-item ${isSelected ? 'selected' : ''}`}
                    >
                      <input
                        type="radio"
                        name="compensation-strategy"
                        value={opt.id}
                        checked={isSelected}
                        onChange={() => setSelectedOptionId(opt.id)}
                        className="compensation-radio"
                      />
                      <div className="compensation-option-content">
                        <div className="compensation-option-label-line">
                          <span className="compensation-option-title">{opt.label}</span>
                          {opt.id !== 'keep_current' && (
                            <span className="compensation-tag">Auto-Calculated</span>
                          )}
                        </div>
                        <span className="compensation-option-desc">{opt.description}</span>
                      </div>
                    </label>
                  );
                })}
              </div>

              <div className="compensation-actions-bar">
                <button
                  type="button"
                  className="apply-compensation-btn"
                  disabled={!selectedOptionId}
                  onClick={() => {
                    const opt = compensationOptions.find((o) => o.id === selectedOptionId);
                    handleApplyCompensation(opt);
                  }}
                >
                  Apply Redistribution
                </button>

                {hasActiveCompensations && (
                  <button
                    type="button"
                    className="reset-compensation-btn"
                    onClick={() => {
                      resetMealCompensation();
                      setSelectedOptionId('');
                      setCompensationSuccessMsg('Reset all meal allocations to standard baseline.');
                      setTimeout(() => setCompensationSuccessMsg(''), 4000);
                    }}
                  >
                    <RefreshCw size={14} /> Reset to Standard Allocations
                  </button>
                )}
              </div>

              {compensationSuccessMsg && (
                <div className="compensation-success-toast">
                  <CheckCircle2 size={16} />
                  <span>{compensationSuccessMsg}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Compensation Banner when active adjustments exist but no meal is currently over */}
        {!currentOverMeal && hasActiveCompensations && (
          <div className="active-compensation-summary-banner">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Sparkles size={16} style={{ color: 'var(--volt-green)' }} />
              <span>
                <strong>Smart Meal Compensation Active:</strong> Remaining meal targets are currently adjusted to keep your daily target balanced.
              </span>
            </div>
            <button
              type="button"
              className="reset-compensation-btn"
              onClick={resetMealCompensation}
            >
              <RefreshCw size={13} /> Reset Allocations
            </button>
          </div>
        )}

        {/* 3. Meal-by-Meal Calorie Allocation Breakdown Cards */}
        <div className="meal-allocation-grid">
          {mealEntries.map(({ key, label, ratio }) => {
            const mealData = mealBreakdown[key] || { 
              calories: 0, 
              baseTarget: 0, 
              target: 0, 
              isOver: false, 
              overBy: 0, 
              percent: 0,
              adjustment: 0
            };
            const hasAdjustment = mealData.adjustment !== 0;

            return (
              <div 
                key={key} 
                className={`meal-alloc-card ${mealData.isOver ? 'is-over' : ''} ${hasAdjustment ? 'is-compensated' : ''}`}
              >
                <div className="meal-alloc-header">
                  <div>
                    <span className="meal-alloc-name">{label}</span>
                    {hasAdjustment && (
                      <span className="meal-comp-indicator">
                        {mealData.adjustment > 0 ? `+${mealData.adjustment}` : `${mealData.adjustment}`} kcal adjusted
                      </span>
                    )}
                  </div>
                  <span className={`meal-alloc-badge ${mealData.isOver ? 'over' : 'normal'}`}>
                    {mealData.isOver ? `+${mealData.overBy} kcal over` : ratio}
                  </span>
                </div>

                <div className="meal-alloc-cals">
                  <span className="meal-alloc-num">{mealData.calories}</span>
                  <span className="meal-alloc-target">
                    / {mealData.target} kcal {hasAdjustment && <small title="Base allocation">({mealData.baseTarget})</small>}
                  </span>
                </div>

                <div className="meal-alloc-track">
                  <div 
                    className={`meal-alloc-fill ${mealData.isOver ? 'over' : ''}`}
                    style={{ width: `${mealData.percent}%` }}
                  />
                </div>

                {mealData.isOver ? (
                  <div className="meal-alloc-over-actions">
                    <span className="meal-alloc-over-note">
                      ⚠ Target exceeded by {mealData.overBy} kcal
                    </span>
                    <button
                      type="button"
                      className="inline-rebalance-btn"
                      onClick={() => setActiveOverMealKey(key)}
                    >
                      Compensate &rarr;
                    </button>
                  </div>
                ) : hasAdjustment ? (
                  <span className="meal-alloc-adjusted-note">
                    ✓ Reduced by {Math.abs(mealData.adjustment)} kcal for daily balance
                  </span>
                ) : (
                  <span className="meal-alloc-normal-note">
                    {mealData.target - mealData.calories > 0 
                      ? `${mealData.target - mealData.calories} kcal remaining`
                      : 'Meal target filled'}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
