import { safeGetStorage } from './storageUtils';

export const PROFILE_STORAGE_KEY = 'repfuel_user_profile_v1';

export const emptyProfile = {
  name: '',
  age: '',
  height: '',
  weight: '',
  gender: 'female',
  goal: 'lose',
  bmr: null,
  calorieTarget: null
};

export const getSavedProfile = () => safeGetStorage(PROFILE_STORAGE_KEY, emptyProfile);

export const hasSavedProfile = () => Boolean(getSavedProfile().bmr);

export const calculateBmr = ({ age, height, weight, gender }) => {
  const base = (10 * Number(weight)) + (6.25 * Number(height)) - (5 * Number(age));
  return Math.round(gender === 'male' ? base + 5 : base - 161);
};

export const calculateGoalCalories = (bmr, goal) => {
  const maintenanceCalories = Math.round(Number(bmr) * 1.2);
  const adjustment = goal === 'gain' ? 300 : goal === 'maintain' ? 0 : -300;
  return Math.max(800, maintenanceCalories + adjustment);
};
