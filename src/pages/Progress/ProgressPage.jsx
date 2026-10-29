import React from 'react';
import { TrendingUp } from 'lucide-react';
import { PageHeader } from '../../components/Common/PageHeader';
import { ProgressTracker } from '../../components/ProgressTracker/ProgressTracker';

export const ProgressPage = () => {
  return (
    <div className="progress-page-container">
      <PageHeader
        badge="ATHLETE PROGRESS & XP"
        badgeIcon={TrendingUp}
        title="Weekly"
        titleAccent="Performance"
        subtitle="Preview consistency trends, weekly charts, and athlete XP achievements with sample progress already filled in."
        currentPage="Progress"
        statsPill="Experimental Live Tracker"
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        <ProgressTracker />
      </div>
    </div>
  );
};

export default ProgressPage;
