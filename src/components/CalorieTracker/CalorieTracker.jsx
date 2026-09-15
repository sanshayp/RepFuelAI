import React, { useState, useMemo, useEffect } from 'react';
import { 
  Flame, 
  CheckCircle2, 
  Edit3, 
  RefreshCw,
  Sliders,
  X
} from 'lucide-react';
import { useNutritionProgress } from '../../context/NutritionProgressContext';
import { CalorieRing } from '../Common/CalorieRing';
import { MacroRing } from '../Common/MacroRing';
import { getCompensationOptions } from '../../utils/nutritionUtils';
import { safeGetStorage, safeSetStorage } from '../../utils/storageUtils';
import '../../styles/components/calorie-tracker.css';

const CUSTOM_MACROS_STORAGE_KEY = 'repfuel_custom_macro_goals_v2';

export const CalorieTracker = () => {
  const {
    dailyCalorieTarget,
    setDailyCalorieTarget,
    mealBreakdown,
    dailyTotals,
    dailyRemaining,
    isOverDaily,
    overDailyBy,
    baseMealTargets,
    mealCompensations,
    applyMealCompensation,
    resetMealCompensation,
  } = useNutritionProgress();

  // Calorie target editing state
  const [isEditingTarget, setIsEditingTarget] = useState(false);
  const [tempTarget, setTempTarget] = useState(dailyCalorieTarget);

  // Custom macro goals state
  const [customMacroGoals, setCustomMacroGoals] = useState(() => {
    return safeGetStorage(CUSTOM_MACROS_STORAGE_KEY, null);
  });
  const [isEditingMacros, setIsEditingMacros] = useState(false);
  const [tempMacroGoals, setTempMacroGoals] = useState({
    protein: '',
    carbs: '',
    fats: '',
  });

  // Meal compensation state
  const [activeOverMealKey, setActiveOverMealKey] = useState(null);
  const [compensationFeedback, setCompensationFeedback] = useState('');

  // 1. Calculate dynamic calorie-based macro goals:
  // Protein: 30% of calories / 4 kcal/g
  // Carbs: 40% of calories / 4 kcal/g
  // Fat: 30% of calories / 9 kcal/g
  const calorieBasedMacroGoals = useMemo(() => {
    return {
      protein: Math.round((dailyCalorieTarget * 0.30) / 4),
      carbs: Math.round((dailyCalorieTarget * 0.40) / 4),
      fats: Math.round((dailyCalorieTarget * 0.30) / 9),
    };
  }, [dailyCalorieTarget]);

  // Active macro goals (custom if user saved them, else calorie-based automatic)
  const activeMacroGoals = useMemo(() => {
    if (customMacroGoals && customMacroGoals.protein && customMacroGoals.carbs && customMacroGoals.fats) {
      return customMacroGoals;
    }
    return calorieBasedMacroGoals;
  }, [customMacroGoals, calorieBasedMacroGoals]);

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

  const handleOpenMacroEdit = () => {
    setTempMacroGoals({
      protein: activeMacroGoals.protein,
      carbs: activeMacroGoals.carbs,
      fats: activeMacroGoals.fats,
    });
    setIsEditingMacros(true);
  };

  const handleSaveCustomMacros = (e) => {
    e.preventDefault();
    const p = Math.max(10, Number(tempMacroGoals.protein) || calorieBasedMacroGoals.protein);
    const c = Math.max(10, Number(tempMacroGoals.carbs) || calorieBasedMacroGoals.carbs);
    const f = Math.max(5, Number(tempMacroGoals.fats) || calorieBasedMacroGoals.fats);
    const updated = { protein: p, carbs: c, fats: f };
    setCustomMacroGoals(updated);
    safeSetStorage(CUSTOM_MACROS_STORAGE_KEY, updated);
    setIsEditingMacros(false);
  };

  const handleResetToCalorieBasedMacros = () => {
    setCustomMacroGoals(null);
    safeSetStorage(CUSTOM_MACROS_STORAGE_KEY, null);
    setIsEditingMacros(false);
  };

  const mealEntries = [
    { key: 'breakfast', label: 'Breakfast' },
    { key: 'lunch', label: 'Lunch' },
    { key: 'dinner', label: 'Dinner' },
    { key: 'snacks', label: 'Snacks' },
  ];

  // Detect meals over target that can be compensated
  const overMeals = useMemo(() => {
    return mealEntries.filter(({ key }) => {
      const mealData = mealBreakdown[key];
      return mealData && mealData.isOver && mealData.overBy > 0;
    });
  }, [mealBreakdown]);

  const currentOverMeal = activeOverMealKey 
    ? overMeals.find((m) => m.key === activeOverMealKey) || overMeals[0]
    : overMeals[0];

  const compensationOptions = useMemo(() => {
    if (!currentOverMeal) return [];
    const mealData = mealBreakdown[currentOverMeal.key];
    return getCompensationOptions(
      currentOverMeal.key, 
      mealData.overBy, 
      baseMealTargets
    );
  }, [currentOverMeal, mealBreakdown, baseMealTargets]);

  const handleApplyCompensationOption = (opt) => {
    if (!opt) return;
    if (opt.id === 'keep_current') {
      setCompensationFeedback('Kept current allocation plan without reductions.');
    } else {
      applyMealCompensation(opt.adjustments);
      const updatedList = Object.entries(opt.adjustments).map(([mKey, adj]) => {
        const capitalMeal = mKey.charAt(0).toUpperCase() + mKey.slice(1);
        const newTarget = (baseMealTargets[mKey] || 0) + adj;
        return `${capitalMeal}: ${newTarget} kcal`;
      }).join(', ');
      setCompensationFeedback(`Allocations updated (${updatedList})`);
    }
    setTimeout(() => setCompensationFeedback(''), 5000);
  };

  const hasActiveCompensations = Object.keys(mealCompensations).length > 0;

  return (
    <section className="calorie-tracker-section" aria-label="Calorie and Macro Summary">
      <div className="calorie-summary-card">
        {/* Header with Title & Controls */}
        <div className="calorie-summary-header">
          <div className="calorie-header-title-wrap">
            <Flame className="calorie-header-flame" size={20} />
            <h2>Today&apos;s Calories</h2>
          </div>

          <div className="calorie-header-actions">
            {/* Macro Goals Customization Trigger */}
            <button
              type="button"
              className="macro-goals-edit-btn"
              onClick={handleOpenMacroEdit}
              title="Customize macro goals"
            >
              <Sliders size={13} />
              <span>Edit Goals</span>
            </button>

            {/* Daily Calorie Goal Editor */}
            <div className="calorie-goal-edit-wrap">
              {isEditingTarget ? (
                <form onSubmit={handleTargetSubmit} className="calorie-edit-form">
                  <input
                    type="number"
                    min="800"
                    max="6000"
                    step="50"
                    value={tempTarget}
                    onChange={(e) => setTempTarget(e.target.value)}
                    autoFocus
                    onBlur={handleTargetSubmit}
                    className="calorie-target-inline-input"
                  />
                  <span className="calorie-target-unit">kcal goal</span>
                </form>
              ) : (
                <button
                  type="button"
                  className="calorie-goal-display-btn"
                  onClick={() => {
                    setTempTarget(dailyCalorieTarget);
                    setIsEditingTarget(true);
                  }}
                  title="Click to edit daily calorie goal"
                >
                  <span>{dailyCalorieTarget.toLocaleString()} kcal goal</span>
                  <Edit3 size={13} className="calorie-edit-icon" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ==================================================== */}
        {/* 1. FOUR PROGRESS RINGS IN ONE HORIZONTAL ROW ON DESKTOP */}
        {/* Order: 1. Calories (Large), 2. Protein, 3. Carbs, 4. Fat */}
        {/* ==================================================== */}
        <div className="four-rings-row" role="group" aria-label="Today's Nutrition Rings">
          {/* 1. Large Calories Ring */}
          <div className="ring-column calories-col">
            <CalorieRing
              consumed={dailyTotals.calories}
              target={dailyCalorieTarget}
              size="standard"
              showRemaining={false}
            />
            <span className="ring-item-label calories-label">Calories</span>
          </div>

          {/* 2, 3, 4: Three Small Macro Rings horizontally aligned to the right */}
          <div className="macro-rings-group">
            {/* 2. Protein Ring */}
            <MacroRing
              label="Protein"
              consumed={dailyTotals.protein}
              goal={activeMacroGoals.protein}
              unit="g"
              size={96}
            />

            {/* 3. Carbs Ring */}
            <MacroRing
              label="Carbs"
              consumed={dailyTotals.carbs}
              goal={activeMacroGoals.carbs}
              unit="g"
              size={96}
            />

            {/* 4. Fat Ring */}
            <MacroRing
              label="Fat"
              consumed={dailyTotals.fats}
              goal={activeMacroGoals.fats}
              unit="g"
              size={96}
            />
          </div>
        </div>

        {/* Calorie Goal & Remaining Stats directly below rings */}
        <div className="calorie-stats-summary-line">
          <span className="calorie-stat-item goal">
            {dailyCalorieTarget.toLocaleString()} kcal goal
          </span>
          <span className="calorie-stat-divider">&bull;</span>
          <span className={`calorie-stat-item ${isOverDaily ? 'over' : 'remaining'}`}>
            {isOverDaily 
              ? `${overDailyBy.toLocaleString()} kcal over` 
              : `${dailyRemaining.toLocaleString()} kcal remaining`}
          </span>
        </div>

        {/* Optional Custom Macro Goals Edit Modal */}
        {isEditingMacros && (
          <div 
            className="macro-edit-modal-backdrop" 
            onClick={() => setIsEditingMacros(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Edit Macro Goals"
          >
            <div className="macro-edit-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="macro-edit-header">
                <div>
                  <h3 className="macro-edit-title">Macro Goals</h3>
                  <p className="macro-edit-sub">
                    Default derived from {dailyCalorieTarget.toLocaleString()} kcal (30% P / 40% C / 30% F)
                  </p>
                </div>
                <button
                  type="button"
                  className="macro-edit-close-btn"
                  onClick={() => setIsEditingMacros(false)}
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSaveCustomMacros} className="macro-edit-form">
                <div className="macro-edit-field">
                  <label htmlFor="macro-input-protein">Protein goal</label>
                  <div className="macro-input-group">
                    <input
                      id="macro-input-protein"
                      type="number"
                      min="10"
                      max="600"
                      value={tempMacroGoals.protein}
                      onChange={(e) => setTempMacroGoals((prev) => ({ ...prev, protein: e.target.value }))}
                      required
                    />
                    <span className="macro-input-unit">g</span>
                  </div>
                </div>

                <div className="macro-edit-field">
                  <label htmlFor="macro-input-carbs">Carbs goal</label>
                  <div className="macro-input-group">
                    <input
                      id="macro-input-carbs"
                      type="number"
                      min="10"
                      max="800"
                      value={tempMacroGoals.carbs}
                      onChange={(e) => setTempMacroGoals((prev) => ({ ...prev, carbs: e.target.value }))}
                      required
                    />
                    <span className="macro-input-unit">g</span>
                  </div>
                </div>

                <div className="macro-edit-field">
                  <label htmlFor="macro-input-fat">Fat goal</label>
                  <div className="macro-input-group">
                    <input
                      id="macro-input-fat"
                      type="number"
                      min="5"
                      max="400"
                      value={tempMacroGoals.fats}
                      onChange={(e) => setTempMacroGoals((prev) => ({ ...prev, fats: e.target.value }))}
                      required
                    />
                    <span className="macro-input-unit">g</span>
                  </div>
                </div>

                <div className="macro-edit-actions">
                  <button type="submit" className="macro-save-btn">
                    Save Goals
                  </button>
                  <button
                    type="button"
                    className="macro-reset-btn"
                    onClick={handleResetToCalorieBasedMacros}
                  >
                    Use Calorie-Based Goals
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Simple Calorie Compensation Section (Functional & Clean) */}
        {currentOverMeal && (
          <div className="simple-compensation-box" role="region" aria-label="Meal Calorie Compensation">
            <div className="simple-comp-top">
              <span className="simple-comp-meal-name">{currentOverMeal.label}</span>
              <span className="simple-comp-meal-stats">
                {mealBreakdown[currentOverMeal.key].calories} / {mealBreakdown[currentOverMeal.key].baseTarget} kcal
              </span>
            </div>
            
            <div className="simple-comp-over-badge">
              {mealBreakdown[currentOverMeal.key].overBy} kcal over
            </div>

            <p className="simple-comp-prompt">Adjust remaining meals?</p>

            <div className="simple-comp-actions-list">
              {compensationOptions.map((opt) => {
                let buttonLabel = opt.label;
                if (opt.id.startsWith('split_')) {
                  buttonLabel = 'Split';
                } else if (opt.id === 'keep_current') {
                  buttonLabel = 'Keep As Is';
                }

                return (
                  <button
                    key={opt.id}
                    type="button"
                    className="simple-comp-btn"
                    onClick={() => handleApplyCompensationOption(opt)}
                  >
                    {buttonLabel}
                  </button>
                );
              })}
            </div>

            {compensationFeedback && (
              <div className="simple-comp-feedback-msg">
                <CheckCircle2 size={14} />
                <span>{compensationFeedback}</span>
              </div>
            )}
          </div>
        )}

        {/* Active compensation status pill if compensation applied and no meal currently over */}
        {!currentOverMeal && hasActiveCompensations && (
          <div className="simple-comp-active-banner">
            <span>Remaining meals adjusted for balance.</span>
            <button
              type="button"
              className="simple-comp-reset-link"
              onClick={resetMealCompensation}
            >
              <RefreshCw size={12} />
              <span>Reset</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
