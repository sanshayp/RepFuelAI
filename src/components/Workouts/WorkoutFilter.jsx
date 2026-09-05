import React from 'react';
import { Search, RotateCcw } from 'lucide-react';
import { filterOptions } from '../../data/workoutsData';

export const WorkoutFilter = ({
  searchQuery,
  onSearchChange,
  selectedDifficulty,
  onDifficultyChange,
  selectedDuration,
  onDurationChange,
  selectedGoal,
  onGoalChange,
  selectedEquipment,
  onEquipmentChange,
  totalResults,
  isFiltered,
  onReset
}) => {
  return (
    <div className="workout-filter-panel" aria-label="Workout Filters">
      {/* Top Search & Reset Row */}
      <div className="filter-panel-top">
        <div className="filter-search-box">
          <Search size={18} aria-hidden="true" />
          <input
            type="text"
            className="filter-search-input"
            placeholder="Search workouts, muscle groups, equipment..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search workouts"
          />
        </div>

        <div className="filter-actions-right">
          <span className="filter-results-badge">
            {totalResults} {totalResults === 1 ? 'workout' : 'workouts'} available
          </span>

          {isFiltered && (
            <button
              type="button"
              className="filter-reset-btn"
              onClick={onReset}
              aria-label="Reset all filters"
            >
              <RotateCcw size={14} />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Selectors Grid */}
      <div className="filter-selectors-grid">
        {/* Difficulty Filter */}
        <div className="filter-group">
          <label htmlFor="filter-difficulty" className="filter-group-label">Difficulty</label>
          <select
            id="filter-difficulty"
            className="filter-select"
            value={selectedDifficulty}
            onChange={(e) => onDifficultyChange(e.target.value)}
          >
            {filterOptions.difficulties.map((diff) => (
              <option key={diff} value={diff}>
                {diff === 'All' ? 'All Difficulties' : diff}
              </option>
            ))}
          </select>
        </div>

        {/* Duration Filter */}
        <div className="filter-group">
          <label htmlFor="filter-duration" className="filter-group-label">Duration</label>
          <select
            id="filter-duration"
            className="filter-select"
            value={selectedDuration}
            onChange={(e) => onDurationChange(e.target.value)}
          >
            {filterOptions.durations.map((dur) => (
              <option key={dur.value} value={dur.value}>
                {dur.label}
              </option>
            ))}
          </select>
        </div>

        {/* Goal Filter */}
        <div className="filter-group">
          <label htmlFor="filter-goal" className="filter-group-label">Fitness Goal</label>
          <select
            id="filter-goal"
            className="filter-select"
            value={selectedGoal}
            onChange={(e) => onGoalChange(e.target.value)}
          >
            {filterOptions.goals.map((goal) => (
              <option key={goal} value={goal}>
                {goal === 'All' ? 'All Goals' : goal}
              </option>
            ))}
          </select>
        </div>

        {/* Equipment Filter */}
        <div className="filter-group">
          <label htmlFor="filter-equipment" className="filter-group-label">Equipment</label>
          <select
            id="filter-equipment"
            className="filter-select"
            value={selectedEquipment}
            onChange={(e) => onEquipmentChange(e.target.value)}
          >
            {filterOptions.equipment.map((eq) => (
              <option key={eq} value={eq}>
                {eq === 'All' ? 'All Equipment' : eq}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
