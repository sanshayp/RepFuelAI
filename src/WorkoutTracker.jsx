import React, { useState } from 'react';

export const WorkoutTracker = () => {
  const [completed, setCompleted] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);

  const routine = [
    { name: 'Cat-Cow Segmental Articulation', rest: 30 },
    { name: "World's Greatest Stretch", rest: 45 },
    { name: '90/90 Hip Rotations', rest: 30 },
    { name: 'Thread the Needle', rest: 30 }
  ];

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
  const progressPercent = Math.round((doneCount / total) * 100);

  return (
    <div style={{ background: '#1e1e1e', padding: '20px', borderRadius: '12px', border: '1px solid #333' }}>
      <h3>🏋️ Thoracic Mobility & Deep Flow</h3>
      
      <div style={{ background: '#333', height: '8px', borderRadius: '4px', margin: '15px 0' }}>
        <div style={{ width: `${progressPercent}%`, background: '#ff6b00', height: '100%', borderRadius: '4px', transition: 'width 0.3s' }}></div>
      </div>
      <p style={{ fontSize: '0.85rem', marginBottom: '15px' }}>Progress: <strong>{progressPercent}%</strong></p>

      {routine.map((ex, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #2a2a2a' }}>
          <label style={{ textDecoration: completed[i] ? 'line-through' : 'none', opacity: completed[i] ? 0.6 : 1, cursor: 'pointer' }}>
            <input type="checkbox" checked={!!completed[i]} onChange={() => toggleCheck(i)} style={{ marginRight: '10px', accentColor: '#ff6b00' }} />
            {ex.name}
          </label>
          <button onClick={() => startTimer(ex.rest)} style={{ background: '#2a2a2a', color: '#fff', border: 'none', borderRadius: '6px', padding: '5px 10px', cursor: 'pointer', fontSize: '0.8rem' }}>
            ⏱️ Rest ({ex.rest}s)
          </button>
        </div>
      ))}

      {timeLeft !== null && (
        <div style={{ marginTop: '15px', padding: '10px', background: '#ff6b00', color: '#fff', textAlign: 'center', borderRadius: '8px', fontWeight: 'bold' }}>
          Resting: {timeLeft}s ⏳
        </div>
      )}
    </div>
  );
};