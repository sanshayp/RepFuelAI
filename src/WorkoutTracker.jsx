import React, { useState } from 'react';

export const WorkoutTracker = ({ activeWorkout }) => {
  const [completed, setCompleted] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);

  // Use the passed activeWorkout data, or fall back to a default if none provided
  const workoutData = activeWorkout || {
    name: 'Thoracic Mobility & Deep Flow',
    exercises: [
      { name: 'Cat-Cow Segmental Articulation', rest: 30 },
      { name: "World's Greatest Stretch", rest: 45 },
      { name: '90/90 Hip Rotations', rest: 30 },
      { name: 'Thread the Needle', rest: 30 }
    ]
  };

  const routine = workoutData.exercises || [];

  const toggleCheck = (idx) => {
    setCompleted(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const startTimer = (secs) => {
    setTimeLeft(secs);
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const total = routine.length;
  const doneCount = Object.values(completed).filter(Boolean).length;
  const progressPercent = total > 0 ? Math.round((doneCount / total) * 100) : 0;

  return (
    <div style={{ background: '#1e1e1e', padding: '24px', borderRadius: '16px', border: '1px solid #333', color: '#fff' }}>
      <h3 style={{ margin: '0 0 10px 0', fontSize: '1.25rem' }}>🏋️ {workoutData.name}</h3>
      
      <div style={{ background: '#333', height: '8px', borderRadius: '4px', margin: '15px 0', overflow: 'hidden' }}>
        <div style={{ width: `${progressPercent}%`, background: '#ff6b00', height: '100%', borderRadius: '4px', transition: 'width 0.3s' }}></div>
      </div>
      <p style={{ fontSize: '0.85rem', marginBottom: '20px', color: '#a1a1aa' }}>Progress: <strong style={{ color: '#fff' }}>{progressPercent}%</strong></p>

      {routine.length > 0 ? (
        routine.map((ex, i) => {
          // Parse rest seconds safely (handles strings like "30s" or numbers like 30)
          const restSecs = typeof ex.rest === 'string' ? parseInt(ex.rest) || 30 : ex.rest;

          return (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #2a2a2a' }}>
              <label style={{ textDecoration: completed[i] ? 'line-through' : 'none', opacity: completed[i] ? 0.6 : 1, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="checkbox" checked={!!completed[i]} onChange={() => toggleCheck(i)} style={{ width: '16px', height: '16px', accentColor: '#ff6b00', cursor: 'pointer' }} />
                <span>{ex.name} {ex.sets && ex.reps ? `(${ex.sets} sets × ${ex.reps})` : ''}</span>
              </label>
              <button onClick={() => startTimer(restSecs)} style={{ background: '#2a2a2a', color: '#fff', border: 'none', borderRadius: '6px', padding: '6px 12px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '600' }}>
                ⏱️ Rest ({restSecs}s)
              </button>
            </div>
          );
        })
      ) : (
        <p style={{ color: '#a1a1aa', textAlign: 'center', padding: '20px 0' }}>No exercises found for this routine.</p>
      )}

      {timeLeft !== null && (
        <div style={{ marginTop: '20px', padding: '12px', background: '#ff6b00', color: '#fff', textAlign: 'center', borderRadius: '8px', fontWeight: 'bold' }}>
          Resting: {timeLeft}s ⏳
        </div>
      )}
    </div>
  );
};