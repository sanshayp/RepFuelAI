import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { homePageContent } from './data/homePageContent';
import { SquatPreloader } from './components/Preloader/SquatPreloader';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { AboutIntro } from './components/AboutIntro/AboutIntro';
import { CategoryGrid } from './components/FitnessCategories/CategoryGrid';
import { FeaturedWorkouts } from './components/FeaturedWorkouts/FeaturedWorkouts';
import { TipsSection } from './components/NutritionTips/TipsSection';
import { Footer } from './components/Footer/Footer';
import './App.css';

export function App() {
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);

  return (
    <ThemeProvider>
      {/* Custom Squatting Man with Dumbbell Preloader */}
      <SquatPreloader 
        minDisplayTime={2000} 
        onComplete={() => setIsPreloaderDone(true)} 
      />

      <div className="app-wrapper">
        {/* Module 1: Sticky Glass Navbar */}
        <Navbar 
          brandName={homePageContent.navbar.brandName}
          navLinks={homePageContent.navbar.navLinks}
          ctaText={homePageContent.navbar.ctaText}
          ctaLink={homePageContent.navbar.ctaLink}
        />

        <main className="main-content">
          {/* Module 2: Hero Section */}
          <Hero 
            badge={homePageContent.hero.badge}
            headline={homePageContent.hero.headline}
            subheadline={homePageContent.hero.subheadline}
            primaryCta={homePageContent.hero.primaryCta}
            secondaryCta={homePageContent.hero.secondaryCta}
            stats={homePageContent.hero.stats}
            heroImage={homePageContent.hero.heroImage}
          />

          {/* Module 3: Introduction to RepFuelAI */}
          <AboutIntro 
            badge={homePageContent.aboutIntro.badge}
            title={homePageContent.aboutIntro.title}
            description={homePageContent.aboutIntro.description}
            pillars={homePageContent.aboutIntro.pillars}
            metricsPreview={homePageContent.aboutIntro.metricsPreview}
          />

          {/* Module 4: Fitness Categories */}
          <CategoryGrid 
            badge={homePageContent.categories.badge}
            title={homePageContent.categories.title}
            subtitle={homePageContent.categories.subtitle}
            items={homePageContent.categories.items}
          />

          {/* Module 5: Featured Workouts */}
          <FeaturedWorkouts 
            badge={homePageContent.featuredWorkouts.badge}
            title={homePageContent.featuredWorkouts.title}
            subtitle={homePageContent.featuredWorkouts.subtitle}
            items={homePageContent.featuredWorkouts.items}
          />

          {/* Module 6: Nutrition & Fitness Tips */}
          <TipsSection 
            badge={homePageContent.nutritionTips.badge}
            title={homePageContent.nutritionTips.title}
            subtitle={homePageContent.nutritionTips.subtitle}
            items={homePageContent.nutritionTips.items}
          />
        </main>

        {/* Module 7: Footer */}
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
