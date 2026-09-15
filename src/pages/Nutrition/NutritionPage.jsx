import React from 'react';
import { Utensils } from 'lucide-react';
import { PageHeader } from '../../components/Common/PageHeader';
import { CalorieTracker } from '../../components/CalorieTracker/CalorieTracker';
import { FoodLogger } from '../../components/FoodLogger/FoodLogger';
import { ProfileRequired } from '../../components/Common/ProfileRequired';
import { hasSavedProfile } from '../../utils/profileUtils';

export const NutritionPage = () => {
  if (!hasSavedProfile()) {
    return (
      <div className="nutrition-page-container">
        <PageHeader
          badge="NUTRITION & CALORIE TRACKER"
          badgeIcon={Utensils}
          title="Fuel Your"
          titleAccent="Performance"
          subtitle="Set up your profile first so nutrition targets are calculated from your own details."
          currentPage="Nutrition"
        />
        <ProfileRequired feature="Nutrition" />
      </div>
    );
  }

  return (
    <div className="nutrition-page-container">
      <PageHeader
        badge="NUTRITION & CALORIE TRACKER"
        badgeIcon={Utensils}
        title="Fuel Your"
        titleAccent="Performance"
        subtitle="Log Indian foods, monitor meal-by-meal targets, and optimize your daily macronutrients with precision."
        currentPage="Nutrition"
        statsPill="Experimental Live Tracker"
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        <CalorieTracker />
        <FoodLogger />
      </div>
    </div>
  );
};

export default NutritionPage;
