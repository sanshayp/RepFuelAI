import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import '../../styles/components/page-header.css';

export const PageHeader = ({
  badge = "FEATURED PROTOCOLS",
  badgeIcon: BadgeIcon,
  title = "Workouts",
  titleAccent = "",
  subtitle = "Explore science-backed workouts tailored to your fitness goals, experience level, and preferred equipment.",
  currentPage = "Workouts",
  statsPill = null,
  children
}) => {
  return (
    <header className="page-header-section" aria-label={`${title} Header`}>
      <div className="page-header-glow" aria-hidden="true" />
      <div className="page-header-container">
        {/* Breadcrumb Navigation */}
        <nav className="page-header-breadcrumbs" aria-label="Breadcrumbs">
          <Link to="/" className="breadcrumb-link">
            <ArrowLeft size={14} />
            <span>Home</span>
          </Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{currentPage}</span>
        </nav>

        {/* Badge */}
        <div className="page-header-badge">
          {BadgeIcon && <BadgeIcon size={14} aria-hidden="true" />}
          <span>{badge}</span>
        </div>

        {/* Title */}
        <h1 className="page-header-title">
          {title} {titleAccent && <span className="title-accent">{titleAccent}</span>}
        </h1>

        {/* Subtitle */}
        <p className="page-header-subtitle">{subtitle}</p>

        {/* Optional Meta Tags or Children */}
        {statsPill && (
          <div className="page-header-meta">
            <div className="header-meta-pill">
              <span className="meta-dot" aria-hidden="true" />
              <span>{statsPill}</span>
            </div>
            {children}
          </div>
        )}
      </div>
    </header>
  );
};
