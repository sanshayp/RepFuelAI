/**
 * RepFuelAI Home Page Centralized Content Store
 * Separates marketing copy and component data from presentation logic.
 */

export const homePageContent = {
  navbar: {
    brandName: "RepFuelAI",
    tagline: "Precision Performance",
    navLinks: [
      { label: "Home", href: "#hero" },
      { label: "Training Styles", href: "#categories" },
      { label: "Workouts", href: "#workouts" },
      { label: "Nutrition", href: "#nutrition" },
      { label: "Why RepFuel", href: "#about" },
    ],
    ctaText: "Get Started",
    ctaLink: "#categories"
  },

  hero: {
    badge: "⚡ NEXT-GEN ATHLETIC INTELLIGENCE",
    headline: "Transform Your Body, Fuel Your Performance",
    subheadline: "AI-engineered workout regimens, progressive overload tracking, and precision nutrition protocols designed to elevate every single rep.",
    primaryCta: {
      text: "Start Your Journey",
      href: "#categories"
    },
    secondaryCta: {
      text: "Explore Workouts",
      href: "#workouts"
    },
    stats: [
      { value: "50K+", label: "Active Athletes" },
      { value: "98.4%", label: "Goal Adherence" },
      { value: "1.2M+", label: "Reps Tracked" },
    ],
    heroImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=85"
  },

  aboutIntro: {
    badge: "BUILT FOR THE DEDICATED",
    title: "Why RepFuelAI?",
    description: "RepFuelAI is engineered for athletes and fitness enthusiasts who demand science-backed results. By uniting algorithmic overload tracking, bio-individual nutrition guidance, and an unrelenting global community, we eliminate guesswork so you can unlock your absolute peak potential.",
    pillars: [
      {
        id: "p1",
        title: "Intelligent Progressive Overload",
        description: "Dynamic micro-adjustments calculate your ideal weights, reps, and RPE to ensure steady, non-plateauing strength gains.",
        icon: "TrendingUp"
      },
      {
        id: "p2",
        title: "Science-Backed Physiology",
        description: "Zero fad trends or gimmick workouts. Every protocol is anchored in peer-reviewed exercise science and metabolic research.",
        icon: "Activity"
      },
      {
        id: "p3",
        title: "Holistic Athlete Fueling",
        description: "Workouts only go as far as your nutrition. Get synchronized nutrient-timing, hydration targets, and recovery metrics.",
        icon: "Flame"
      }
    ],
    metricsPreview: {
      activePacing: "94% Optimal Form",
      weeklyVolume: "+14.2% Strength Gain",
      calorieBurn: "Avg. 480 kcal/session"
    }
  },

  categories: {
    badge: "TAILORED DISCIPLINES",
    title: "Explore Training Styles",
    subtitle: "Select the discipline tailored to your goals. RepFuelAI adapts dynamically to your equipment, schedule, and target intensity.",
    items: [
      {
        id: "cat-1",
        icon: "Dumbbell",
        title: "Strength & Hypertrophy",
        description: "Build dense contractile muscle mass, boost maximal power, and master compound barbell and dumbbell lifts.",
        tag: "High Resistance",
        href: "#workouts"
      },
      {
        id: "cat-2",
        icon: "Flame",
        title: "High-Intensity Interval (HIIT)",
        description: "Maximize EPOC metabolic burn, elevate cardiovascular VO2 max, and incinerate body fat in efficient circuits.",
        tag: "Peak Calorie Burn",
        href: "#workouts"
      },
      {
        id: "cat-3",
        icon: "Zap",
        title: "Functional Bodyweight",
        description: "Develop gymnastic-level calisthenics control, rotational core strength, and injury-resistant joints.",
        tag: "Zero Equipment",
        href: "#workouts"
      },
      {
        id: "cat-4",
        icon: "HeartPulse",
        title: "Athletic Conditioning",
        description: "Engineered endurance conditioning that enhances aerobic threshold and keeps your engine running strong.",
        tag: "Cardio Stamina",
        href: "#workouts"
      },
      {
        id: "cat-5",
        icon: "Sparkles",
        title: "Dynamic Yoga & Mobility",
        description: "Restore hip and thoracic range of motion, decompress spinal load, and accelerate active muscle recovery.",
        tag: "Mobility & Flow",
        href: "#workouts"
      },
      {
        id: "cat-6",
        icon: "Shield",
        title: "Core & Kinetic Pilates",
        description: "Deep anterior and posterior chain reinforcement designed to stabilize your pelvis and shield your lower back.",
        tag: "Core Stability",
        href: "#workouts"
      }
    ]
  },

  featuredWorkouts: {
    badge: "PROVEN PROTOCOLS",
    title: "Featured Workouts",
    subtitle: "Handcrafted, battle-tested routines programmed by world-class strength coaches and amplified by AI tracking.",
    items: [
      {
        id: "wo-1",
        title: "Full Body Hypertrophy Forge",
        category: "Strength",
        duration: "45 min",
        difficulty: "Intermediate",
        calories: "420 kcal",
        image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80",
        rating: "4.9 (1.4k reviews)"
      },
      {
        id: "wo-2",
        title: "Metabolic Inferno HIIT",
        category: "HIIT",
        duration: "30 min",
        difficulty: "Advanced",
        calories: "390 kcal",
        image: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?auto=format&fit=crop&w=800&q=80",
        rating: "4.8 (920 reviews)"
      },
      {
        id: "wo-3",
        title: "Kinetic Core & Calisthenics",
        category: "Bodyweight",
        duration: "25 min",
        difficulty: "Beginner",
        calories: "210 kcal",
        image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
        rating: "4.9 (2.1k reviews)"
      },
      {
        id: "wo-4",
        title: "Power Sprint & Engine Builder",
        category: "Cardio",
        duration: "35 min",
        difficulty: "Intermediate",
        calories: "450 kcal",
        image: "https://images.unsplash.com/photo-1434725039720-aaad6dd32dfe?auto=format&fit=crop&w=800&q=80",
        rating: "4.7 (780 reviews)"
      },
      {
        id: "wo-5",
        title: "Thoracic Mobility & Deep Flow",
        category: "Mobility",
        duration: "20 min",
        difficulty: "Beginner",
        calories: "130 kcal",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
        rating: "4.9 (1.8k reviews)"
      },
      {
        id: "wo-6",
        title: "Posterior Chain Deadlift Focus",
        category: "Strength",
        duration: "50 min",
        difficulty: "Advanced",
        calories: "510 kcal",
        image: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=800&q=80",
        rating: "5.0 (3.2k reviews)"
      }
    ]
  },

  nutritionTips: {
    badge: "HOLISTIC FUELING",
    title: "Nutrition & Fitness Tips",
    subtitle: "Precision nutritional habits designed to accelerate recovery, fuel workouts, and maintain lean body composition.",
    items: [
      {
        id: "tip-1",
        icon: "Salad",
        category: "Healthy Eating Tips",
        title: "Macronutrient Density & Clean Energy",
        description: "Fill half your plate with colorful fibrous vegetables and prioritize whole unrefined carbohydrates. Balancing nutrient density with essential fats maintains steady blood glucose and prevents training fatigue.",
        bulletPoints: ["50% colorful vegetables per meal", "Complex carbohydrates for glycogen", "Zero processed sugars"]
      },
      {
        id: "tip-2",
        icon: "Droplets",
        category: "Hydration Guidance",
        title: "Electrolyte Balance & Fluid Timing",
        description: "Maintain 3–4 liters of baseline water intake daily. Supplement with sodium, potassium, and magnesium prior to heavy resistance sessions to prevent cramping, preserve blood volume, and sustain power.",
        bulletPoints: ["3-4L baseline daily fluid intake", "Electrolytes 30m prior to training", "Consistent cellular hydration"]
      },
      {
        id: "tip-3",
        icon: "Fish",
        category: "Protein & Workout Nutrition",
        title: "Muscle Protein Synthesis (MPS) Optimization",
        description: "Target 1.6–2.2 grams of quality protein per kilogram of body weight distributed across 3–4 daily feedings. Aim for 25–35g of leucine-rich protein within 2 hours post-session to maximize muscular repair.",
        bulletPoints: ["1.6–2.2g protein per kg bodyweight", "Optimal leucine threshold per serving", "Post-training recovery window"]
      }
    ]
  },

  footer: {
    brandName: "RepFuelAI",
    tagline: "The premier AI-driven ecosystem for athletic performance, progressive resistance, and metabolic fueling.",
    columns: [
      {
        title: "Platform",
        links: [
          { label: "Training Categories", href: "#categories" },
          { label: "Featured Workouts", href: "#workouts" },
          { label: "Nutrition & Fueling", href: "#nutrition" },
          { label: "Rep Tracking Engine", href: "#about" },
          { label: "Athlete Leaderboard", href: "#" }
        ]
      },
      {
        title: "Company",
        links: [
          { label: "About RepFuelAI", href: "#about" },
          { label: "Science & Methodology", href: "#" },
          { label: "Careers", href: "#" },
          { label: "Press & Media", href: "#" },
          { label: "Contact Us", href: "#" }
        ]
      },
      {
        title: "Legal & Trust",
        links: [
          { label: "Privacy Policy", href: "#" },
          { label: "Terms of Service", href: "#" },
          { label: "Cookie Settings", href: "#" },
          { label: "Health & Safety Disclaimer", href: "#" }
        ]
      }
    ],
    socialLinks: [
      { platform: "Twitter / X", href: "https://x.com", icon: "Twitter" },
      { platform: "Instagram", href: "https://instagram.com", icon: "Instagram" },
      { platform: "YouTube", href: "https://youtube.com", icon: "Youtube" },
      { platform: "GitHub", href: "https://github.com", icon: "Github" }
    ]
  }
};
