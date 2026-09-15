import React, { useState, useMemo } from 'react';
import { Dumbbell, SearchX, ArrowLeft } from 'lucide-react';
import { PageHeader } from '../Common/PageHeader';
import { WorkoutCategorySection } from './WorkoutCategorySection';
import { WorkoutFilter } from './WorkoutFilter';
import { WorkoutCard } from './WorkoutCard';
import { WorkoutDetails } from './WorkoutDetails';
import { WorkoutTracker } from '../../WorkoutTracker';
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
  const [activeSessionWorkout, setActiveSessionWorkout] = useState(null);

  // 1. ALL HOOKS MUST STAY UP HERE (Above any conditional returns)
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

  const filteredWorkouts = useMemo(() => {
    return workoutsData.filter((item) => {
      if (activeCategory !== "All" && item.category !== activeCategory) return false;
      if (selectedDifficulty !== "All" && item.difficulty.toLowerCase() !== selectedDifficulty.toLowerCase()) return false;
      if (selectedDuration !== "all" && item.durationCategory !== selectedDuration) return false;
      if (selectedGoal !== "All" && item.goal.toLowerCase() !== selectedGoal.toLowerCase()) return false;
      if (selectedEquipment !== "All" && item.equipment.toLowerCase() !== selectedEquipment.toLowerCase()) return false;

      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesMuscles = item.muscles?.some((m) => m.toLowerCase().includes(query));
        const matchesEquip = item.equipment.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);

        if (!matchesName && !matchesDesc && !matchesMuscles && !matchesEquip && !matchesCategory) {
          return false;
        }
      }
      return true;
    });
  }, [activeCategory, selectedDifficulty, selectedDuration, selectedGoal, selectedEquipment, searchQuery]);

  // 2. CONDITIONAL RETURNS ARE SAFE HERE AFTER ALL HOOKS HAVE BEEN CALLED
  if (activeSessionWorkout) {
    return (
      <div className="workouts-page-wrapper" style={{ padding: '2rem 1rem', minHeight: '80vh' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <button
            type="button"
            onClick={() => setActiveSessionWorkout(null)}
            style={{
              background: '#27272a',
              border: '1px solid #3f3f46',
              color: '#fff',
              padding: '10px 16px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              marginBottom: '1.5rem',
              fontWeight: '600'
            }}
          >
            <ArrowLeft size={16} />
            Back to Workouts Catalogue
          </button>

          <WorkoutTracker activeWorkout={activeSessionWorkout} />
        </div>
      </div>
    );
  }

  return (
    <div className="workouts-page-wrapper">
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
        <WorkoutCategorySection
          categories={workoutCategories}
          activeCategory={activeCategory}
          onSelectCategory={(catName) => setActiveCategory(catName)}
        />

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
              <p>We couldn't find any workout routines matching your current filter criteria.</p>
              <button type="button" className="btn-view-workout" onClick={handleResetFilters}>
                Reset All Filters
              </button>
            </div>
          )}
        </section>
      </div>

      {activeWorkoutDetail && (
        <WorkoutDetails
          workout={activeWorkoutDetail}
          onClose={() => setActiveWorkoutDetail(null)}
          onStartWorkout={(workoutToStart) => {
            setActiveWorkoutDetail(null);
            setActiveSessionWorkout(workoutToStart);
          }}
        />
      )}
    </div>
  );
};