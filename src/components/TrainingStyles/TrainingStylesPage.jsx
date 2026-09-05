import React, { useState, useMemo } from 'react';
import { Sparkles, Search, SearchX } from 'lucide-react';
import { PageHeader } from '../Common/PageHeader';
import { TrainingStyleCard } from './TrainingStyleCard';
import { TrainingStyleDetails } from './TrainingStyleDetails';
import { trainingStylesData } from '../../data/trainingStylesData';
import '../../styles/components/training-styles-page.css';

const filterCategories = ["All", "Beginner", "Intermediate", "Advanced"];

export const TrainingStylesPage = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStyleDetail, setActiveStyleDetail] = useState(null);

  const filteredStyles = useMemo(() => {
    return trainingStylesData.filter((style) => {
      // Difficulty filter
      if (selectedDifficulty !== "All" && style.difficulty.toLowerCase() !== selectedDifficulty.toLowerCase()) {
        return false;
      }

      // Search query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesName = style.name.toLowerCase().includes(query);
        const matchesDesc = style.shortDescription.toLowerCase().includes(query);
        const matchesBestFor = style.bestFor.some((b) => b.toLowerCase().includes(query));

        if (!matchesName && !matchesDesc && !matchesBestFor) {
          return false;
        }
      }

      return true;
    });
  }, [selectedDifficulty, searchQuery]);

  return (
    <div className="training-styles-page-wrapper">
      {/* Page Header */}
      <PageHeader
        badge="ATHLETIC DISCIPLINES"
        badgeIcon={Sparkles}
        title="Training Styles"
        titleAccent="& Methodologies"
        subtitle="Explore foundational fitness methodologies, discover the science behind each approach, and determine which discipline aligns with your personal physical potential."
        currentPage="Training Styles"
        statsPill={`${trainingStylesData.length} Core Disciplines`}
      />

      <div className="training-styles-container">
        {/* Filter Toolbar */}
        <div className="styles-toolbar" aria-label="Filter Training Styles">
          <div className="styles-filter-pills">
            {filterCategories.map((category) => (
              <button
                key={category}
                type="button"
                className={`style-filter-pill ${selectedDifficulty === category ? 'active' : ''}`}
                onClick={() => setSelectedDifficulty(category)}
                aria-pressed={selectedDifficulty === category}
              >
                {category === 'All' ? 'All Disciplines' : `${category} Level`}
              </button>
            ))}
          </div>

          <div className="styles-search-box">
            <Search size={16} aria-hidden="true" />
            <input
              type="text"
              className="styles-search-input"
              placeholder="Filter by name or goal..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Filter training styles"
            />
          </div>
        </div>

        {/* Styles Grid */}
        <section className="styles-grid-section" aria-label="Training Styles Grid">
          {filteredStyles.length > 0 ? (
            <div className="training-styles-grid">
              {filteredStyles.map((style) => (
                <TrainingStyleCard
                  key={style.id}
                  style={style}
                  onExplore={(s) => setActiveStyleDetail(s)}
                />
              ))}
            </div>
          ) : (
            <div className="workouts-empty-state">
              <div className="empty-state-icon" aria-hidden="true">
                <SearchX size={32} />
              </div>
              <h3>No matching training styles</h3>
              <p>No disciplines match your search. Try resetting your difficulty filter or search keyword.</p>
              <button
                type="button"
                className="btn-view-workout"
                onClick={() => {
                  setSelectedDifficulty("All");
                  setSearchQuery("");
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>
      </div>

      {/* Training Style Educational Modal */}
      {activeStyleDetail && (
        <TrainingStyleDetails
          style={activeStyleDetail}
          onClose={() => setActiveStyleDetail(null)}
        />
      )}
    </div>
  );
};
