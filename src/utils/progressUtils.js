/**
 * Progress calculation, statistics, daily score and XP gamification utilities
 * RepFuelAI Experimental Progress Module
 */

export const XP_RULES = {
  FOOD_LOGGED: 10,
  CALORIE_TARGET_MET: 30,
  PROTEIN_GOAL_MET: 20,
  STEP_GOAL_MET: 20,
  DAILY_PROGRESS_GOAL_MET: 30,
  WORKOUT_COMPLETE: 20,
};

export const XP_PER_LEVEL = 500;

/**
 * Calculates current level and progress percentage from total XP
 * @param {number} totalXp 
 * @returns {{level: number, currentLevelXp: number, nextLevelXp: number, progressPercent: number, totalXp: number}}
 */
export const calculateLevelInfo = (totalXp = 0) => {
  const xp = Math.max(0, Number(totalXp) || 0);
  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  const currentLevelXp = xp % XP_PER_LEVEL;
  const nextLevelXp = XP_PER_LEVEL - currentLevelXp;
  const progressPercent = Math.min(100, Math.round((currentLevelXp / XP_PER_LEVEL) * 100));

  return {
    level,
    currentLevelXp,
    nextLevelXp,
    progressPercent,
    totalXp: xp,
  };
};

/**
 * Calculates a deterministic daily progress score (0 - 100%)
 * derived from calories, protein, steps, food logging, and workout status.
 * @param {Object} params
 * @returns {number} 0 to 100
 */
export const calculateDailyScore = ({
  calories = 0,
  calorieTarget = 2400,
  protein = 0,
  proteinGoal = 140,
  steps = 0,
  stepGoal = 10000,
  hasLoggedFoods = false,
  workoutDone = false,
}) => {
  let score = 0;

  // 1. Calorie Goal Adherence (up to 30 pts)
  if (calorieTarget > 0 && calories > 0) {
    const calRatio = calories / calorieTarget;
    if (calRatio >= 0.85 && calRatio <= 1.05) {
      score += 30; // Within target window
    } else if (calRatio >= 0.70 && calRatio <= 1.15) {
      score += 22;
    } else if (calRatio >= 0.50 && calRatio <= 1.30) {
      score += 14;
    } else {
      score += 6;
    }
  }

  // 2. Step Goal (up to 25 pts)
  if (stepGoal > 0) {
    const stepRatio = Math.min(1.0, (Number(steps) || 0) / stepGoal);
    score += Math.round(stepRatio * 25);
  }

  // 3. Protein Goal (up to 25 pts)
  if (proteinGoal > 0) {
    const proteinRatio = Math.min(1.0, (Number(protein) || 0) / proteinGoal);
    score += Math.round(proteinRatio * 25);
  }

  // 4. Food Logging Discipline (up to 10 pts)
  if (hasLoggedFoods) {
    score += 10;
  }

  // 5. Workout/Progress Completion (up to 10 pts)
  if (workoutDone) {
    score += 10;
  }

  return Math.min(100, Math.max(0, score));
};

/**
 * Calculates weekly performance stats from day records
 * @param {Array<{day: string, value: number}>} records 
 * @returns {{average: number, bestDay: {day: string, value: number}|null, lowestDay: {day: string, value: number}|null, improvement: number, recentChange: number}}
 */
export const calculateProgressStats = (records = []) => {
  if (!records || records.length === 0) {
    return {
      average: 0,
      bestDay: null,
      lowestDay: null,
      improvement: 0,
      recentChange: 0,
    };
  }

  const values = records.map((r) => Number(r.value) || 0);
  const total = values.reduce((sum, v) => sum + v, 0);
  const average = Math.round(total / values.length);

  let bestIndex = 0;
  let lowestIndex = 0;
  for (let i = 1; i < records.length; i++) {
    if (records[i].value > records[bestIndex].value) bestIndex = i;
    if (records[i].value < records[lowestIndex].value) lowestIndex = i;
  }

  const firstValue = values[0] || 0;
  const lastValue = values[values.length - 1] || 0;
  const improvement = firstValue > 0 ? Math.round(((lastValue - firstValue) / firstValue) * 100) : 0;

  const prevValue = values.length > 1 ? values[values.length - 2] : lastValue;
  const recentChange = lastValue - prevValue;

  return {
    average,
    bestDay: records[bestIndex],
    lowestDay: records[lowestIndex],
    improvement,
    recentChange,
  };
};
