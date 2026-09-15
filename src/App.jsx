import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { NutritionProgressProvider } from './context/NutritionProgressContext';
import { homePageContent } from './data/homePageContent';
import { ScrollToTop } from './components/Common/ScrollToTop';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { AboutIntro } from './components/AboutIntro/AboutIntro';
import { CategoryGrid } from './components/FitnessCategories/CategoryGrid';
import { BMICalculator } from './components/BMICalculator/BMICalculator';
import { TrainingStylesPage } from './components/TrainingStyles/TrainingStylesPage';
import { TipsSection } from './components/NutritionTips/TipsSection';
import { HomeNutritionSnapshot } from './components/HomeDashboard/HomeNutritionSnapshot';
import { Footer } from './components/Footer/Footer';
import { InfoPage } from './components/Common/InfoPage';
import { NutritionPage } from './pages/Nutrition/NutritionPage';
import { ProgressPage } from './pages/Progress/ProgressPage';
import { ProfilePage } from './pages/Profile/ProfilePage';
import { hasSavedProfile } from './utils/profileUtils';
import './App.css';

/**
 * HomeLandingPage
 * Composes the primary landing page featuring training styles and nutrition guidance.
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

      {/* Real-time Nutrition & Steps Live Sync Dashboard */}
      <HomeNutritionSnapshot />

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

      {/* Module 4: Nutrition Tips */}
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
  return (
    <ThemeProvider>
      <NutritionProgressProvider>
        {/* Scroll restoration & smooth hash scrolling on route change */}
        <ScrollToTop />

        <div className="app-wrapper">
        {/* Sticky Glass Navbar */}
        <Navbar 
          brandName={homePageContent.navbar.brandName}
          navLinks={homePageContent.navbar.navLinks}
        />

        <main className="main-content">
          <Routes>
            {/* Home Route */}
            <Route
              path="/"
              element={hasSavedProfile() ? <HomeLandingPage /> : <Navigate to="/profile" replace />}
            />

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

            {/* Experimental Module Routes */}
            <Route path="/nutrition" element={<NutritionPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/profile" element={<ProfilePage />} />

            <Route path="/contact" element={<InfoPage type="contact" />} />
            <Route path="/privacy" element={<InfoPage type="privacy" />} />
            <Route path="/terms" element={<InfoPage type="terms" />} />
            <Route path="/cookies" element={<InfoPage type="cookies" />} />
            <Route path="/disclaimer" element={<InfoPage type="disclaimer" />} />
            <Route path="/careers" element={<InfoPage type="careers" />} />
            <Route path="/press" element={<InfoPage type="press" />} />
            <Route path="/science" element={<InfoPage type="science" />} />

            {/* Catch-all redirect to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer 
          brandName={homePageContent.footer.brandName}
          tagline={homePageContent.footer.tagline}
          columns={homePageContent.footer.columns}
        />
      </div>
      </NutritionProgressProvider>
    </ThemeProvider>
  );
}

export default App;
