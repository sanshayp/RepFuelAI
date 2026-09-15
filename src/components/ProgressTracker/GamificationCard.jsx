import React from 'react';
import { Award, Flame, CheckCircle2, Circle, Dumbbell, Sparkles, TrendingUp } from 'lucide-react';
import { useNutritionProgress } from '../../context/NutritionProgressContext';

export const GamificationCard = () => {
  const {
    levelInfo,
    streak,
    todayWorkoutDone,
    toggleTodayWorkout,
    totalXp,
    dailyScore,
  } = useNutritionProgress();

  const xpTargetForNextLevel = levelInfo.level * 500;
  const currentInTier = totalXp % 500;

  return (
    <section className="gamification-hero-card" aria-label="Athlete Gamification Status">
      <div className="gamification-top-row">
        {/* Level and Title */}
        <div className="level-badge-wrap">
          <div className="level-icon-box" aria-hidden="true">
            <Award size={28} />
          </div>
          <div className="level-title-info">
            <h2>
              LEVEL {levelInfo.level}
              <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-secondary)', marginLeft: '8px' }}>
                ({totalXp.toLocaleString()} XP)
              </span>
            </h2>
            <p className="level-subtitle">Consistent Athletic Progression &bull; Daily Score: {dailyScore}%</p>
          </div>
        </div>

        {/* Streak Counter */}
        <div className="streak-pill" title="Consecutive active tracking days">
          <Flame size={20} />
          <span>🔥 {streak} Day Streak</span>
        </div>
      </div>

      {/* Level XP Progress Bar */}
      <div className="level-progress-block">
        <div className="level-progress-labels">
          <span>Level {levelInfo.level} XP Progress: <strong>{currentInTier} / 500 XP</strong> ({levelInfo.progressPercent}%)</span>
          <span>{levelInfo.nextLevelXp} XP to Level {levelInfo.level + 1}</span>
        </div>
        <div className="level-progress-track">
          <div
            className="level-progress-fill"
            style={{ width: `${levelInfo.progressPercent}%` }}
          />
        </div>
      </div>

      {/* Motivational XP Earning Rules Banner */}
      <div className="xp-rules-bar">
        <div className="xp-rule-tag">
          <span>🥗 Food Logged</span>
          <strong>+10 XP</strong>
        </div>
        <div className="xp-rule-tag">
          <span>🎯 Calorie Target</span>
          <strong>+30 XP</strong>
        </div>
        <div className="xp-rule-tag">
          <span>💪 Protein Goal</span>
          <strong>+20 XP</strong>
        </div>
        <div className="xp-rule-tag">
          <span>👟 Step Goal</span>
          <strong>+20 XP</strong>
        </div>
        <div className="xp-rule-tag">
          <span>⚡ Daily Score Goal</span>
          <strong>+30 XP</strong>
        </div>
      </div>

      {/* Today's Daily Training Goal Check-Off */}
      <div className="today-quest-bar">
        <div className="today-quest-info">
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 'var(--radius-md)',
              background: todayWorkoutDone ? 'var(--volt-green-subtle)' : 'var(--input-bg)',
              color: todayWorkoutDone ? 'var(--volt-green)' : 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Dumbbell size={20} />
          </div>
          <div>
            <h4>Today&apos;s Workout Session (+20 XP)</h4>
            <p>
              {todayWorkoutDone
                ? 'Session marked as completed! Training volume synced to your calendar and daily score.'
                : 'Complete your planned lifting or cardio session to earn +20 XP and fuel your streak.'}
            </p>
          </div>
        </div>

        <button
          type="button"
          className={`workout-toggle-btn ${todayWorkoutDone ? 'completed' : 'incomplete'}`}
          onClick={toggleTodayWorkout}
          aria-pressed={todayWorkoutDone}
        >
          {todayWorkoutDone ? (
            <>
              <CheckCircle2 size={16} /> Completed
            </>
          ) : (
            <>
              <Circle size={16} /> Mark as Complete
            </>
          )}
        </button>
      </div>
    </section>
  );
};
