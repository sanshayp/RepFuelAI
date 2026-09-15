import React from 'react';
import { ChevronLeft, ChevronRight, Calendar, Sparkles } from 'lucide-react';
import { getScoreCategory } from '../../data/progressSampleData';
import './CalendarProgressView.css';

/**
 * Mini Circular Progress Indicator for Calendar Day Cells
 */
const DayProgressCircle = ({ score, isFuture }) => {
  if (isFuture) {
    return <div className="day-circle future" title="Future Date" />;
  }

  const radius = 10;
  const stroke = 3;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, score));
  const offset = circumference - (clamped / 100) * circumference;
  const category = getScoreCategory(score);

  return (
    <div className={`day-circle-wrap ${category}`} title={`${score}% daily goal completion (${category})`}>
      <svg width="28" height="28" viewBox="0 0 28 28" className="day-circle-svg">
        {/* Background track */}
        <circle
          cx="14"
          cy="14"
          r={radius}
          fill="transparent"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={stroke}
        />
        {/* Value Arc */}
        <circle
          cx="14"
          cy="14"
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 14 14)"
          className="day-circle-fill"
        />
      </svg>
      {/* Visual tier glyph in center */}
      <span className="day-tier-glyph">
        {score >= 100 ? '●' : score >= 76 ? '◕' : score >= 51 ? '◑' : score >= 26 ? '◔' : '○'}
      </span>
    </div>
  );
};

export const CalendarProgressView = ({ 
  calendarDays = [], 
  selectedDay = null, 
  onSelectDay = () => {} 
}) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // September 1, 2026 starts on a Tuesday (Index 2: Sun=0, Mon=1, Tue=2)
  // We prepend 2 empty slots so Day 1 falls under Tuesday
  const leadingEmptySlots = 2;

  return (
    <div className="calendar-progress-card" role="region" aria-label="Monthly Adherence Calendar">
      {/* Calendar Header */}
      <div className="calendar-header-bar">
        <div className="calendar-title-group">
          <div className="calendar-badge-icon" aria-hidden="true">
            <Calendar size={18} />
          </div>
          <div>
            <h3>September 2026</h3>
            <p>Daily performance &amp; consistency calendar</p>
          </div>
        </div>

        <div className="calendar-legend-pills">
          <div className="legend-pill very-low">
            <span className="glyph">○</span>
            <span>0–25% Very Low</span>
          </div>
          <div className="legend-pill low">
            <span className="glyph">◔</span>
            <span>26–50% Low</span>
          </div>
          <div className="legend-pill moderate">
            <span className="glyph">◑</span>
            <span>51–75% Moderate</span>
          </div>
          <div className="legend-pill high">
            <span className="glyph">◕</span>
            <span>76–99% High</span>
          </div>
          <div className="legend-pill completed">
            <span className="glyph">●</span>
            <span>100% Completed</span>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="calendar-grid-container">
        {/* Days of Week Header */}
        <div className="calendar-weekdays-row" role="row">
          {daysOfWeek.map((day) => (
            <div key={day} className="calendar-weekday-cell" role="columnheader">
              {day}
            </div>
          ))}
        </div>

        {/* Days Grid Cells */}
        <div className="calendar-days-grid" role="grid">
          {/* Leading blank spaces */}
          {Array.from({ length: leadingEmptySlots }).map((_, idx) => (
            <div key={`empty-${idx}`} className="calendar-day-cell empty" role="gridcell" />
          ))}

          {/* Actual days 1 to 30 */}
          {calendarDays.map((day) => {
            const isSelected = selectedDay && selectedDay.dayNumber === day.dayNumber;
            const category = getScoreCategory(day.score);

            return (
              <button
                key={day.dayNumber}
                type="button"
                role="gridcell"
                aria-selected={isSelected}
                className={`calendar-day-cell ${isSelected ? 'selected' : ''} ${day.isToday ? 'is-today' : ''} ${day.isFuture ? 'is-future' : ''} tier-${category}`}
                onClick={() => onSelectDay(day)}
              >
                <div className="cell-top-row">
                  <span className="day-number-text">{day.dayNumber}</span>
                  {day.hasCheatMeal && (
                    <span className="cheat-meal-icon-indicator" title="Cheat meal logged on this day">
                      🍔
                    </span>
                  )}
                  {day.isToday && (
                    <span className="today-badge-dot" title="Today" />
                  )}
                </div>

                <div className="cell-progress-visual">
                  <DayProgressCircle score={day.score} isFuture={day.isFuture} />
                </div>

                {!day.isFuture && (
                  <span className="cell-score-subtext">{day.score}%</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="calendar-card-footer">
        <span className="footer-note">
          💡 Click any date above to inspect comprehensive nutrition, step volume, and XP metrics.
        </span>
      </div>
    </div>
  );
};
