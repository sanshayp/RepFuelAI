import React, { useState, useMemo } from 'react';
import { TrendingUp, TrendingDown, Award, AlertTriangle, Calendar, Info, Footprints } from 'lucide-react';
import { calculateProgressStats } from '../../utils/progressUtils';
import { useNutritionProgress } from '../../context/NutritionProgressContext';

export const WeeklyGraph = () => {
  const { weeklyHistory } = useNutritionProgress();
  const [hoveredNode, setHoveredNode] = useState(null);

  // SVG Chart Geometry Constants
  const width = 760;
  const height = 260;
  const paddingX = 50;
  const paddingY = 40;
  const graphWidth = width - paddingX * 2;
  const graphHeight = height - paddingY * 2;

  // Compute calculated points
  const chartPoints = useMemo(() => {
    if (!weeklyHistory || weeklyHistory.length === 0) return [];
    const count = weeklyHistory.length;
    const step = graphWidth / (count - 1);

    return weeklyHistory.map((item, index) => {
      const x = paddingX + index * step;
      // Score ranges 0 - 100
      const score = Math.max(0, Math.min(100, item.score));
      const y = height - paddingY - (score / 100) * graphHeight;

      // Delta calculation vs previous day
      const prev = index > 0 ? weeklyHistory[index - 1].score : item.score;
      const delta = item.score - prev;

      return {
        ...item,
        x,
        y,
        delta,
        index,
      };
    });
  }, [weeklyHistory, graphWidth, graphHeight, height, paddingX, paddingY]);

  // Compute SVG Path string
  const pathD = useMemo(() => {
    if (chartPoints.length === 0) return '';
    return chartPoints.reduce((acc, pt, idx) => {
      return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
    }, '');
  }, [chartPoints]);

  // Compute Area Fill Path
  const areaD = useMemo(() => {
    if (chartPoints.length === 0) return '';
    const first = chartPoints[0];
    const last = chartPoints[chartPoints.length - 1];
    const baseline = height - paddingY;
    return `${pathD} L ${last.x} ${baseline} L ${first.x} ${baseline} Z`;
  }, [chartPoints, pathD, height, paddingY]);

  // Calculate Progress Stats
  const stats = useMemo(() => {
    const formatted = weeklyHistory.map((h) => ({ day: h.day, value: h.score }));
    return calculateProgressStats(formatted);
  }, [weeklyHistory]);

  return (
    <div className="weekly-graph-card">
      <div className="weekly-graph-header">
        <div>
          <h3>Weekly Performance &amp; Consistency Graph</h3>
          <p>
            Dynamically tracks fitness adherence, step volume, and fuel precision. Visualizes performance breakthroughs, dips, and flat days from actual data.
          </p>
        </div>

        <div className="graph-legend">
          <div className="legend-item">
            <span className="legend-dot increase" />
            <span>Increase / Peak</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot decrease" />
            <span>Decrease / Dip</span>
          </div>
        </div>
      </div>

      {/* SVG Responsive Graph */}
      <div className="svg-chart-wrapper">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="svg-chart"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Weekly performance line chart"
        >
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF5E1E" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#FF5E1E" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="strokeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF8A00" />
              <stop offset="100%" stopColor="#FF5E1E" />
            </linearGradient>
          </defs>

          {/* Horizontal Reference Lines (25%, 50%, 75%, 100%) */}
          {[25, 50, 75, 100].map((level) => {
            const y = height - paddingY - (level / 100) * graphHeight;
            return (
              <g key={level}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  className="chart-grid-line"
                />
                <text x={paddingX - 10} y={y + 4} textAnchor="end" className="chart-axis-label">
                  {level}%
                </text>
              </g>
            );
          })}

          {/* Baseline */}
          <line
            x1={paddingX}
            y1={height - paddingY}
            x2={width - paddingX}
            y2={height - paddingY}
            stroke="var(--glass-border)"
            strokeWidth="1.5"
          />

          {/* Area Fill */}
          {areaD && <path d={areaD} fill="url(#areaGradient)" />}

          {/* Main Trend Line */}
          {pathD && (
            <path
              d={pathD}
              fill="none"
              stroke="url(#strokeGradient)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Data Points & Rise/Fall Indicators */}
          {chartPoints.map((pt) => {
            const isUp = pt.delta >= 0;
            const nodeColor = isUp ? 'var(--volt-green)' : '#EF4444';
            const isHovered = hoveredNode?.day === pt.day;

            return (
              <g
                key={pt.day}
                tabIndex={0}
                role="button"
                aria-label={`${pt.day}: ${pt.score}%`}
                onMouseEnter={() => setHoveredNode(pt)}
                onMouseLeave={() => setHoveredNode(null)}
                onFocus={() => setHoveredNode(pt)}
                onBlur={() => setHoveredNode(null)}
              >
                {/* Day Label below axis */}
                <text
                  x={pt.x}
                  y={height - paddingY + 22}
                  textAnchor="middle"
                  className="chart-axis-label"
                  style={{ fontWeight: isHovered ? '800' : '600', fill: isHovered ? 'var(--text-primary)' : 'var(--text-muted)' }}
                >
                  {pt.day}
                </text>

                {/* Vertical Drop Line on Hover */}
                {isHovered && (
                  <line
                    x1={pt.x}
                    y1={pt.y}
                    x2={pt.x}
                    y2={height - paddingY}
                    stroke="var(--accent-primary)"
                    strokeDasharray="2 2"
                    strokeWidth="1.5"
                  />
                )}

                {/* Data Node Point */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 7 : 5}
                  fill={nodeColor}
                  stroke="var(--bg-primary)"
                  strokeWidth="2.5"
                  className="chart-data-node"
                />

                {/* Score Text above point */}
                <text
                  x={pt.x}
                  y={pt.y - 12}
                  textAnchor="middle"
                  fill="var(--text-primary)"
                  fontSize="12"
                  fontWeight="700"
                  fontFamily="var(--font-display)"
                >
                  {pt.score}%
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Hover Tooltip Details Banner if Active */}
      {hoveredNode && (
        <div
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--accent-primary)',
            borderRadius: 'var(--radius-md)',
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.85rem',
            animation: 'fadeIn 0.2s ease',
            marginBottom: 'var(--space-4)',
            flexWrap: 'wrap',
            gap: '8px'
          }}
        >
          <div>
            <strong>{hoveredNode.fullDay || hoveredNode.day}:</strong> Score {hoveredNode.score}% ({hoveredNode.delta >= 0 ? `+${hoveredNode.delta}% rise` : `${hoveredNode.delta}% dip`} vs previous day)
            {hoveredNode.hasCheatMeal && (
              <span style={{ color: '#EF4444', marginLeft: 8, fontWeight: 700 }}>
                🍔 Cheat Meal ({hoveredNode.cheatMealName || 'Logged'})
              </span>
            )}
          </div>
          <div style={{ color: 'var(--text-secondary)' }}>
            Fuel: <strong>{hoveredNode.calories} kcal</strong> &bull; Protein: <strong>{hoveredNode.protein}g</strong> &bull; Steps: <strong>{(hoveredNode.steps || 8000).toLocaleString()}</strong> &bull; Workout: {hoveredNode.workoutDone ? 'Done' : 'Rest'}
          </div>
        </div>
      )}

      {/* Days Breakdown Cards Row */}
      <div className="days-breakdown-grid">
        {chartPoints.map((pt) => {
          const isUp = pt.delta >= 0;
          return (
            <div
              key={pt.day}
              className={`day-performance-cell ${hoveredNode?.day === pt.day ? 'highlight' : ''}`}
              onMouseEnter={() => setHoveredNode(pt)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <span className="day-cell-name">{pt.day}</span>
                {pt.hasCheatMeal && <span style={{ fontSize: '0.75rem' }}>🍔</span>}
              </div>
              <span className="day-cell-score">{pt.score}%</span>
              <span className={`day-cell-delta ${isUp ? 'up' : 'down'}`}>
                {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {isUp ? `+${pt.delta}%` : `${pt.delta}%`}
              </span>
            </div>
          );
        })}
      </div>

      {/* Statistics Summary Row */}
      <div className="stats-summary-grid">
        {/* Weekly Average */}
        <div className="stat-metric-card">
          <span className="stat-card-title">Weekly Average</span>
          <span className="stat-card-value">{stats.average}%</span>
          <span className="stat-card-note">Mean adherence score across 7 days</span>
        </div>

        {/* Best Day */}
        <div className="stat-metric-card">
          <span className="stat-card-title">Best Performance</span>
          <span className="stat-card-value" style={{ color: 'var(--volt-green)' }}>
            {stats.bestDay?.day} — {stats.bestDay?.value}%
          </span>
          <span className="stat-card-note">Peak workout, steps &amp; nutrition discipline</span>
        </div>

        {/* Lowest Day */}
        <div className="stat-metric-card">
          <span className="stat-card-title">Lowest Day</span>
          <span className="stat-card-value" style={{ color: '#EF4444' }}>
            {stats.lowestDay?.day} — {stats.lowestDay?.value}%
          </span>
          <span className="stat-card-note">Identifies rest days &amp; missed goals</span>
        </div>

        {/* Weekly Improvement / Recent Change */}
        <div className="stat-metric-card">
          <span className="stat-card-title">Weekly Improvement</span>
          <span
            className="stat-card-value"
            style={{ color: stats.improvement >= 0 ? 'var(--volt-green)' : '#EF4444' }}
          >
            {stats.improvement >= 0 ? `+${stats.improvement}%` : `${stats.improvement}%`}
          </span>
          <span className="stat-card-note">
            Latest day change: {stats.recentChange >= 0 ? `+${stats.recentChange}%` : `${stats.recentChange}%`}
          </span>
        </div>
      </div>
    </div>
  );
};
