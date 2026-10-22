import React, { useState } from 'react';
import { 
  Sparkles, 
  Plus, 
  Trash2, 
  AlertCircle, 
  Check, 
  X, 
  ChevronDown,
  RefreshCw,
  Edit2,
  Brain,
  Info
} from 'lucide-react';
import { useNutritionProgress } from '../../context/NutritionProgressContext';
import { estimateFoodNutrition, validateNutritionInput } from '../../services/geminiNutritionService';
import '../../styles/components/food-logger.css';

const QUICK_SUGGESTIONS = [
  { label: '2 Rotis', foodName: 'Roti', quantity: 2, unit: 'piece', prep: 'Whole wheat, homemade without oil' },
  { label: '250 g Rice', foodName: 'Cooked white rice', quantity: 250, unit: 'g', prep: 'Steamed plain white rice' },
  { label: '200 g Paneer', foodName: 'Paneer', quantity: 200, unit: 'g', prep: 'Fresh whole milk cottage cheese, raw' },
  { label: '1 Bowl Dal', foodName: 'Dal', quantity: 1, unit: 'bowl', prep: 'Yellow dal tadka, homemade' },
  { label: '150 g Chicken Breast', foodName: 'Chicken breast', quantity: 150, unit: 'g', prep: 'Grilled, skinless' },
  { label: '2 Boiled Eggs', foodName: 'Boiled eggs', quantity: 2, unit: 'piece', prep: 'Hard boiled whole eggs' },
];

const UNIT_OPTIONS = [
  { value: 'g', label: 'g (grams)' },
  { value: 'kg', label: 'kg (kilograms)' },
  { value: 'ml', label: 'ml (millilitres)' },
  { value: 'l', label: 'l (litres)' },
  { value: 'piece', label: 'piece / item' },
  { value: 'bowl', label: 'bowl / katori' },
  { value: 'cup', label: 'cup' },
  { value: 'plate', label: 'plate' },
  { value: 'tbsp', label: 'tablespoon (tbsp)' },
  { value: 'serving', label: 'serving' },
];

const MEAL_OPTIONS = [
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'lunch', label: 'Lunch' },
  { value: 'dinner', label: 'Dinner' },
  { value: 'snacks', label: 'Snacks' },
  { value: 'cheat', label: 'Cheat Meal' },
];

export const FoodLogger = () => {
  const {
    loggedFoods,
    addFoodItem,
    updateFoodItem,
    removeFoodItem,
    mealBreakdown,
  } = useNutritionProgress();

  // Form State
  const [foodName, setFoodName] = useState('');
  const [quantity, setQuantity] = useState(100);
  const [unit, setUnit] = useState('g');
  const [preparation, setPreparation] = useState('');
  const [selectedMeal, setSelectedMeal] = useState('breakfast');

  // Estimation & Review State
  const [isEstimating, setIsEstimating] = useState(false);
  const [estimateError, setEstimateError] = useState('');
  const [estimatedResult, setEstimatedResult] = useState(null);
  const [successToast, setSuccessToast] = useState('');

  // Editing existing logged food state
  const [editingItem, setEditingItem] = useState(null);
  const [editQty, setEditQty] = useState(1);
  const [editUnit, setEditUnit] = useState('g');
  const [editMeal, setEditMeal] = useState('breakfast');
  const [editIsCheat, setEditIsCheat] = useState(false);
  const [isReEstimating, setIsReEstimating] = useState(false);
  const [editError, setEditError] = useState('');

  // Quick fill handler
  const handleSelectSuggestion = (sug) => {
    setFoodName(sug.foodName);
    setQuantity(sug.quantity);
    setUnit(sug.unit);
    setPreparation(sug.prep);
    setEstimatedResult(null);
    setEstimateError('');
  };

  // Unit change helper to set sensible default quantity
  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);
    if ((newUnit === 'g' || newUnit === 'ml') && quantity <= 5) {
      setQuantity(100);
    } else if (newUnit !== 'g' && newUnit !== 'ml' && quantity >= 25) {
      setQuantity(1);
    }
  };

  // Step quantity with existing increment/decrement buttons
  const handleStepQuantity = (delta) => {
    const step = unit === 'g' || unit === 'ml' ? 25 : 0.5;
    const current = parseFloat(quantity) || 0;
    setQuantity(Math.max(0.1, Number((current + delta * step).toFixed(1))));
  };

  // Estimate Nutrition using Gemini API
  const handleEstimateNutrition = async (e) => {
    if (e) e.preventDefault();

    setEstimateError('');
    setSuccessToast('');

    const parsedQty = parseFloat(quantity);
    const validation = validateNutritionInput({ foodName, quantity: parsedQty, unit });
    if (!validation.isValid) {
      setEstimateError(validation.errors[0]);
      return;
    }

    setIsEstimating(true);

    try {
      const data = await estimateFoodNutrition({
        foodName,
        quantity: parsedQty,
        unit,
        preparation,
      });

      setEstimatedResult(data);
    } catch (err) {
      setEstimateError(err.message || 'Failed to estimate nutrition. Please try again.');
    } finally {
      setIsEstimating(false);
    }
  };

  // Confirm and Log to LocalStorage / Context
  const handleConfirmAddFood = () => {
    if (!estimatedResult) return;

    const isCheat = selectedMeal === 'cheat';
    const targetMeal = isCheat ? 'snacks' : selectedMeal;

    addFoodItem({
      ...estimatedResult,
      name: estimatedResult.foodName || foodName,
      meal: targetMeal,
      isCheatMeal: isCheat,
    });

    const mealLabel = MEAL_OPTIONS.find((m) => m.value === selectedMeal)?.label || 'Meal';
    setSuccessToast(`Added ${estimatedResult.foodName} to ${mealLabel}!`);

    // Reset estimator after confirm
    setEstimatedResult(null);
    setFoodName('');
    setPreparation('');

    setTimeout(() => {
      setSuccessToast('');
    }, 4000);
  };

  // Open Edit Dialog for Logged Item
  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setEditQty(item.quantity || 1);
    setEditUnit(item.unit || 'g');
    setEditMeal(item.meal || 'breakfast');
    setEditIsCheat(Boolean(item.isCheatMeal));
    setEditError('');
  };

  // Save Edit Dialog Changes
  const handleSaveEdit = () => {
    if (!editingItem) return;

    const parsed = Number(editQty);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      setEditError('Quantity must be greater than 0.');
      return;
    }

    updateFoodItem(editingItem.logId, {
      quantity: parsed,
      unit: editUnit,
      meal: editMeal,
      isCheatMeal: editIsCheat,
    });

    setEditingItem(null);
  };

  // Re-estimate logged item with Gemini
  const handleReEstimateLoggedItem = async () => {
    if (!editingItem) return;

    const parsed = parseFloat(editQty);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      setEditError('Quantity must be a positive number greater than 0.');
      return;
    }

    setIsReEstimating(true);
    setEditError('');

    try {
      const data = await estimateFoodNutrition({
        foodName: editingItem.name,
        quantity: parsed,
        unit: editUnit,
        preparation: editingItem.preparation || '',
      });

      updateFoodItem(editingItem.logId, {
        ...data,
        meal: editMeal,
        isCheatMeal: editIsCheat,
      });

      setEditingItem(null);
    } catch (err) {
      setEditError(`Re-estimation error: ${err.message}`);
    } finally {
      setIsReEstimating(false);
    }
  };

  const mealOrder = ['breakfast', 'lunch', 'dinner', 'snacks'];
  const mealLabels = {
    breakfast: 'Breakfast',
    lunch: 'Lunch',
    dinner: 'Dinner',
    snacks: 'Snacks',
  };

  return (
    <div className="food-logger-container">
      {/* 1. Dynamic Gemini AI Nutrition Estimator */}
      <section className="food-logger-add-card" aria-label="Gemini Nutrition Estimator">
        <div className="food-logger-header">
          <div className="food-logger-title-wrap">
            <div className="food-logger-icon" aria-hidden="true">
              <Brain size={22} />
            </div>
            <div>
              <h3>AI Nutrition Estimator</h3>
              <p>Dynamic macros for any food, dish, or quantity powered by Google Gemini</p>
            </div>
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="ai-suggestions-wrap">
          <span className="ai-suggestions-title">Quick Examples</span>
          <div className="ai-chips-list" role="toolbar" aria-label="Suggested food items">
            {QUICK_SUGGESTIONS.map((sug) => (
              <button
                key={sug.label}
                type="button"
                className="ai-chip"
                onClick={() => handleSelectSuggestion(sug)}
              >
                + {sug.label}
              </button>
            ))}
          </div>
        </div>

        {/* AI Input Form */}
        <form className="ai-estimator-form" onSubmit={handleEstimateNutrition}>
          <div className="ai-inputs-grid">
            {/* Food Name */}
            <div className="ai-field ai-field-food">
              <label htmlFor="food-name-input" className="ai-label">Food Item or Dish</label>
              <input
                id="food-name-input"
                type="text"
                className="ai-text-input"
                placeholder="e.g. 2 medium rotis, Paneer tikka, 1 bowl dal..."
                value={foodName}
                onChange={(e) => {
                  setFoodName(e.target.value);
                  if (estimateError) setEstimateError('');
                }}
                disabled={isEstimating}
                autoComplete="off"
              />
            </div>

            {/* Quantity */}
            <div className="ai-field">
              <label htmlFor="food-qty-input" className="ai-label">Quantity</label>
              <div className="quantity-stepper">
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => handleStepQuantity(-1)}
                  disabled={isEstimating}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <input
                  id="food-qty-input"
                  type="number"
                  min="0.1"
                  max="5000"
                  step="0.1"
                  className="qty-input"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  disabled={isEstimating}
                />
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => handleStepQuantity(1)}
                  disabled={isEstimating}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Unit */}
            <div className="ai-field">
              <label htmlFor="food-unit-select" className="ai-label">Unit</label>
              <div className="unit-select-wrap">
                <select
                  id="food-unit-select"
                  className="unit-dropdown-select"
                  value={unit}
                  onChange={(e) => handleUnitChange(e.target.value)}
                  disabled={isEstimating}
                >
                  {UNIT_OPTIONS.map((u) => (
                    <option key={u.value} value={u.value}>{u.label}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="unit-select-arrow" aria-hidden="true" />
              </div>
            </div>
          </div>

          {/* Optional Details Row */}
          <div className="ai-optional-row">
            {/* Preparation Method */}
            <div className="ai-field">
              <label htmlFor="food-prep-input" className="ai-label">Preparation Method (Optional)</label>
              <input
                id="food-prep-input"
                type="text"
                className="ai-text-input"
                placeholder="e.g. Cooked without oil, with 1 tsp ghee, grilled, boiled..."
                value={preparation}
                onChange={(e) => setPreparation(e.target.value)}
                disabled={isEstimating}
              />
            </div>

            {/* Meal Category */}
            <div className="ai-field">
              <label htmlFor="food-meal-select" className="ai-label">Target Meal</label>
              <div className="meal-select-wrap">
                <select
                  id="food-meal-select"
                  className="meal-dropdown-select"
                  value={selectedMeal}
                  onChange={(e) => setSelectedMeal(e.target.value)}
                  disabled={isEstimating}
                >
                  {MEAL_OPTIONS.map((m) => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="unit-select-arrow" aria-hidden="true" />
              </div>
            </div>
          </div>

          {/* Estimate Button */}
          <button
            type="submit"
            className="ai-estimate-btn"
            disabled={isEstimating || !foodName.trim()}
          >
            {isEstimating ? (
              <>
                <RefreshCw size={17} className="ai-spinner" aria-hidden="true" />
                <span>Estimating with Gemini AI...</span>
              </>
            ) : (
              <>
                <Sparkles size={17} aria-hidden="true" />
                <span>Estimate Nutrition</span>
              </>
            )}
          </button>
        </form>

        {/* Error Notification */}
        {estimateError && (
          <div className="ai-error-banner" role="alert">
            <div className="ai-error-banner-content">
              <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Estimation Failed:</strong> {estimateError}
              </div>
            </div>
            <button
              type="button"
              className="ai-error-retry-btn"
              onClick={handleEstimateNutrition}
            >
              Retry
            </button>
          </div>
        )}

        {/* Success Confirmation Toast */}
        {successToast && (
          <div className="ai-success-toast" role="status">
            <Check size={18} />
            <span>{successToast}</span>
          </div>
        )}

        {/* 2. Review & Confirmation Card */}
        {estimatedResult && (
          <div className="ai-review-card" aria-label="Review Nutrition Estimate">
            <div className="ai-review-header">
              <div>
                <h4 className="ai-review-title">{estimatedResult.foodName}</h4>
                <span className="ai-review-serving">
                  Quantity: {estimatedResult.quantity} {estimatedResult.unit}
                  {estimatedResult.preparation && ` • ${estimatedResult.preparation}`}
                </span>
              </div>
              <span className="ai-review-badge">
                <Sparkles size={12} />
                <span>AI Estimated</span>
              </span>
            </div>

            {/* Nutrition Breakdown */}
            <div className="ai-macros-grid">
              <div className="ai-macro-box calories">
                <span className="ai-macro-lbl">Calories</span>
                <span className="ai-macro-val">{estimatedResult.calories} kcal</span>
              </div>
              <div className="ai-macro-box">
                <span className="ai-macro-lbl">Protein</span>
                <span className="ai-macro-val">{estimatedResult.protein} g</span>
              </div>
              <div className="ai-macro-box">
                <span className="ai-macro-lbl">Carbs</span>
                <span className="ai-macro-val">{estimatedResult.carbs} g</span>
              </div>
              <div className="ai-macro-box">
                <span className="ai-macro-lbl">Fats</span>
                <span className="ai-macro-val">{estimatedResult.fats || estimatedResult.fat} g</span>
              </div>
              <div className="ai-macro-box">
                <span className="ai-macro-lbl">Fiber</span>
                <span className="ai-macro-val">{estimatedResult.fiber || 0} g</span>
              </div>
            </div>

            {/* Assumptions from Gemini */}
            {estimatedResult.assumptions && estimatedResult.assumptions.length > 0 && (
              <div className="ai-assumptions-box">
                <span className="ai-assumptions-title">
                  <Info size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-1px' }} />
                  AI Assumptions &amp; Notes
                </span>
                <ul className="ai-assumptions-list">
                  {estimatedResult.assumptions.map((assump, idx) => (
                    <li key={idx}>{assump}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Review Actions */}
            <div className="ai-review-actions">
              <button
                type="button"
                className="ai-confirm-btn"
                onClick={handleConfirmAddFood}
              >
                <Check size={16} />
                <span>Confirm &amp; Log to {MEAL_OPTIONS.find((m) => m.value === selectedMeal)?.label || 'Meal'}</span>
              </button>
              <button
                type="button"
                className="ai-secondary-btn"
                onClick={() => setEstimatedResult(null)}
              >
                Discard
              </button>
            </div>
          </div>
        )}
      </section>

      {/* 3. Logged Meals Section (Breakfast, Lunch, Dinner, Snacks) */}
      <section className="logged-meals-section" aria-label="Logged Foods By Meal">
        {mealOrder.map((mealKey) => {
          const mealData = mealBreakdown[mealKey] || { 
            items: [], 
            calories: 0, 
            target: 0, 
            isOver: false, 
            overBy: 0, 
            adjustment: 0 
          };
          const mealName = mealLabels[mealKey];

          return (
            <div 
              key={mealKey} 
              className={`simple-meal-card ${mealData.isOver ? 'exceeded' : ''}`}
            >
              {/* Meal Header */}
              <div className="simple-meal-header">
                <div className="simple-meal-title-group">
                  <h4 className="simple-meal-name">{mealName}</h4>
                  {mealData.adjustment !== 0 && (
                    <span className="simple-meal-comp-tag">
                      Target adjusted: {mealData.adjustment > 0 ? `+${mealData.adjustment}` : mealData.adjustment} kcal
                    </span>
                  )}
                </div>

                <div className="simple-meal-total">
                  <span className="simple-meal-cals">{mealData.calories}</span>
                  <span className="simple-meal-target"> / {mealData.target} kcal</span>
                </div>
              </div>

              {/* Over target alert */}
              {mealData.isOver && (
                <div className="simple-meal-over-alert" role="alert">
                  <AlertCircle size={15} style={{ flexShrink: 0 }} />
                  <span>
                    <strong>{mealName} is {mealData.overBy} kcal over target.</strong> Adjust remaining meals in Calorie Tracker above.
                  </span>
                </div>
              )}

              {/* Items List */}
              {mealData.items.length > 0 ? (
                <div className="simple-logged-list">
                  {mealData.items.map((item) => (
                    <div 
                      key={item.logId} 
                      className={`simple-logged-row ${item.isCheatMeal ? 'is-cheat' : ''}`}
                    >
                      <div className="simple-logged-left">
                        <div className="simple-logged-name-line">
                          <span className="simple-logged-item-name">{item.name}</span>
                          {item.isCheatMeal && (
                            <span className="simple-cheat-tag">🍔 Cheat Meal</span>
                          )}
                        </div>
                        <span className="simple-logged-item-sub">
                          {item.quantity} {item.unit || 'g'} &bull; {item.calories} kcal &bull; P: {item.protein}g &bull; C: {item.carbs}g &bull; F: {item.fats || item.fat}g{item.fiber ? ` • Fib: ${item.fiber}g` : ''}
                        </span>
                      </div>

                      {/* Actions: Edit and Remove */}
                      <div className="simple-logged-actions">
                        <button
                          type="button"
                          className="simple-action-link"
                          onClick={() => handleOpenEdit(item)}
                          title="Edit this entry"
                        >
                          <Edit2 size={13} style={{ display: 'inline', marginRight: '3px', verticalAlign: '-1px' }} />
                          Edit
                        </button>
                        <button
                          type="button"
                          className="simple-action-link remove"
                          onClick={() => removeFoodItem(item.logId)}
                          title="Remove food"
                        >
                          <Trash2 size={13} style={{ display: 'inline', marginRight: '3px', verticalAlign: '-1px' }} />
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="simple-empty-meal">
                  No food logged for {mealName} yet.
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* 4. Edit Logged Food Modal */}
      {editingItem && (
        <div className="food-modal-backdrop" role="dialog" aria-modal="true" aria-label="Edit Food Item">
          <div className="food-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="food-modal-header">
              <div>
                <h3 className="food-modal-title">Edit Food Entry</h3>
                <span className="food-modal-serving-subtitle">{editingItem.name}</span>
              </div>
              <button
                type="button"
                className="food-modal-close"
                onClick={() => setEditingItem(null)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="food-modal-nutrition-panel">
              <div className="food-nutrition-row">
                <span className="food-nutrition-label">Current Calories</span>
                <strong className="food-nutrition-val calories">{editingItem.calories} kcal</strong>
              </div>
              <div className="food-nutrition-row">
                <span className="food-nutrition-label">Protein</span>
                <strong className="food-nutrition-val">{editingItem.protein} g</strong>
              </div>
              <div className="food-nutrition-row">
                <span className="food-nutrition-label">Carbs</span>
                <strong className="food-nutrition-val">{editingItem.carbs} g</strong>
              </div>
              <div className="food-nutrition-row">
                <span className="food-nutrition-label">Fats</span>
                <strong className="food-nutrition-val">{editingItem.fats || editingItem.fat} g</strong>
              </div>
            </div>

            <div className="food-modal-inputs-row" style={{ marginTop: '0.75rem' }}>
              <div className="food-modal-field">
                <label className="food-modal-label">Quantity</label>
                <input
                  type="number"
                  min="0.1"
                  max="5000"
                  step="0.1"
                  className="ai-text-input"
                  value={editQty}
                  onChange={(e) => setEditQty(e.target.value)}
                  disabled={isReEstimating}
                />
              </div>

              <div className="food-modal-field">
                <label className="food-modal-label">Unit</label>
                <div className="unit-select-wrap">
                  <select
                    className="unit-dropdown-select"
                    value={editUnit}
                    onChange={(e) => setEditUnit(e.target.value)}
                    disabled={isReEstimating}
                  >
                    {UNIT_OPTIONS.map((u) => (
                      <option key={u.value} value={u.value}>{u.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="unit-select-arrow" />
                </div>
              </div>
            </div>

            <div className="food-modal-meal-dropdown-row" style={{ marginTop: '0.5rem' }}>
              <label className="food-modal-label">Meal</label>
              <div className="meal-select-wrap">
                <select
                  className="meal-dropdown-select"
                  value={editMeal}
                  onChange={(e) => setEditMeal(e.target.value)}
                  disabled={isReEstimating}
                >
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snacks">Snacks</option>
                </select>
                <ChevronDown size={14} className="unit-select-arrow" />
              </div>
            </div>

            <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                id="edit-is-cheat"
                checked={editIsCheat}
                onChange={(e) => setEditIsCheat(e.target.checked)}
                disabled={isReEstimating}
              />
              <label htmlFor="edit-is-cheat" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                Tag as Cheat Meal
              </label>
            </div>

            {editError && (
              <p className="profile-error" role="alert" style={{ marginTop: '0.75rem', fontSize: '0.82rem' }}>
                {editError}
              </p>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '1rem' }}>
              <button
                type="button"
                className="food-modal-add-btn"
                onClick={handleSaveEdit}
                disabled={isReEstimating}
              >
                Save Proportional Changes
              </button>
              <button
                type="button"
                className="ai-secondary-btn"
                style={{ justifyContent: 'center' }}
                onClick={handleReEstimateLoggedItem}
                disabled={isReEstimating}
              >
                {isReEstimating ? (
                  <>
                    <RefreshCw size={15} className="ai-spinner" />
                    <span>Recalculating with Gemini...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={15} />
                    <span>Recalculate with Gemini AI</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodLogger;
