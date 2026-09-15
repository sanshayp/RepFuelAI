import React from 'react';
import { Utensils, Target, Dumbbell, Zap, Flame, Award, CheckCircle2, Lock } from 'lucide-react';
import { useNutritionProgress } from '../../context/NutritionProgressContext';

export const AchievementsList = () => {
  const { achievements } = useNutritionProgress();

  const iconMap = {
    Utensils,
    Target,
    Dumbbell,
    Zap,
    Flame,
    Award,
  };

  return (
    <section className="achievements-section" aria-label="Athlete Achievements">
      <div className="achievements-header">
        <h3>Performance Achievements</h3>
        <p>Unlock badges and bonus XP by sustaining progressive workout overload and nutrition discipline</p>
      </div>

      <div className="achievements-grid">
        {achievements.map((ach) => {
          const Icon = iconMap[ach.icon] || Award;
          const isUnlocked = ach.unlocked;

          return (
            <div
              key={ach.id}
              className={`achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`}
            >
              <div className="achievement-icon-box" aria-hidden="true">
                <Icon size={22} />
              </div>

              <div className="achievement-info">
                <div className="achievement-title-row">
                  <span className="achievement-name">{ach.title}</span>
                  <span className="achievement-badge-xp">{ach.badgeText}</span>
                </div>

                <p className="achievement-desc">{ach.description}</p>

                <div className="achievement-status-tag">
                  {isUnlocked ? (
                    <>
                      <CheckCircle2 size={13} />
                      <span>Unlocked</span>
                    </>
                  ) : (
                    <>
                      <Lock size={13} />
                      <span>Locked</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
