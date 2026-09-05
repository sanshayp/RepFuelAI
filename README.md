# RepFuelAI

RepFuelAI is a modern, responsive web application engineered for athletes and fitness enthusiasts seeking science-backed workout programming, athletic methodology education, and metric tracking. It bridges the gap between complex exercise physiology and daily athletic execution by providing structured training routines, interactive filtering, comprehensive discipline guides, and personal health metrics in a sleek, glassmorphic interface.

---

## Features

- **Dedicated Workouts System**: Browse, search, and filter battle-tested workout routines by discipline, experience level, duration, fitness goals, and available equipment.
- **Detailed Exercise Breakdowns**: Inspect granular workout routines featuring exact exercises, target muscle groups, sets, repetition targets, and rest periods.
- **Training Styles Educational Hub**: Deep dive into 8 foundational training disciplines with breakdowns of physiological mechanisms, typical workout structures, advantages, considerations, and sample workouts.
- **Interactive BMI Calculator**: Screen personal metric estimates with instant categorization (Underweight, Healthy, Overweight, Obesity range) and personalized health context.
- **Home Page Previews**: Streamlined landing page previewing featured workouts and training styles with direct CTAs to their dedicated pages.
- **Fluid Dark & Light Theme**: Built-in, user-toggled theme engine with persistent design tokens, high-contrast typography, and accent gradients.
- **Responsive Design**: Mobile-first architecture with glassmorphic cards, adaptive grids, and touch-friendly navigation across smartphones, tablets, and desktop displays.
- **Squatting Preloader**: Custom athletic animation preloader establishing immediate brand identity on initial load.

---

## Workout System

The dedicated **Workouts** page (`/workouts`) allows athletes to find the exact protocol suited to their day and goals:

- **Workout Categories**: Quick-filter by 6 primary athletic disciplines:
  - *Strength Training* (progressive overload and compound resistance)
  - *Cardio* (endurance and VO2 max conditioning)
  - *HIIT* (high-intensity interval afterburn)
  - *Bodyweight* (calisthenics and relative strength)
  - *Mobility & Flexibility* (joint capsule restoration and recovery)
  - *Core Training* (anti-rotation, pelvic bracing, and spine protection)
- **Multi-Parameter Filtering**:
  - **Difficulty**: Beginner, Intermediate, Advanced
  - **Duration**: Under 15 min, 15–30 min, 30–45 min, 45+ min
  - **Fitness Goal**: Fat Loss, Muscle Gain, Strength, Endurance, General Fitness
  - **Equipment**: No Equipment, Dumbbells, Barbell, Gym Equipment
  - **Keyword Search**: Instant query matching against workout titles, target muscles, and equipment
- **Workout Details & Exercises**:
  - Highlighting workout overview, target muscle groups, equipment required, and estimated caloric burn.
  - Granular exercise table detailing exercise name, target muscular region, sets × reps, and prescribed rest times (e.g., *Bench Press — 4 sets × 8–12 reps — Rest: 90 seconds*).

---

## Training Styles

The dedicated **Training Styles** page (`/training-styles`) serves as an educational encyclopedia covering 8 key methodologies:

1. **Strength Training**: Heavy progressive resistance compound lifting to maximize motor unit recruitment.
2. **Hypertrophy Training**: Targeted muscular volume and mechanical tension for lean muscle growth.
3. **High-Intensity Interval Training (HIIT)**: Anaerobic work-to-rest intervals maximizing cardiovascular threshold and EPOC burn.
4. **Circuit Training**: High-density sequential stations balancing muscular endurance and caloric expenditure.
5. **Calisthenics**: Gymnastic bodyweight leverage and relative strength control with zero equipment.
6. **Functional Training**: Multi-planar movement patterns (squat, hinge, lunge, rotate, carry) building real-world resilience.
7. **Endurance Training**: Sustained aerobic Zone 2/3 conditioning enhancing mitochondrial density.
8. **Mobility Training**: Controlled Articular Rotations (CARs) and active joint capsules restoration.

Users can filter styles by difficulty or search by goal, and open interactive educational modals detailing *"What Is It?"*, *"How It Works"*, *"Key Advantages"*, *"Things to Consider"*, and an *"Example Workout"*.

---

## Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Build Tool & Dev Server**: [Vite 6](https://vite.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/) (`react-router-dom`)
- **Iconography**: [Lucide React](https://lucide.dev/)
- **Styling**: Vanilla Modular CSS with CSS Custom Properties (Design Tokens, Glassmorphism, Theme Engine)
- **Typography**: Google Fonts (*Outfit* for bold display headings, *Plus Jakarta Sans* for clean body copy)

---

## Project Structure

```
RepFuelAI/
├── public/                     # Static assets and favicon
├── src/
│   ├── components/             # Modular React components
│   │   ├── AboutIntro/         # Why RepFuel overview and core pillars
│   │   ├── BMICalculator/      # Metric BMI calculator & result badge
│   │   ├── Common/             # PageHeader, ScrollToTop, and shared UI
│   │   ├── FeaturedWorkouts/   # Home preview section and workout cards
│   │   ├── FitnessCategories/  # Home preview section and category cards
│   │   ├── Footer/             # Global footer with navigation columns
│   │   ├── Hero/               # Hero banner, headline, and primary CTAs
│   │   ├── Navbar/             # Glassmorphic header, route links, theme switch
│   │   ├── NutritionTips/      # Nutrient timing and fueling advice
│   │   ├── Preloader/          # Squat preloader animation
│   │   ├── TrainingStyles/     # Dedicated Training Styles page, cards, and modal
│   │   └── Workouts/           # Dedicated Workouts page, filters, cards, and modal
│   ├── context/
│   │   └── ThemeContext.jsx    # Dark/Light theme provider and state hook
│   ├── data/
│   │   ├── homePageContent.js  # Landing page copy and navigation links
│   │   ├── trainingStylesData.js # Educational data store for 8 disciplines
│   │   └── workoutsData.js     # Structured workout routines and filter options
│   ├── styles/                 # Design system tokens and component stylesheets
│   │   ├── components/         # Component-specific styles
│   │   ├── animations.css      # Keyframe animations
│   │   └── variables.css       # CSS custom properties for Dark & Light modes
│   ├── App.css                 # Global resets, typography, and layout rules
│   ├── App.jsx                 # Main application shell with React Router routes
│   └── main.jsx                # React DOM entry point wrapping BrowserRouter
├── index.html                  # HTML entry point and font declarations
├── package.json                # Dependencies and project scripts
├── vite.config.js              # Vite configuration (port 3000)
└── README.md                   # Project documentation
```

---

## Getting Started

### Installation

Clone the repository and install the dependencies:

```bash
npm install
```

### Development Server

Start the local Vite development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Production Build

Create an optimized, minified production bundle in the `dist` directory:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## Available Routes

| Route | Page | Description |
| :--- | :--- | :--- |
| `/` | **Home** | Landing page featuring Hero, About RepFuel, Training Styles preview, Workout preview, and Nutrition Tips. |
| `/workouts` | **Workouts** | Dedicated workouts hub with category selector, multi-parameter filters (difficulty, duration, goal, equipment), search, and granular exercise detail modals. |
| `/training-styles` | **Training Styles** | Educational hub covering 8 athletic training disciplines, methodology comparisons, advantages, and sample sessions. |
| `/bmi` | **BMI Check** | Dedicated metric health calculator with immediate score categorization and guidance. |

---

## Future Improvements

The following items represent planned architectural and functional enhancements:

- **Personalized Workout Recommendations**: User onboarding quiz adapting workouts based on current fitness level and target timeframe.
- **User Profiles & History Tracking**: User authentication, workout completion tracking, and personal record (PR) logs.
- **AI-Generated Dynamic Plans**: Algorithmic generation of weekly split schedules with auto-adjusting progressive overload.
- **Nutrition & Fueling Integration**: Daily macronutrient calculators synchronized with daily workout volume and intensity.
- **Backend & Database Storage**: Persistent backend API (e.g. Node.js/PostgreSQL or Firebase) for multi-device sync and user community leaderboards.
