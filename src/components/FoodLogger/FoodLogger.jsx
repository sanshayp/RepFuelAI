import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  Trash2, 
  AlertCircle, 
  Utensils, 
  Check, 
  X, 
  ChevronDown,
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

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Pop-out Modal State for Selected Food
  const [activeFood, setActiveFood] = useState(null);
  const [servingQty, setServingQty] = useState(100);
  const [selectedUnit, setSelectedUnit] = useState('gram');
  const [selectedMealOption, setSelectedMealOption] = useState('breakfast');
  const [justAddedAlert, setJustAddedAlert] = useState(false);

  // Change Food Modal State
  const [changingItem, setChangingItem] = useState(null);
  const [replacementSearch, setReplacementSearch] = useState('');
  const [replacementCategory, setReplacementCategory] = useState('All');
  const [selectedReplacementFood, setSelectedReplacementFood] = useState(null);
  const [replacementQty, setReplacementQty] = useState(1);
  const [replacementUnit, setReplacementUnit] = useState('');

  // Filter foods for main selection list
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

  // Open Pop-out Modal when food is clicked/selected
  const handleOpenFoodModal = (food) => {
    setActiveFood(food);
    const defaultU = food.defaultUnit || Object.keys(food.units || {})[0] || 'serving';
    setSelectedUnit(defaultU);
    if (defaultU === 'gram' || defaultU === 'millilitre') {
      setServingQty(100);
    } else {
      setServingQty(1);
    }
    setJustAddedAlert(false);
  };

  const handleCloseFoodModal = () => {
    setActiveFood(null);
    setJustAddedAlert(false);
  };

  // Add food from the pop-out modal
  const handleAddFoodFromModal = () => {
    if (!activeFood) return;

    const isCheat = selectedMealOption === 'cheat';
    const targetMeal = isCheat ? 'snacks' : selectedMealOption;

    addFoodItem(targetMeal, activeFood, servingQty, selectedUnit, isCheat);
    setJustAddedAlert(true);

    setTimeout(() => {
      setJustAddedAlert(false);
      setActiveFood(null);
    }, 600);
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

  // Live calculation for currently selected food inside pop-out modal
  const activeCalculatedNutrients = useMemo(() => {
    if (!activeFood) return null;
    return getNutritionForServing(activeFood, servingQty, selectedUnit);
  }, [activeFood, servingQty, selectedUnit]);

  // Live calculation for replacement modal
  const replacementCalculatedNutrients = useMemo(() => {
    if (!selectedReplacementFood) return null;
    return getNutritionForServing(selectedReplacementFood, replacementQty, replacementUnit);
  }, [selectedReplacementFood, replacementQty, replacementUnit]);

  const mealOrder = ['breakfast', 'lunch', 'dinner', 'snacks'];
  const mealLabels = {
    breakfast: 'Breakfast',
    lunch: 'Lunch',
    dinner: 'Dinner',
    snacks: 'Snacks',
  };

  return (
    <div className="food-logger-container">
      {/* 1. Simplified Food Database / Selection Section */}
      <section className="food-logger-add-card" aria-label="Food Database">
        <div className="food-logger-header">
          <div className="food-logger-title-wrap">
            <div className="food-logger-icon" aria-hidden="true">
              <Utensils size={20} />
            </div>
            <div>
              <h3>Indian Food Database</h3>
              <p>Search dishes, click to view nutrition, and add to your meal</p>
            </div>
          </div>
        </div>

        {/* Search Bar & Categories */}
        <div className="food-search-controls">
          <div className="food-search-input-wrap">
            <Search className="food-search-icon" size={18} aria-hidden="true" />
            <input
              type="text"
              className="food-search-input"
              placeholder="Search foods (e.g. Paneer, Dal, Roti, Biryani, Dosa, Egg)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search Indian foods"
            />
          </div>

          {/* Clean Category Filters */}
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

        {/* Clean, Simple Food Selection Cards Grid */}
        <div className="simple-food-grid" role="listbox" aria-label="Select Food">
          {filteredFoods.map((food) => {
            return (
              <div
                key={food.id}
                role="button"
                tabIndex={0}
                className="simple-food-card"
                onClick={() => handleOpenFoodModal(food)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleOpenFoodModal(food)}
              >
                <div className="simple-food-card-info">
                  <span className="simple-food-name">{food.name}</span>
                  <span className="simple-food-serving">{food.serving}</span>
                </div>
                <button
                  type="button"
                  className="simple-food-select-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenFoodModal(food);
                  }}
                >
                  Select
                </button>
              </div>
            );
          })}
          {filteredFoods.length === 0 && (
            <div className="food-empty-state">
              No dishes found matching &quot;{searchQuery}&quot;. Try searching for Paneer, Dal, or Roti.
            </div>
          )}
        </div>
      </section>

      {/* 2. Compact Nutrition Pop-out / Floating Detail Panel */}
      {activeFood && activeCalculatedNutrients && (
        <div 
          className="food-modal-backdrop" 
          onClick={handleCloseFoodModal} 
          role="dialog" 
          aria-modal="true" 
          aria-label="Food Nutrition Details"
        >
          <div className="food-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="food-modal-header">
              <div>
                <h3 className="food-modal-title">{activeFood.name}</h3>
                <span className="food-modal-serving-subtitle">Serving: {servingQty} {selectedUnit}</span>
              </div>
              <button
                type="button"
                className="food-modal-close"
                onClick={handleCloseFoodModal}
                aria-label="Close detail panel"
              >
                <X size={18} />
              </button>
            </div>

            {/* Simplified Nutrition Information (Clean, Non-competing colors) */}
            <div className="food-modal-nutrition-panel">
              <div className="food-nutrition-row">
                <span className="food-nutrition-label">Calories</span>
                <strong className="food-nutrition-val calories">{activeCalculatedNutrients.calories} kcal</strong>
              </div>
              <div className="food-nutrition-row">
                <span className="food-nutrition-label">Protein</span>
                <strong className="food-nutrition-val">{activeCalculatedNutrients.protein} g</strong>
              </div>
              <div className="food-nutrition-row">
                <span className="food-nutrition-label">Carbs</span>
                <strong className="food-nutrition-val">{activeCalculatedNutrients.carbs} g</strong>
              </div>
              <div className="food-nutrition-row">
                <span className="food-nutrition-label">Fats</span>
                <strong className="food-nutrition-val">{activeCalculatedNutrients.fats} g</strong>
              </div>
            </div>

            {/* Quantity and Unit Selectors */}
            <div className="food-modal-inputs-row">
              <div className="food-modal-field">
                <label className="food-modal-label">Quantity</label>
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
              </div>

              <div className="food-modal-field">
                <label className="food-modal-label">Unit</label>
                <div className="unit-select-wrap">
                  <select
                    className="unit-dropdown-select"
                    value={selectedUnit}
                    onChange={(e) => {
                      const newU = e.target.value;
                      setSelectedUnit(newU);
                      if ((newU === 'gram' || newU === 'millilitre') && servingQty <= 5) {
                        setServingQty(100);
                      } else if (newU !== 'gram' && newU !== 'millilitre' && servingQty > 20) {
                        setServingQty(1);
                      }
                    }}
                    aria-label="Measurement unit"
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
            </div>

            {/* Simple Meal Dropdown */}
            <div className="food-modal-meal-dropdown-row">
              <label className="food-modal-label">Add to meal</label>
              <div className="meal-select-wrap">
                <select
                  className="meal-dropdown-select"
                  value={selectedMealOption}
                  onChange={(e) => setSelectedMealOption(e.target.value)}
                  aria-label="Select meal"
                >
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snacks">Snacks</option>
                  <option value="cheat">Cheat Meal</option>
                </select>
                <ChevronDown size={14} className="unit-select-arrow" />
              </div>
            </div>

            {/* Add Food Button */}
            <button
              type="button"
              className="food-modal-add-btn"
              onClick={handleAddFoodFromModal}
            >
              {justAddedAlert ? (
                <>
                  <Check size={16} /> Added to {selectedMealOption === 'cheat' ? 'Cheat Meal' : mealLabels[selectedMealOption]}!
                </>
              ) : (
                <>
                  <Plus size={16} /> Add Food
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* 3. Simple Logged Meals Section */}
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
              {/* Meal Header: Name and 420 / 548 kcal */}
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

              {/* Warning alert if meal exceeded allocation */}
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
                          {item.quantity} {item.unit || 'serving'} &bull; {item.calories} kcal
                        </span>
                      </div>

                      {/* Clean Actions: Change and Remove */}
                      <div className="simple-logged-actions">
                        <button
                          type="button"
                          className="simple-action-link"
                          onClick={() => handleOpenChangeFood(item)}
                          title="Replace with another food"
                        >
                          Change
                        </button>
                        <button
                          type="button"
                          className="simple-action-link remove"
                          onClick={() => removeFoodItem(item.logId)}
                          title="Remove food"
                        >
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

      {/* 4. CHANGE FOOD MODAL (Preserved for in-place food replacements) */}
      {changingItem && (
        <div className="food-modal-backdrop" role="dialog" aria-modal="true" aria-label="Change Food Item">
          <div className="food-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="food-modal-header">
              <div>
                <h3 className="food-modal-title">Change Food</h3>
                <span className="food-modal-serving-subtitle">Replace &quot;{changingItem.name}&quot;</span>
              </div>
              <button
                type="button"
                className="food-modal-close"
                onClick={() => setChangingItem(null)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-search-wrap">
              <Search className="food-search-icon" size={16} />
              <input
                type="text"
                className="food-search-input"
                placeholder="Search replacement dish..."
                value={replacementSearch}
                onChange={(e) => setReplacementSearch(e.target.value)}
                autoFocus
              />
            </div>

            <div className="modal-foods-list">
              {filteredReplacementFoods.slice(0, 15).map((food) => {
                const isSelected = selectedReplacementFood?.id === food.id;
                return (
                  <div
                    key={food.id}
                    className={`simple-replacement-item ${isSelected ? 'selected' : ''}`}
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
                    <div>
                      <strong style={{ display: 'block', color: 'var(--text-primary)', fontSize: '0.9rem' }}>{food.name}</strong>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{food.serving}</span>
                    </div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-primary)' }}>{food.calories} kcal</span>
                  </div>
                );
              })}
            </div>

            {selectedReplacementFood && replacementCalculatedNutrients && (
              <div className="modal-action-footer">
                <div className="food-modal-nutrition-panel">
                  <div className="food-nutrition-row">
                    <span className="food-nutrition-label">Calories</span>
                    <strong className="food-nutrition-val calories">{replacementCalculatedNutrients.calories} kcal</strong>
                  </div>
                  <div className="food-nutrition-row">
                    <span className="food-nutrition-label">Protein</span>
                    <strong className="food-nutrition-val">{replacementCalculatedNutrients.protein} g</strong>
                  </div>
                  <div className="food-nutrition-row">
                    <span className="food-nutrition-label">Carbs</span>
                    <strong className="food-nutrition-val">{replacementCalculatedNutrients.carbs} g</strong>
                  </div>
                  <div className="food-nutrition-row">
                    <span className="food-nutrition-label">Fats</span>
                    <strong className="food-nutrition-val">{replacementCalculatedNutrients.fats} g</strong>
                  </div>
                </div>

                <div className="food-modal-inputs-row" style={{ marginTop: '0.75rem' }}>
                  <div className="food-modal-field">
                    <label className="food-modal-label">Quantity</label>
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
                  </div>

                  <div className="food-modal-field">
                    <label className="food-modal-label">Unit</label>
                    <div className="unit-select-wrap">
                      <select
                        className="unit-dropdown-select"
                        value={replacementUnit}
                        onChange={(e) => setReplacementUnit(e.target.value)}
                      >
                        {selectedReplacementFood.units &&
                          Object.keys(selectedReplacementFood.units).map((uKey) => (
                            <option key={uKey} value={uKey}>
                              {selectedReplacementFood.units[uKey].label || uKey}
                            </option>
                          ))}
                      </select>
                      <ChevronDown size={14} className="unit-select-arrow" />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="food-modal-add-btn"
                  style={{ marginTop: '1rem' }}
                  onClick={handleConfirmChangeFood}
                >
                  Confirm Replacement
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
