import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { safeGetStorage, safeSetStorage } from '../utils/storageUtils';
import { calculateMealTargets, getCompensationOptions } from '../utils/nutritionUtils';
import { calculateLevelInfo, calculateDailyScore, XP_RULES } from '../utils/progressUtils';
import { defaultWeeklyHistory, defaultCalendarDays, initialAchievements } from '../data/progressSampleData';
import { getNutritionForServing, indianFoods } from '../data/indianFoodsData';
import { calculateGoalCalories, getSavedProfile } from '../utils/profileUtils';

const NutritionProgressContext = createContext(null);

const STORAGE_KEYS = {
  LOGGED_FOODS: 'repfuel_logged_foods_v2',
  CALORIE_TARGET: 'repfuel_daily_calorie_target_v2',
  MEAL_COMPENSATIONS: 'repfuel_meal_compensations_v2',
  STEP_COUNT: 'repfuel_step_count_v2',
  STEP_GOAL: 'repfuel_step_goal_v2',
  WEEKLY_HISTORY: 'repfuel_weekly_history_v2',
  CALENDAR_DAYS: 'repfuel_calendar_days_v2',
  WORKOUT_DONE: 'repfuel_today_workout_done_v2',
  TOTAL_XP: 'repfuel_total_xp_v2',
  STREAK: 'repfuel_streak_v2',
  ACHIEVEMENTS: 'repfuel_achievements_v2',
};

export const NutritionProgressProvider = ({ children }) => {
  const savedProfile = getSavedProfile();
  const hasProfile = Boolean(savedProfile.bmr);

  // 1. Daily Calorie Target
  const [dailyCalorieTarget, setDailyCalorieTargetState] = useState(() => {
    if (!hasProfile) return 2400;
    return safeGetStorage(
      STORAGE_KEYS.CALORIE_TARGET,
      savedProfile.bmr ? calculateGoalCalories(savedProfile.bmr, savedProfile.goal) : 2400
    );
  });

  // 2. Step Count Tracking
  const [stepCount, setStepCountState] = useState(() => {
    return hasProfile ? safeGetStorage(STORAGE_KEYS.STEP_COUNT, 0) : 0;
  });

  const [stepGoal, setStepGoalState] = useState(() => {
    return hasProfile ? safeGetStorage(STORAGE_KEYS.STEP_GOAL, 10000) : 10000;
  });

  // 3. Logged Foods list
  const [loggedFoods, setLoggedFoods] = useState(() => {
    if (!hasProfile) return [];
    const savedFoods = safeGetStorage(STORAGE_KEYS.LOGGED_FOODS, []);
    const seededLogIds = new Set([101, 102, 103, 104, 105]);
    return savedFoods.filter((item) => !seededLogIds.has(item.logId));
  });

  // 4. Meal Compensation Adjustments (Redistributions when a meal is over target)
  // Format: { lunch: -100, dinner: -100 }
  const [mealCompensations, setMealCompensations] = useState(() => {
    return hasProfile ? safeGetStorage(STORAGE_KEYS.MEAL_COMPENSATIONS, {}) : {};
  });

  // 5. Today's Workout Completion status
  const [todayWorkoutDone, setTodayWorkoutDoneState] = useState(() => {
    return hasProfile ? safeGetStorage(STORAGE_KEYS.WORKOUT_DONE, false) : false;
  });

  // 6. Calendar Days (30 Days of September 2026)
  const [calendarDays, setCalendarDays] = useState(() => {
    return hasProfile ? safeGetStorage(STORAGE_KEYS.CALENDAR_DAYS, []) : [];
  });

  // 7. Weekly History data
  const [weeklyHistory, setWeeklyHistory] = useState(() => {
    return hasProfile ? safeGetStorage(STORAGE_KEYS.WEEKLY_HISTORY, []) : [];
  });

  // 8. Gamification (XP, Streak, Achievements)
  const [totalXp, setTotalXp] = useState(() => {
    return hasProfile ? safeGetStorage(STORAGE_KEYS.TOTAL_XP, 0) : 0;
  });

  const [streak, setStreak] = useState(() => {
    return hasProfile ? safeGetStorage(STORAGE_KEYS.STREAK, 0) : 0;
  });

  const [achievements, setAchievements] = useState(() => {
    return hasProfile ? safeGetStorage(STORAGE_KEYS.ACHIEVEMENTS, []) : [];
  });

  // Persist State to LocalStorage
  useEffect(() => {
    safeSetStorage(STORAGE_KEYS.CALORIE_TARGET, dailyCalorieTarget);
  }, [dailyCalorieTarget]);

  useEffect(() => {
    safeSetStorage(STORAGE_KEYS.STEP_COUNT, stepCount);
  }, [stepCount]);

  useEffect(() => {
    safeSetStorage(STORAGE_KEYS.STEP_GOAL, stepGoal);
  }, [stepGoal]);

  useEffect(() => {
    safeSetStorage(STORAGE_KEYS.LOGGED_FOODS, loggedFoods);
  }, [loggedFoods]);

  useEffect(() => {
    safeSetStorage(STORAGE_KEYS.MEAL_COMPENSATIONS, mealCompensations);
  }, [mealCompensations]);

  useEffect(() => {
    safeSetStorage(STORAGE_KEYS.WORKOUT_DONE, todayWorkoutDone);
  }, [todayWorkoutDone]);

  useEffect(() => {
    safeSetStorage(STORAGE_KEYS.CALENDAR_DAYS, calendarDays);
  }, [calendarDays]);

  useEffect(() => {
    safeSetStorage(STORAGE_KEYS.WEEKLY_HISTORY, weeklyHistory);
  }, [weeklyHistory]);

  useEffect(() => {
    safeSetStorage(STORAGE_KEYS.TOTAL_XP, totalXp);
  }, [totalXp]);

  useEffect(() => {
    safeSetStorage(STORAGE_KEYS.STREAK, streak);
  }, [streak]);

  useEffect(() => {
    safeSetStorage(STORAGE_KEYS.ACHIEVEMENTS, achievements);
  }, [achievements]);

  // Base Meal Targets derived from Daily Target
  const baseMealTargets = useMemo(() => {
    return calculateMealTargets(dailyCalorieTarget);
  }, [dailyCalorieTarget]);

  // Effective Meal Targets (Base + Smart Compensations)
  const effectiveMealTargets = useMemo(() => {
    const effective = { ...baseMealTargets };
    Object.keys(mealCompensations).forEach((m) => {
      const adjustment = mealCompensations[m] || 0;
      effective[m] = Math.max(50, (effective[m] || 0) + adjustment);
    });
    return effective;
  }, [baseMealTargets, mealCompensations]);

  // Derived Calculations: Consumed Totals by Meal & Overall
  const { mealBreakdown, dailyTotals, hasCheatMealToday } = useMemo(() => {
    const meals = {
      breakfast: { items: [], calories: 0, protein: 0, carbs: 0, fats: 0 },
      lunch: { items: [], calories: 0, protein: 0, carbs: 0, fats: 0 },
      dinner: { items: [], calories: 0, protein: 0, carbs: 0, fats: 0 },
      snacks: { items: [], calories: 0, protein: 0, carbs: 0, fats: 0 },
    };

    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFats = 0;
    let anyCheat = false;

    loggedFoods.forEach((item) => {
      const mealKey = item.meal?.toLowerCase() || 'snacks';
      if (meals[mealKey]) {
        meals[mealKey].items.push(item);
        meals[mealKey].calories += Math.round(Number(item.calories) || 0);
        meals[mealKey].protein += Math.round(Number(item.protein) || 0);
        meals[mealKey].carbs += Math.round(Number(item.carbs) || 0);
        meals[mealKey].fats += Math.round(Number(item.fats) || 0);
      }

      totalCalories += Math.round(Number(item.calories) || 0);
      totalProtein += Math.round(Number(item.protein) || 0);
      totalCarbs += Math.round(Number(item.carbs) || 0);
      totalFats += Math.round(Number(item.fats) || 0);

      if (item.isCheatMeal) {
        anyCheat = true;
      }
    });

    // Attach target, adjustments and overBy info to each meal
    Object.keys(meals).forEach((m) => {
      const baseTarget = baseMealTargets[m] || 0;
      const effectiveTarget = effectiveMealTargets[m] || baseTarget;
      const consumed = meals[m].calories;
      const adjustment = mealCompensations[m] || 0;

      meals[m].baseTarget = baseTarget;
      meals[m].target = effectiveTarget;
      meals[m].adjustment = adjustment;
      meals[m].isOver = consumed > effectiveTarget;
      meals[m].overBy = consumed > effectiveTarget ? consumed - effectiveTarget : 0;
      meals[m].percent = effectiveTarget > 0 ? Math.min(100, Math.round((consumed / effectiveTarget) * 100)) : 0;
    });

    return {
      mealBreakdown: meals,
      dailyTotals: {
        calories: totalCalories,
        protein: totalProtein,
        carbs: totalCarbs,
        fats: totalFats,
      },
      hasCheatMealToday: anyCheat,
    };
  }, [loggedFoods, baseMealTargets, effectiveMealTargets, mealCompensations]);

  // Remaining Calories & Alert status
  const dailyRemaining = Math.max(0, dailyCalorieTarget - dailyTotals.calories);
  const isOverDaily = dailyTotals.calories > dailyCalorieTarget;
  const overDailyBy = isOverDaily ? dailyTotals.calories - dailyCalorieTarget : 0;

  // Macro Target Guidelines (standard athletic ratio: 25% protein, 50% carbs, 25% fats)
  const macroGoals = useMemo(() => {
    return {
      protein: Math.round((dailyCalorieTarget * 0.25) / 4), // e.g. 150g for 2400 kcal
      carbs: Math.round((dailyCalorieTarget * 0.50) / 4),   // e.g. 300g
      fats: Math.round((dailyCalorieTarget * 0.25) / 9),    // e.g. 67g
    };
  }, [dailyCalorieTarget]);

  // Deterministic Daily Score (0 - 100)
  const dailyScore = useMemo(() => {
    return calculateDailyScore({
      calories: dailyTotals.calories,
      calorieTarget: dailyCalorieTarget,
      protein: dailyTotals.protein,
      proteinGoal: macroGoals.protein,
      steps: stepCount,
      stepGoal: stepGoal,
      hasLoggedFoods: loggedFoods.length > 0,
      workoutDone: todayWorkoutDone,
    });
  }, [
    dailyTotals.calories,
    dailyCalorieTarget,
    dailyTotals.protein,
    macroGoals.protein,
    stepCount,
    stepGoal,
    loggedFoods.length,
    todayWorkoutDone,
  ]);

  // Level Info
  const levelInfo = useMemo(() => {
    return calculateLevelInfo(totalXp);
  }, [totalXp]);

  // Sync today's live state into Calendar Days (Day 14) and Weekly History (Today)
  useEffect(() => {
    // 1. Sync Calendar Days
    setCalendarDays((prev) => {
      return prev.map((day) => {
        if (day.dayNumber === 14 || day.isToday) {
          return {
            ...day,
            calories: dailyTotals.calories,
            calorieTarget: dailyCalorieTarget,
            protein: dailyTotals.protein,
            proteinGoal: macroGoals.protein,
            steps: stepCount,
            stepGoal: stepGoal,
            workoutDone: todayWorkoutDone,
            hasCheatMeal: hasCheatMealToday,
            score: dailyScore,
            xpEarned: Math.round((dailyScore / 100) * 100) || 85,
          };
        }
        return day;
      });
    });

    // 2. Sync Weekly History (Latest / Today index)
    setWeeklyHistory((prev) => {
      const updated = [...prev];
      const todayIndex = updated.length - 1;
      if (todayIndex >= 0) {
        const prevScore = todayIndex > 0 ? updated[todayIndex - 1].score : updated[todayIndex].score;
        updated[todayIndex] = {
          ...updated[todayIndex],
          calories: dailyTotals.calories,
          protein: dailyTotals.protein,
          steps: stepCount,
          workoutDone: todayWorkoutDone,
          hasCheatMeal: hasCheatMealToday,
          score: dailyScore,
          status: dailyScore >= prevScore ? 'increased' : 'decreased',
        };
      }
      return updated;
    });
  }, [
    dailyTotals.calories,
    dailyTotals.protein,
    dailyCalorieTarget,
    macroGoals.protein,
    stepCount,
    stepGoal,
    todayWorkoutDone,
    hasCheatMealToday,
    dailyScore,
  ]);

  // Automatic Achievements Check
  useEffect(() => {
    setAchievements((prev) => {
      return prev.map((ach) => {
        let shouldUnlock = ach.unlocked;

        if (ach.id === 'first_log' && loggedFoods.length > 0) {
          shouldUnlock = true;
        }
        if (ach.id === 'calorie_goal' && dailyTotals.calories > 0 && dailyTotals.calories <= dailyCalorieTarget) {
          shouldUnlock = true;
        }
        if (ach.id === 'protein_powerhouse' && dailyTotals.protein >= 100) {
          shouldUnlock = true;
        }
        if (ach.id === 'step_champion' && stepCount >= stepGoal) {
          shouldUnlock = true;
        }
        if (ach.id === 'workout_complete' && todayWorkoutDone) {
          shouldUnlock = true;
        }
        if (ach.id === 'streak_3' && streak >= 3) {
          shouldUnlock = true;
        }
        if (ach.id === 'streak_7' && streak >= 7) {
          shouldUnlock = true;
        }
        if (ach.id === 'cheat_meal_balance' && hasCheatMealToday && dailyTotals.calories <= dailyCalorieTarget + 100) {
          shouldUnlock = true;
        }

        return { ...ach, unlocked: shouldUnlock };
      });
    });
  }, [
    loggedFoods.length,
    dailyTotals.calories,
    dailyTotals.protein,
    dailyCalorieTarget,
    stepCount,
    stepGoal,
    todayWorkoutDone,
    streak,
    hasCheatMealToday,
  ]);

  // ==========================================
  // ACTIONS
  // ==========================================

  // Action: Add Food Item
  const addFoodItem = (meal, food, quantity = 1, unit = null, isCheatMeal = false) => {
    const qty = Math.max(0.01, Number(quantity) || 1);
    const selectedUnit = unit || food.defaultUnit || 'serving';
    const nutrients = getNutritionForServing(food, qty, selectedUnit);

    const newLogItem = {
      logId: Date.now() + Math.random(),
      foodId: food.id,
      name: food.name,
      category: food.category,
      serving: food.serving,
      quantity: qty,
      unit: selectedUnit,
      calories: nutrients.calories,
      protein: nutrients.protein,
      carbs: nutrients.carbs,
      fats: nutrients.fats,
      meal: meal.toLowerCase(),
      isCheatMeal: Boolean(isCheatMeal),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setLoggedFoods((prev) => [newLogItem, ...prev]);

    // Award XP
    setTotalXp((prev) => prev + XP_RULES.FOOD_LOGGED);
  };

  // Action: Update Food Item (Change Food, Quantity, Unit, or Cheat Meal flag)
  const updateFoodItem = (logId, updates) => {
    setLoggedFoods((prev) => {
      return prev.map((item) => {
        if (item.logId !== logId) return item;

        // If replacement food is specified
        if (updates.newFood) {
          const food = updates.newFood;
          const qty = updates.quantity !== undefined ? updates.quantity : item.quantity;
          const unit = updates.unit || food.defaultUnit || 'serving';
          const nutrients = getNutritionForServing(food, qty, unit);

          return {
            ...item,
            foodId: food.id,
            name: food.name,
            category: food.category,
            serving: food.serving,
            quantity: qty,
            unit,
            calories: nutrients.calories,
            protein: nutrients.protein,
            carbs: nutrients.carbs,
            fats: nutrients.fats,
            isCheatMeal: updates.isCheatMeal !== undefined ? updates.isCheatMeal : item.isCheatMeal,
          };
        }

        // Otherwise modifying quantity / unit of existing food
        const targetFood = indianFoods.find((f) => f.id === item.foodId) || item;
        const newQty = updates.quantity !== undefined ? Math.max(0.01, Number(updates.quantity)) : item.quantity;
        const newUnit = updates.unit || item.unit || 'serving';
        const nutrients = getNutritionForServing(targetFood, newQty, newUnit);

        return {
          ...item,
          quantity: newQty,
          unit: newUnit,
          calories: nutrients.calories,
          protein: nutrients.protein,
          carbs: nutrients.carbs,
          fats: nutrients.fats,
          isCheatMeal: updates.isCheatMeal !== undefined ? updates.isCheatMeal : item.isCheatMeal,
        };
      });
    });
  };

  // Action: Remove Food Item
  const removeFoodItem = (logId) => {
    setLoggedFoods((prev) => prev.filter((item) => item.logId !== logId));
  };

  // Action: Clear all user-logged foods
  const clearLoggedFoods = () => {
    setLoggedFoods([]);
  };

  // Action: Clear entire meal
  const clearMealFoods = (meal) => {
    setLoggedFoods((prev) => prev.filter((item) => item.meal !== meal.toLowerCase()));
  };

  // Action: Apply Smart Calorie Compensation
  const applyMealCompensation = (adjustments = {}) => {
    setMealCompensations((prev) => {
      return {
        ...prev,
        ...adjustments,
      };
    });
  };

  // Action: Reset Meal Compensations to baseline
  const resetMealCompensation = () => {
    setMealCompensations({});
  };

  // Action: Update Calorie Target
  const setDailyCalorieTarget = (target) => {
    const num = Math.max(800, Math.min(6000, Number(target) || 2400));
    setDailyCalorieTargetState(num);
  };

  // Action: Update Step Count
  const setStepCount = (steps) => {
    const num = Math.max(0, Math.min(100000, Math.round(Number(steps) || 0)));
    setStepCountState(num);
    if (num >= stepGoal) {
      setTotalXp((xp) => xp + XP_RULES.STEP_GOAL_MET);
    }
  };

  // Action: Update Step Goal
  const setStepGoal = (goal) => {
    const num = Math.max(1000, Math.min(50000, Math.round(Number(goal) || 10000)));
    setStepGoalState(num);
  };

  // Action: Toggle today's workout
  const toggleTodayWorkout = () => {
    setTodayWorkoutDoneState((prev) => {
      const next = !prev;
      if (next) {
        setTotalXp((xp) => xp + XP_RULES.WORKOUT_COMPLETE);
      }
      return next;
    });
  };

  // Action: Reset to fresh sample state
  const resetToSampleData = () => {
    setDailyCalorieTargetState(2400);
    setStepCountState(8450);
    setStepGoalState(10000);
    setLoggedFoods([]);
    setMealCompensations({});
    setTodayWorkoutDoneState(false);
    setWeeklyHistory(defaultWeeklyHistory);
    setCalendarDays(defaultCalendarDays);
    setTotalXp(850);
    setStreak(6);
    setAchievements(initialAchievements);
  };

  const clearUserData = () => {
    setDailyCalorieTargetState(2400);
    setStepCountState(0);
    setStepGoalState(10000);
    setLoggedFoods([]);
    setMealCompensations({});
    setTodayWorkoutDoneState(false);
    setWeeklyHistory([]);
    setCalendarDays([]);
    setTotalXp(0);
    setStreak(0);
    setAchievements([]);
  };

  const contextValue = {
    dailyCalorieTarget,
    setDailyCalorieTarget,
    stepCount,
    setStepCount,
    stepGoal,
    setStepGoal,
    loggedFoods,
    addFoodItem,
    updateFoodItem,
    removeFoodItem,
    clearLoggedFoods,
    clearMealFoods,
    baseMealTargets,
    effectiveMealTargets,
    mealCompensations,
    applyMealCompensation,
    resetMealCompensation,
    mealBreakdown,
    dailyTotals,
    dailyRemaining,
    macroGoals,
    dailyScore,
    isOverDaily,
    overDailyBy,
    hasCheatMealToday,
    todayWorkoutDone,
    toggleTodayWorkout,
    calendarDays,
    weeklyHistory,
    totalXp,
    streak,
    achievements,
    levelInfo,
    resetToSampleData,
    clearUserData,
  };

  return (
    <NutritionProgressContext.Provider value={contextValue}>
      {children}
    </NutritionProgressContext.Provider>
  );
};

export const useNutritionProgress = () => {
  const context = useContext(NutritionProgressContext);
  if (!context) {
    throw new Error('useNutritionProgress must be used within a NutritionProgressProvider');
  }
  return context;
};
