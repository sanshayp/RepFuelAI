/**
 * Nutrition calculation, meal target & smart compensation utilities
 * RepFuelAI Experimental Nutrition Module
 */

export const DEFAULT_DAILY_CALORIE_TARGET = 2400;

export const MEAL_RATIOS = {
  breakfast: 0.25,
  lunch: 0.35,
  dinner: 0.30,
  snacks: 0.10,
};

export const MEAL_ORDER = ['breakfast', 'lunch', 'dinner', 'snacks'];

/**
 * Calculates baseline meal-level calorie targets based on the total daily target
 * @param {number} dailyCalories 
 * @returns {Record<string, number>}
 */
export const calculateMealTargets = (dailyCalories = DEFAULT_DAILY_CALORIE_TARGET) => {
  const target = Number(dailyCalories) || DEFAULT_DAILY_CALORIE_TARGET;
  return {
    breakfast: Math.round(target * MEAL_RATIOS.breakfast),
    lunch: Math.round(target * MEAL_RATIOS.lunch),
    dinner: Math.round(target * MEAL_RATIOS.dinner),
    snacks: Math.round(target * MEAL_RATIOS.snacks),
  };
};

/**
 * Generates smart compensation options when a meal exceeds its target
 * @param {string} overMeal - the meal that went over (e.g. 'breakfast')
 * @param {number} overAmount - calories over target (e.g. 200)
 * @param {Record<string, number>} baseTargets - base targets before compensation
 * @returns {Array<{id: string, label: string, description: string, adjustments: Record<string, number>, preview: Record<string, {prev: number, next: number}>}>}
 */
export const getCompensationOptions = (overMeal, overAmount, baseTargets) => {
  if (!overMeal || overAmount <= 0) return [];

  const mealIndex = MEAL_ORDER.indexOf(overMeal.toLowerCase());
  // Later meals in the day
  const remainingMeals = MEAL_ORDER.slice(mealIndex + 1);

  if (remainingMeals.length === 0) {
    // If snacks or last meal exceeded, option to balance tomorrow or keep current
    return [
      {
        id: 'keep_current',
        label: 'Keep current plan',
        description: 'Log excess without altering earlier meal goals.',
        adjustments: {},
      }
    ];
  }

  const options = [];

  // 1. Single-meal reductions for each remaining meal
  remainingMeals.forEach((mealKey) => {
    const capitalized = mealKey.charAt(0).toUpperCase() + mealKey.slice(1);
    const prev = baseTargets[mealKey] || 0;
    const next = Math.max(100, prev - overAmount);
    options.push({
      id: `reduce_${mealKey}`,
      label: `Reduce ${capitalized}`,
      description: `${capitalized} target: Previously ${prev} kcal → Now ${next} kcal`,
      adjustments: { [mealKey]: -(prev - next) },
      targetMeal: mealKey,
      prevTarget: prev,
      newTarget: next,
    });
  });

  // 2. Split between Lunch and Dinner (if Breakfast is over)
  if (overMeal === 'breakfast' && remainingMeals.includes('lunch') && remainingMeals.includes('dinner')) {
    const half = Math.round(overAmount / 2);
    const lunchPrev = baseTargets.lunch || 0;
    const dinnerPrev = baseTargets.dinner || 0;
    const lunchNext = Math.max(150, lunchPrev - half);
    const dinnerNext = Math.max(150, dinnerPrev - (overAmount - half));

    options.push({
      id: 'split_lunch_dinner',
      label: 'Split reduction between Lunch + Dinner',
      description: `Lunch: -${lunchPrev - lunchNext} kcal, Dinner: -${dinnerPrev - dinnerNext} kcal`,
      adjustments: {
        lunch: -(lunchPrev - lunchNext),
        dinner: -(dinnerPrev - dinnerNext),
      },
    });
  }

  // 3. Split between Dinner and Snacks (if Lunch is over)
  if (overMeal === 'lunch' && remainingMeals.includes('dinner') && remainingMeals.includes('snacks')) {
    const dinnerReduction = Math.round(overAmount * 0.7);
    const snacksReduction = overAmount - dinnerReduction;
    const dinnerPrev = baseTargets.dinner || 0;
    const snacksPrev = baseTargets.snacks || 0;
    const dinnerNext = Math.max(150, dinnerPrev - dinnerReduction);
    const snacksNext = Math.max(50, snacksPrev - snacksReduction);

    options.push({
      id: 'split_dinner_snacks',
      label: 'Split reduction between Dinner + Snacks',
      description: `Dinner: -${dinnerPrev - dinnerNext} kcal, Snacks: -${snacksPrev - snacksNext} kcal`,
      adjustments: {
        dinner: -(dinnerPrev - dinnerNext),
        snacks: -(snacksPrev - snacksNext),
      },
    });
  }

  // 4. Always provide the non-punitive "Keep current plan"
  options.push({
    id: 'keep_current',
    label: 'Keep current plan',
    description: 'Acknowledge overage without cutting your upcoming meals.',
    adjustments: {},
  });

  return options;
};

/**
 * Calculates nutrition totals for a list of logged food items
 * @param {Array<{calories: number, protein: number, carbs: number, fats: number, quantity: number}>} items 
 * @returns {{calories: number, protein: number, carbs: number, fats: number}}
 */
export const calculateNutritionTotals = (items = []) => {
  return items.reduce(
    (acc, item) => {
      const qty = Number(item.quantity) || 1;
      acc.calories += Math.round(Number(item.calories) || 0);
      acc.protein += Number(item.protein) || 0;
      acc.carbs += Number(item.carbs) || 0;
      acc.fats += Number(item.fats) || 0;
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );
};
