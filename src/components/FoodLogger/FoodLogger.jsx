import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  Trash2, 
  AlertCircle, 
  Utensils, 
  Coffee, 
  Sun, 
  Moon, 
  Cookie, 
  Check, 
  Edit3, 
  X, 
  Flame, 
  ChevronDown,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { indianFoods, indianFoodCategories, getNutritionForServing } from '../../data/indianFoodsData';
import { useNutritionProgress } from '../../context/NutritionProgressContext';
import '../../styles/components/food-logger.css';

export const FoodLogger = () => {
  const {
    loggedFoods,
    addFoodItem,
    updateFoodItem,
    removeFoodItem,
    mealBreakdown,
  } = useNutritionProgress();

  // Active logging state
  const [selectedMeal, setSelectedMeal] = useState('breakfast');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeFood, setActiveFood] = useState(null);
  const [servingQty, setServingQty] = useState(1);
  const [selectedUnit, setSelectedUnit] = useState('');
  const [isCheatMealActive, setIsCheatMealActive] = useState(false);
  const [justAddedAlert, setJustAddedAlert] = useState(false);

  // Change Food Modal State
  const [changingItem, setChangingItem] = useState(null); // the logged item being replaced
  const [replacementSearch, setReplacementSearch] = useState('');
  const [replacementCategory, setReplacementCategory] = useState('All');
  const [selectedReplacementFood, setSelectedReplacementFood] = useState(null);
  const [replacementQty, setReplacementQty] = useState(1);
  const [replacementUnit, setReplacementUnit] = useState('');

  // Filter foods by search query and category for main selector
  const filteredFoods = useMemo(() => {
    return indianFoods.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  // Filter foods for replacement modal
  const filteredReplacementFoods = useMemo(() => {
    return indianFoods.filter((item) => {
      const matchesCategory = replacementCategory === 'All' || item.category === replacementCategory;
      const matchesSearch = item.name.toLowerCase().includes(replacementSearch.toLowerCase()) ||
        item.category.toLowerCase().includes(replacementSearch.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [replacementSearch, replacementCategory]);

  const handleSelectFood = (food) => {
    setActiveFood(food);
    const defaultU = food.defaultUnit || Object.keys(food.units || {})[0] || 'serving';
    setSelectedUnit(defaultU);
    // Sensible initial quantities (e.g. 100 for gram, 1 for bowl/piece)
    if (defaultU === 'gram' || defaultU === 'millilitre') {
      setServingQty(100);
    } else {
      setServingQty(1);
    }
  };

  const handleAddFood = () => {
    if (!activeFood) return;
    addFoodItem(selectedMeal, activeFood, servingQty, selectedUnit, isCheatMealActive);
    setJustAddedAlert(true);
    setTimeout(() => setJustAddedAlert(false), 2000);
    // Reset cheat meal toggle after logging
    setIsCheatMealActive(false);
  };

  // Open Change Food Modal for an existing logged food
  const handleOpenChangeFood = (item) => {
    setChangingItem(item);
    const currFood = indianFoods.find((f) => f.id === item.foodId);
    setSelectedReplacementFood(currFood || null);
    setReplacementQty(item.quantity || 1);
    setReplacementUnit(item.unit || (currFood ? currFood.defaultUnit : 'serving'));
    setReplacementSearch('');
  };

  const handleConfirmChangeFood = () => {
    if (!changingItem || !selectedReplacementFood) return;
    updateFoodItem(changingItem.logId, {
      newFood: selectedReplacementFood,
      quantity: replacementQty,
      unit: replacementUnit,
    });
    setChangingItem(null);
  };

  // Live calculation for currently selected active food
  const activeCalculatedNutrients = useMemo(() => {
    if (!activeFood) return null;
    return getNutritionForServing(activeFood, servingQty, selectedUnit);
  }, [activeFood, servingQty, selectedUnit]);

  // Live calculation for replacement modal
  const replacementCalculatedNutrients = useMemo(() => {
    if (!selectedReplacementFood) return null;
    return getNutritionForServing(selectedReplacementFood, replacementQty, replacementUnit);
  }, [selectedReplacementFood, replacementQty, replacementUnit]);

  const mealIcons = {
    breakfast: Coffee,
    lunch: Sun,
    dinner: Moon,
    snacks: Cookie,
  };

  const mealKeys = ['breakfast', 'lunch', 'dinner', 'snacks'];

  return (
    <div className="food-logger-container">
      {/* 1. Add Food to Meal Section */}
      <section className="food-logger-add-card" aria-label="Log Food Section">
        <div className="food-logger-header">
          <div className="food-logger-title-wrap">
            <div className="food-logger-icon" aria-hidden="true">
              <Utensils size={22} />
            </div>
            <div>
              <h3>Indian Food Database &amp; Logger</h3>
              <p>Authentic Indian dishes with gram, bowl, cup, piece &amp; roti measurements</p>
            </div>
          </div>

          {/* Meal Target Selector & Dedicated Cheat Meal Button */}
          <div className="meal-controls-top-row">
            <div className="meal-selector-tabs" role="tablist">
              {mealKeys.map((mealKey) => {
                const Icon = mealIcons[mealKey];
                const isActive = selectedMeal === mealKey;
                return (
                  <button
                    key={mealKey}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`meal-tab-btn ${isActive ? 'active' : ''}`}
                    onClick={() => setSelectedMeal(mealKey)}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <Icon size={14} />
                      {mealKey.charAt(0).toUpperCase() + mealKey.slice(1)}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Dedicated "+ Add Cheat Meal" Button */}
            <button
              type="button"
              className={`cheat-meal-toggle-btn ${isCheatMealActive ? 'active' : ''}`}
              onClick={() => setIsCheatMealActive(!isCheatMealActive)}
              title="Toggle Cheat Meal flag for next logged item"
            >
              <span className="cheat-emoji">🍔</span>
              <span>{isCheatMealActive ? 'Cheat Meal Enabled' : '+ Add Cheat Meal'}</span>
            </button>
          </div>
        </div>

        {/* Search Bar & Category Filters */}
        <div className="food-search-controls">
          <div className="food-search-input-wrap">
            <Search className="food-search-icon" size={18} aria-hidden="true" />
            <input
              type="text"
              className="food-search-input"
              placeholder="Search 130+ Indian foods (e.g., Paneer, Dal Makhani, Biryani, Roti, Dosa, Egg, Milk, Chai)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search Indian foods"
            />
          </div>

          {/* Categories Horizontal Scroll */}
          <div className="category-filter-pills" role="toolbar" aria-label="Food Categories">
            {indianFoodCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Food Selection Grid */}
        <div className="food-selection-grid" role="listbox" aria-label="Select Food Item">
          {filteredFoods.map((food) => {
            const isSelected = activeFood?.id === food.id;
            return (
              <div
                key={food.id}
                role="option"
                aria-selected={isSelected}
                tabIndex={0}
                className={`food-item-option-card ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelectFood(food)}
                onKeyDown={(e) => e.key === 'Enter' && handleSelectFood(food)}
              >
                <div className="food-option-top">
                  <span className="food-option-name">{food.name}</span>
                  <span className="food-option-cat">{food.category}</span>
                </div>
                <span className="food-option-serving">{food.serving}</span>
                <div className="food-option-macros">
                  <span className="food-macro-tag cals">{food.calories} kcal</span>
                  <span className="food-macro-tag prot">P: {food.protein}g</span>
                  <span className="food-macro-tag carb">C: {food.carbs}g</span>
                  <span className="food-macro-tag fat">F: {food.fats}g</span>
                </div>
              </div>
            );
          })}
          {filteredFoods.length === 0 && (
            <div style={{ gridColumn: '1 / -1', padding: '2.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              No authentic dishes found matching &quot;{searchQuery}&quot;. Try searching for Paneer, Biryani, Dal, or Omelette.
            </div>
          )}
        </div>

        {/* Selected Food Action Bar with Multiple Measurement Types */}
        {activeFood && activeCalculatedNutrients && (
          <div className="selected-food-action-bar">
            <div className="selected-food-info">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span className="selected-food-title">{activeFood.name}</span>
                {isCheatMealActive && (
                  <span className="cheat-meal-active-pill">🍔 Cheat Meal</span>
                )}
              </div>
              
              <div className="selected-food-calc-line">
                <span>Calculated: </span>
                <strong style={{ color: 'var(--accent-primary)', fontSize: '1.05rem' }}>
                  {activeCalculatedNutrients.calories} kcal
                </strong>
                <span>| Protein: <strong>{activeCalculatedNutrients.protein}g</strong></span>
                <span>| Carbs: <strong>{activeCalculatedNutrients.carbs}g</strong></span>
                <span>| Fats: <strong>{activeCalculatedNutrients.fats}g</strong></span>
              </div>
            </div>

            <div className="selected-food-controls">
              {/* Measurement Unit & Quantity Controls */}
              <div className="measurement-controls-group">
                {/* Quantity Input & Stepper */}
                <div className="quantity-stepper">
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() => {
                      const step = selectedUnit === 'gram' || selectedUnit === 'millilitre' ? 25 : 0.5;
                      setServingQty((q) => Math.max(step, Number((q - step).toFixed(1))));
                    }}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="0.1"
                    max="5000"
                    step={selectedUnit === 'gram' || selectedUnit === 'millilitre' ? '25' : '0.5'}
                    className="qty-input"
                    value={servingQty}
                    onChange={(e) => setServingQty(Math.max(0.1, parseFloat(e.target.value) || 1))}
                    aria-label="Quantity of serving"
                  />
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() => {
                      const step = selectedUnit === 'gram' || selectedUnit === 'millilitre' ? 25 : 0.5;
                      setServingQty((q) => Number((q + step).toFixed(1)));
                    }}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Intelligent Unit Dropdown based on food's supported units */}
                <div className="unit-select-wrap">
                  <select
                    className="unit-dropdown-select"
                    value={selectedUnit}
                    onChange={(e) => {
                      const newU = e.target.value;
                      setSelectedUnit(newU);
                      // Adjust default quantity if switching to/from grams/ml
                      if ((newU === 'gram' || newU === 'millilitre') && servingQty <= 5) {
                        setServingQty(100);
                      } else if (newU !== 'gram' && newU !== 'millilitre' && servingQty > 20) {
                        setServingQty(1);
                      }
                    }}
                    aria-label="Serving Measurement Unit"
                  >
                    {activeFood.units && Object.keys(activeFood.units).map((uKey) => {
                      const uConfig = activeFood.units[uKey];
                      return (
                        <option key={uKey} value={uKey}>
                          {uConfig.label || uKey}
                        </option>
                      );
                    })}
                  </select>
                  <ChevronDown size={14} className="unit-select-arrow" />
                </div>
              </div>

              {/* Add Button */}
              <button
                type="button"
                className={`add-food-btn ${isCheatMealActive ? 'cheat' : ''}`}
                onClick={handleAddFood}
              >
                {justAddedAlert ? (
                  <>
                    <Check size={16} /> Added!
                  </>
                ) : isCheatMealActive ? (
                  <>
                    <span>🍔</span> Log Cheat Meal
                  </>
                ) : (
                  <>
                    <Plus size={16} /> Add to {selectedMeal.charAt(0).toUpperCase() + selectedMeal.slice(1)}
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </section>

      {/* 2. Grouped Logged Meals List with Change Food & Serving Adjustments */}
      <section className="logged-meals-section" aria-label="Logged Foods By Meal">
        {mealKeys.map((mealKey) => {
          const mealData = mealBreakdown[mealKey] || { 
            items: [], 
            calories: 0, 
            target: 0, 
            isOver: false, 
            overBy: 0, 
            adjustment: 0 
          };
          const Icon = mealIcons[mealKey];

          return (
            <div 
              key={mealKey} 
              className={`meal-block-card ${mealData.isOver ? 'exceeded' : ''}`}
            >
              {/* Meal Block Header */}
              <div className="meal-block-header">
                <div className="meal-block-title-group">
                  <div className="meal-block-badge-icon">
                    <Icon size={18} />
                  </div>
                  <h4 className="meal-block-name">{mealKey}</h4>
                  {mealData.adjustment !== 0 && (
                    <span className="meal-header-comp-tag">
                      Target adjusted: {mealData.adjustment > 0 ? `+${mealData.adjustment}` : mealData.adjustment} kcal
                    </span>
                  )}
                </div>

                <div className="meal-block-summary-stats">
                  <div>
                    <span className="meal-stat-cals">{mealData.calories}</span>
                    <span className="meal-stat-target"> / {mealData.target} kcal target</span>
                  </div>
                </div>
              </div>

              {/* Meal Calorie Warning Alert with Direct Smart Compensation Link */}
              {mealData.isOver && (
                <div className="meal-inline-alert" role="alert">
                  <AlertCircle size={16} style={{ flexShrink: 0 }} />
                  <span>
                    <strong>{mealKey.charAt(0).toUpperCase() + mealKey.slice(1)} calorie limit exceeded:</strong> You consumed <strong>{mealData.calories} kcal</strong> (+{mealData.overBy} kcal over target).
                    Remaining meals can be adjusted in the Calorie Tracker.
                  </span>
                </div>
              )}

              {/* Items List */}
              {mealData.items.length > 0 ? (
                <div className="logged-items-list">
                  {mealData.items.map((item) => {
                    const originalFood = indianFoods.find((f) => f.id === item.foodId);

                    return (
                      <div 
                        key={item.logId} 
                        className={`logged-food-row ${item.isCheatMeal ? 'cheat-meal-row' : ''}`}
                      >
                        <div className="logged-food-main">
                          <div className="logged-food-info">
                            <div className="logged-food-title-row">
                              <span className="logged-food-name">{item.name}</span>
                              {item.isCheatMeal && (
                                <span className="cheat-meal-tag-badge">
                                  🍔 Cheat Meal
                                </span>
                              )}
                            </div>
                            <span className="logged-food-sub">
                              {item.quantity} {item.unit || 'serving'} &bull; {item.category} &bull; Logged at {item.timestamp || 'Today'}
                            </span>
                          </div>
                        </div>

                        {/* Middle & Right: Nutrients + Stepper + Change Food + Remove */}
                        <div className="logged-food-nutrients">
                          <span className="logged-nutrient-pill cals">{item.calories} kcal</span>
                          <span className="logged-nutrient-pill">P: {item.protein}g</span>
                          <span className="logged-nutrient-pill">C: {item.carbs}g</span>
                          <span className="logged-nutrient-pill">F: {item.fats}g</span>

                          {/* Inline Serving Quantity Stepper */}
                          <div className="inline-qty-stepper" title="Adjust serving quantity">
                            <button
                              type="button"
                              className="inline-qty-btn"
                              onClick={() => {
                                const step = item.unit === 'gram' || item.unit === 'millilitre' ? 25 : 0.5;
                                const newQ = Math.max(step, Number((item.quantity - step).toFixed(1)));
                                updateFoodItem(item.logId, { quantity: newQ });
                              }}
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="inline-qty-val">{item.quantity}</span>
                            <button
                              type="button"
                              className="inline-qty-btn"
                              onClick={() => {
                                const step = item.unit === 'gram' || item.unit === 'millilitre' ? 25 : 0.5;
                                const newQ = Number((item.quantity + step).toFixed(1));
                                updateFoodItem(item.logId, { quantity: newQ });
                              }}
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          {/* Change Food Button */}
                          <button
                            type="button"
                            className="change-food-action-btn"
                            onClick={() => handleOpenChangeFood(item)}
                            title="Replace this food with another item"
                          >
                            <RefreshCw size={13} />
                            <span>Change Food</span>
                          </button>

                          {/* Remove Button */}
                          <button
                            type="button"
                            className="remove-food-btn"
                            onClick={() => removeFoodItem(item.logId)}
                            title={`Remove ${item.name}`}
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="empty-meal-box">
                  No food logged for {mealKey} yet. Select from the Indian food list above and click &quot;Add&quot;.
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* ==================================================== */}
      {/* 3. CHANGE FOOD MODAL (REPLACE FOOD IN-PLACE) */}
      {/* ==================================================== */}
      {changingItem && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Change Food Item">
          <div className="change-food-modal-card">
            <div className="modal-header">
              <div>
                <h3>Change Food</h3>
                <p>Replace &quot;{changingItem.name}&quot; without recreating the meal entry</p>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setChangingItem(null)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Replacement Search */}
            <div className="modal-search-wrap">
              <Search className="food-search-icon" size={16} />
              <input
                type="text"
                className="modal-search-input"
                placeholder="Search replacement food (e.g., Paneer, Dal, Chicken, Rice)..."
                value={replacementSearch}
                onChange={(e) => setReplacementSearch(e.target.value)}
                autoFocus
              />
            </div>

            {/* Category Pills inside Modal */}
            <div className="modal-category-pills">
              {indianFoodCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`category-pill ${replacementCategory === cat ? 'active' : ''}`}
                  onClick={() => setReplacementCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Modal Replacement Foods List */}
            <div className="modal-foods-list">
              {filteredReplacementFoods.map((food) => {
                const isSelected = selectedReplacementFood?.id === food.id;
                return (
                  <div
                    key={food.id}
                    className={`modal-food-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedReplacementFood(food);
                      const defU = food.defaultUnit || Object.keys(food.units || {})[0] || 'serving';
                      setReplacementUnit(defU);
                      if (defU === 'gram' || defU === 'millilitre') {
                        setReplacementQty(100);
                      } else {
                        setReplacementQty(1);
                      }
                    }}
                  >
                    <div className="modal-food-item-info">
                      <span className="modal-food-name">{food.name}</span>
                      <span className="modal-food-sub">{food.serving} &bull; {food.category}</span>
                    </div>
                    <span className="modal-food-cals">{food.calories} kcal</span>
                  </div>
                );
              })}
            </div>

            {/* Selected Replacement Confirmation Controls */}
            {selectedReplacementFood && replacementCalculatedNutrients && (
              <div className="modal-action-footer">
                <div className="modal-action-summary">
                  <span className="modal-summary-food-title">
                    Replace with: <strong>{selectedReplacementFood.name}</strong>
                  </span>
                  <div className="modal-summary-nutrients">
                    <strong style={{ color: 'var(--accent-primary)' }}>
                      {replacementCalculatedNutrients.calories} kcal
                    </strong>
                    <span>| P: {replacementCalculatedNutrients.protein}g</span>
                    <span>| C: {replacementCalculatedNutrients.carbs}g</span>
                    <span>| F: {replacementCalculatedNutrients.fats}g</span>
                  </div>
                </div>

                <div className="modal-controls-row">
                  {/* Stepper */}
                  <div className="quantity-stepper">
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => {
                        const step = replacementUnit === 'gram' || replacementUnit === 'millilitre' ? 25 : 0.5;
                        setReplacementQty((q) => Math.max(step, Number((q - step).toFixed(1))));
                      }}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="0.1"
                      className="qty-input"
                      value={replacementQty}
                      onChange={(e) => setReplacementQty(Math.max(0.1, parseFloat(e.target.value) || 1))}
                    />
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => {
                        const step = replacementUnit === 'gram' || replacementUnit === 'millilitre' ? 25 : 0.5;
                        setReplacementQty((q) => Number((q + step).toFixed(1)));
                      }}
                    >
                      +
                    </button>
                  </div>

                  {/* Unit Selector */}
                  <div className="unit-select-wrap">
                    <select
                      className="unit-dropdown-select"
                      value={replacementUnit}
                      onChange={(e) => setReplacementUnit(e.target.value)}
                    >
                      {selectedReplacementFood.units &&
                        Object.keys(selectedReplacementFood.units).map((uKey) => {
                          const uConfig = selectedReplacementFood.units[uKey];
                          return (
                            <option key={uKey} value={uKey}>
                              {uConfig.label || uKey}
                            </option>
                          );
                        })}
                    </select>
                    <ChevronDown size={14} className="unit-select-arrow" />
                  </div>

                  {/* Confirm Replace Button */}
                  <button
                    type="button"
                    className="modal-confirm-replace-btn"
                    onClick={handleConfirmChangeFood}
                  >
                    Confirm Replacement
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
