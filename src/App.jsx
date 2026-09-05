import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { homePageContent } from './data/homePageContent';
import { SquatPreloader } from './components/Preloader/SquatPreloader';
import { ScrollToTop } from './components/Common/ScrollToTop';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { AboutIntro } from './components/AboutIntro/AboutIntro';
import { CategoryGrid } from './components/FitnessCategories/CategoryGrid';
import { FeaturedWorkouts } from './components/FeaturedWorkouts/FeaturedWorkouts';
import { BMICalculator } from './components/BMICalculator/BMICalculator';
import { WorkoutsPage } from './components/Workouts/WorkoutsPage';
import { TrainingStylesPage } from './components/TrainingStyles/TrainingStylesPage';
import { TipsSection } from './components/NutritionTips/TipsSection';
import { Footer } from './components/Footer/Footer';
import './App.css';

/**
 * HomeLandingPage
 * Composes the primary landing page featuring previews for Workouts and Training Styles.
 */
function HomeLandingPage() {
  return (
    <>
      <Hero 
        badge={homePageContent.hero.badge}
        headline={homePageContent.hero.headline}
        subheadline={homePageContent.hero.subheadline}
        primaryCta={homePageContent.hero.primaryCta}
        secondaryCta={homePageContent.hero.secondaryCta}
        stats={homePageContent.hero.stats}
        heroImage={homePageContent.hero.heroImage}
      />

      <AboutIntro 
        badge={homePageContent.aboutIntro.badge}
        title={homePageContent.aboutIntro.title}
        description={homePageContent.aboutIntro.description}
        pillars={homePageContent.aboutIntro.pillars}
        metricsPreview={homePageContent.aboutIntro.metricsPreview}
      />

      {/* Module 3: Training Styles Preview */}
      <CategoryGrid 
        badge={homePageContent.categories.badge}
        title={homePageContent.categories.title}
        subtitle={homePageContent.categories.subtitle}
        items={homePageContent.categories.items}
      />

      {/* Module 4: Featured Workouts Preview */}
      <FeaturedWorkouts 
        badge={homePageContent.featuredWorkouts.badge}
        title={homePageContent.featuredWorkouts.title}
        subtitle={homePageContent.featuredWorkouts.subtitle}
        items={homePageContent.featuredWorkouts.items}
      />

      {/* Module 5: Nutrition Tips */}
      <TipsSection 
        badge={homePageContent.nutritionTips.badge}
        title={homePageContent.nutritionTips.title}
        subtitle={homePageContent.nutritionTips.subtitle}
        items={homePageContent.nutritionTips.items}
      />
    </>
  );
}

export function App() {
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);

  return (
    <ThemeProvider>
      {/* Scroll restoration & smooth hash scrolling on route change */}
      <ScrollToTop />

      {/* Custom Squatting Man with Dumbbell Preloader */}
      <SquatPreloader 
        minDisplayTime={2000} 
        onComplete={() => setIsPreloaderDone(true)} 
      />

      <div className="app-wrapper">
        {/* Sticky Glass Navbar */}
        <Navbar 
          brandName={homePageContent.navbar.brandName}
          navLinks={homePageContent.navbar.navLinks}
          ctaText={homePageContent.navbar.ctaText}
          ctaLink={homePageContent.navbar.ctaLink}
        />

        <main className="main-content">
          <Routes>
            {/* Home Route */}
            <Route path="/" element={<HomeLandingPage />} />

            {/* Dedicated Workouts Route */}
            <Route path="/workouts" element={<WorkoutsPage />} />

            {/* Dedicated Training Styles Route */}
            <Route path="/training-styles" element={<TrainingStylesPage />} />

            {/* Dedicated BMI Check Route */}
            <Route 
              path="/bmi" 
              element={
                <BMICalculator
                  badge={homePageContent.bmi.badge}
                  title={homePageContent.bmi.title}
                  subtitle={homePageContent.bmi.subtitle}
                />
              } 
            />

            {/* Catch-all redirect to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer 
          brandName={homePageContent.footer.brandName}
          tagline={homePageContent.footer.tagline}
          columns={homePageContent.footer.columns}
          socialLinks={homePageContent.footer.socialLinks}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
