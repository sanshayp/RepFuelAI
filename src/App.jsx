import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { homePageContent } from './data/homePageContent';
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
import { InfoPage } from './components/Common/InfoPage';

import { GoalQuiz } from './GoalQuiz';
import { BmiHub } from './BmiHub';
import { WorkoutTracker } from './WorkoutTracker';
import { OnboardingModal } from './components/OnboardingModal';

import './App.css';

/**
 * BmiRouteWrapper
 * Receives default height and weight from user onboarding
 */
const BmiRouteWrapper = ({ userHeight, userWeight }) => {
  const [height, setHeight] = useState(userHeight || '175');
  const [weight, setWeight] = useState(userWeight || '77');

  // Keep state updated if onboarding completes while on the page
  useEffect(() => {
    if (userHeight) setHeight(userHeight);
    if (userWeight) setWeight(userWeight);
  }, [userHeight, userWeight]);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
      <BMICalculator
        badge={homePageContent.bmi.badge}
        title={homePageContent.bmi.title}
        subtitle={homePageContent.bmi.subtitle}
        height={height}
        setHeight={setHeight}
        weight={weight}
        setWeight={setWeight}
      />
      <div style={{ marginTop: '2rem' }}>
        <BmiHub 
          height={height} 
          weight={weight} 
          onHeightChange={setHeight} 
          onWeightChange={setWeight} 
        />
      </div>
    </div>
  );
};

/**
 * HomeLandingPage
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

      <section style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem' }}>
        <GoalQuiz />
      </section>

      <AboutIntro 
        badge={homePageContent.aboutIntro.badge}
        title={homePageContent.aboutIntro.title}
        description={homePageContent.aboutIntro.description}
        pillars={homePageContent.aboutIntro.pillars}
        metricsPreview={homePageContent.aboutIntro.metricsPreview}
      />

      <CategoryGrid 
        badge={homePageContent.categories.badge}
        title={homePageContent.categories.title}
        subtitle={homePageContent.categories.subtitle}
        items={homePageContent.categories.items}
      />

      <FeaturedWorkouts 
        badge={homePageContent.featuredWorkouts.badge}
        title={homePageContent.featuredWorkouts.title}
        subtitle={homePageContent.featuredWorkouts.subtitle}
        items={homePageContent.featuredWorkouts.items}
      />

      <section style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem' }}>
        <WorkoutTracker />
      </section>

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
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [userProfile, setUserProfile] = useState({ height: '175', weight: '77' });

  useEffect(() => {
    const savedProfile = localStorage.getItem('userFitnessProfile');
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    } else {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingComplete = (data) => {
    localStorage.setItem('onboardingCompleted', 'true');
    localStorage.setItem('userFitnessProfile', JSON.stringify(data));
    setUserProfile(data);
  };

  return (
    <ThemeProvider>
      <ScrollToTop />

      {/* Onboarding Popup Modal */}
      <OnboardingModal 
        isOpen={showOnboarding} 
        onClose={() => setShowOnboarding(false)}
        onComplete={handleOnboardingComplete}
      />

      <div className="app-wrapper">
        <Navbar 
          brandName={homePageContent.navbar.brandName}
          navLinks={homePageContent.navbar.navLinks}
          ctaText={homePageContent.navbar.ctaText}
          ctaLink={homePageContent.navbar.ctaLink}
          onOpenOnboarding={() => setShowOnboarding(true)}
        />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomeLandingPage />} />
            <Route path="/workouts" element={<WorkoutsPage />} />
            <Route path="/training-styles" element={<TrainingStylesPage />} />
            
            {/* Passes user's questionnaire answers as defaults */}
            <Route 
              path="/bmi" 
              element={
                <BmiRouteWrapper 
                  userHeight={userProfile.height} 
                  userWeight={userProfile.weight} 
                />
              } 
            />

            <Route path="/contact" element={<InfoPage type="contact" />} />
            <Route path="/privacy" element={<InfoPage type="privacy" />} />
            <Route path="/terms" element={<InfoPage type="terms" />} />
            <Route path="/cookies" element={<InfoPage type="cookies" />} />
            <Route path="/disclaimer" element={<InfoPage type="disclaimer" />} />
            <Route path="/careers" element={<InfoPage type="careers" />} />
            <Route path="/press" element={<InfoPage type="press" />} />
            <Route path="/science" element={<InfoPage type="science" />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer 
          brandName={homePageContent.footer.brandName}
          tagline={homePageContent.footer.tagline}
          columns={homePageContent.footer.columns}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;