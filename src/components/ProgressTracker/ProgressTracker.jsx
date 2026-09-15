import React, { useState } from 'react';
import { GamificationCard } from './GamificationCard';
import { WeeklyGraph } from './WeeklyGraph';
import { AchievementsList } from './AchievementsList';
import { CalendarProgressView } from './CalendarProgressView';
import { DailyProgressDetails } from './DailyProgressDetails';
import { useNutritionProgress } from '../../context/NutritionProgressContext';
import { Utensils, Flame, Sparkles, Dumbbell, Footprints, Award } from 'lucide-react';
import '../../styles/components/progress-tracker.css';

export const ProgressTracker = () => {
  const { 
    dailyTotals, 
    dailyCalorieTarget, 
    todayWorkoutDone, 
    loggedFoods,
    stepCount,
    stepGoal,
    macroGoals,
    dailyScore,
    calendarDays,
    hasCheatMealToday,
  } = useNutritionProgress();

  // Selected calendar day for detailed inspection (defaults to today / Day 14)
  const todayDay = calendarDays.find((d) => d.dayNumber === 14 || d.isToday) || calendarDays[13];
  const [selectedDayNumber, setSelectedDayNumber] = useState(14);

  const selectedDay = calendarDays.find((d) => d.dayNumber === selectedDayNumber) || todayDay;

  const handleNavigateDay = (delta) => {
    const nextNum = selectedDayNumber + delta;
    if (nextNum >= 1 && nextNum <= 30) {
      setSelectedDayNumber(nextNum);
    }
  };

  const calPercent = dailyCalorieTarget > 0 ? Math.round((dailyTotals.calories / dailyCalorieTarget) * 100) : 0;
  const stepPercent = stepGoal > 0 ? Math.round((stepCount / stepGoal) * 100) : 0;
  const proteinPercent = macroGoals.protein > 0 ? Math.round((dailyTotals.protein / macroGoals.protein) * 100) : 0;

  return (
    <div className="progress-tracker-container">
      {/* 1. Gamification Hero Card (Level, XP, Streak, Workout Toggle) */}
      <GamificationCard />

      {/* 2. Today's Progress Composite Score Banner (Requirement 13) */}
      <section className="daily-composite-score-card" aria-label="Today's Composite Progress Score">
        <div className="composite-score-top">
          <div className="composite-score-title-group">
            <div className="composite-icon-wrap" aria-hidden="true">
              <Award size={22} />
            </div>
            <div>
              <h3>Today&apos;s Progress Score</h3>
              <p>Unified adherence derived from calories, protein, steps, food logs, and workouts</p>
            </div>
          </div>

          <div className="composite-score-digits">
            <span className="score-big-num">{dailyScore}</span>
            <span className="score-denom">/ 100</span>
            <span className="score-pct-badge">{dailyScore}%</span>
          </div>
        </div>

        {/* Dynamic Composite Progress Bar */}
        <div className="composite-progress-track">
          <div 
            className="composite-progress-fill"
            style={{ width: `${dailyScore}%` }}
          />
        </div>

        {/* 4-Metric Synchronized Breakdown Grid */}
        <div className="composite-metrics-row">
          <div className="composite-metric-pill">
            <span className="cmp-label">Calories:</span>
            <strong className="cmp-val">{calPercent}%</strong>
            <span className="cmp-sub">({dailyTotals.calories} / {dailyCalorieTarget})</span>
          </div>

          <div className="composite-metric-pill">
            <span className="cmp-label">Steps:</span>
            <strong className="cmp-val">{stepPercent}%</strong>
            <span className="cmp-sub">({stepCount.toLocaleString()} / {stepGoal.toLocaleString()})</span>
          </div>

          <div className="composite-metric-pill">
            <span className="cmp-label">Protein:</span>
            <strong className="cmp-val">{proteinPercent}%</strong>
            <span className="cmp-sub">({dailyTotals.protein}g / {macroGoals.protein}g)</span>
          </div>

          <div className="composite-metric-pill">
            <span className="cmp-label">Cheat Meal:</span>
            <strong className="cmp-val" style={{ color: hasCheatMealToday ? '#EF4444' : 'var(--volt-green)' }}>
              {hasCheatMealToday ? '🍔 Logged' : 'None'}
            </strong>
          </div>

          <div className="composite-metric-pill">
            <span className="cmp-label">Workout:</span>
            <strong className="cmp-val" style={{ color: todayWorkoutDone ? 'var(--volt-green)' : 'var(--text-muted)' }}>
              {todayWorkoutDone ? 'Done (+20 XP)' : 'Pending'}
            </strong>
          </div>
        </div>
      </section>

      {/* 3. Calendar-Style Daily Progress View (Requirement 9) */}
      <CalendarProgressView
        calendarDays={calendarDays}
        selectedDay={selectedDay}
        onSelectDay={(day) => setSelectedDayNumber(day.dayNumber)}
      />

      {/* 4. Selected Day Progress Details (Requirement 10) */}
      <DailyProgressDetails
        selectedDay={selectedDay}
        onNavigateDay={handleNavigateDay}
        hasPrev={selectedDayNumber > 1}
        hasNext={selectedDayNumber < 30}
      />

      {/* 5. Weekly Dynamic Performance Graph (Requirement 11) */}
      <WeeklyGraph />

      {/* 6. Gamified Achievements List (Requirement 12) */}
      <AchievementsList />
    </div>
  );
};
