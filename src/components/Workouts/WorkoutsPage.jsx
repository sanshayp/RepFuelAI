import React, { useState, useMemo } from 'react';
import { Dumbbell, SearchX } from 'lucide-react';
import { PageHeader } from '../Common/PageHeader';
import { WorkoutCategorySection } from './WorkoutCategorySection';
import { WorkoutFilter } from './WorkoutFilter';
import { WorkoutCard } from './WorkoutCard';
import { WorkoutDetails } from './WorkoutDetails';
import { workoutCategories, workoutsData } from '../../data/workoutsData';
import '../../styles/components/workouts-page.css';

export const WorkoutsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [selectedGoal, setSelectedGoal] = useState("All");
  const [selectedEquipment, setSelectedEquipment] = useState("All");
  const [activeWorkoutDetail, setActiveWorkoutDetail] = useState(null);

  // Check if any filter is active
  const isFiltered = useMemo(() => {
    return (
      activeCategory !== "All" ||
      searchQuery.trim() !== "" ||
      selectedDifficulty !== "All" ||
      selectedDuration !== "all" ||
      selectedGoal !== "All" ||
      selectedEquipment !== "All"
    );
  }, [activeCategory, searchQuery, selectedDifficulty, selectedDuration, selectedGoal, selectedEquipment]);

  const handleResetFilters = () => {
    setActiveCategory("All");
    setSearchQuery("");
    setSelectedDifficulty("All");
    setSelectedDuration("all");
    setSelectedGoal("All");
    setSelectedEquipment("All");
  };

  // Filtered workouts calculation
  const filteredWorkouts = useMemo(() => {
    return workoutsData.filter((item) => {
      // Category filter
      if (activeCategory !== "All" && item.category !== activeCategory) {
        return false;
      }

      // Difficulty filter
      if (selectedDifficulty !== "All" && item.difficulty.toLowerCase() !== selectedDifficulty.toLowerCase()) {
        return false;
      }

      // Duration filter
      if (selectedDuration !== "all" && item.durationCategory !== selectedDuration) {
        return false;
      }

      // Goal filter
      if (selectedGoal !== "All" && item.goal.toLowerCase() !== selectedGoal.toLowerCase()) {
        return false;
      }

      // Equipment filter
      if (selectedEquipment !== "All" && item.equipment.toLowerCase() !== selectedEquipment.toLowerCase()) {
        return false;
      }

      // Search query across name, description, muscles, and equipment
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesMuscles = item.muscles.some((m) => m.toLowerCase().includes(query));
        const matchesEquip = item.equipment.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);

        if (!matchesName && !matchesDesc && !matchesMuscles && !matchesEquip && !matchesCategory) {
          return false;
        }
      }

      return true;
    });
  }, [activeCategory, selectedDifficulty, selectedDuration, selectedGoal, selectedEquipment, searchQuery]);

  return (
    <div className="workouts-page-wrapper">
      {/* Page Header */}
      <PageHeader
        badge="PRECISION PROTOCOLS"
        badgeIcon={Dumbbell}
        title="Workouts"
        titleAccent="& Regimens"
        subtitle="Explore science-backed workouts based on your goals, experience level, available equipment, and preferred training disciplines."
        currentPage="Workouts"
        statsPill={`${workoutsData.length} Battle-Tested Protocols`}
      />

      <div className="workouts-main-container">
        {/* Workout Categories Quick Selection */}
        <WorkoutCategorySection
          categories={workoutCategories}
          activeCategory={activeCategory}
          onSelectCategory={(catName) => setActiveCategory(catName)}
        />

        {/* Workout Filters */}
        <WorkoutFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedDifficulty={selectedDifficulty}
          onDifficultyChange={setSelectedDifficulty}
          selectedDuration={selectedDuration}
          onDurationChange={setSelectedDuration}
          selectedGoal={selectedGoal}
          onGoalChange={setSelectedGoal}
          selectedEquipment={selectedEquipment}
          onEquipmentChange={setSelectedEquipment}
          totalResults={filteredWorkouts.length}
          isFiltered={isFiltered}
          onReset={handleResetFilters}
        />

        {/* Workouts Grid */}
        <section className="workouts-grid-section" aria-label="Filtered Workouts">
          {filteredWorkouts.length > 0 ? (
            <div className="workouts-card-grid">
              {filteredWorkouts.map((workout) => (
                <WorkoutCard
                  key={workout.id}
                  workout={workout}
                  onViewDetails={(wo) => setActiveWorkoutDetail(wo)}
                />
              ))}
            </div>
          ) : (
            <div className="workouts-empty-state">
              <div className="empty-state-icon" aria-hidden="true">
                <SearchX size={32} />
              </div>
              <h3>No matching workouts found</h3>
              <p>We couldn't find any workout routines matching your current filter criteria. Try adjusting or resetting your filters.</p>
              <button
                type="button"
                className="btn-view-workout"
                onClick={handleResetFilters}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </section>
      </div>

      {/* Workout Details Modal */}
      {activeWorkoutDetail && (
        <WorkoutDetails
          workout={activeWorkoutDetail}
          onClose={() => setActiveWorkoutDetail(null)}
        />
      )}
    </div>
  );
};
