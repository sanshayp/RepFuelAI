import React, { useState } from 'react';

export const GoalQuiz = () => {
  const [goal, setGoal] = useState('');

  const recommendations = {
    muscle: { title: 'Hypertrophy Training', desc: 'Focus on 8–12 rep ranges with moderate rest times to maximize hypertrophy.' },
    fatloss: { title: 'HIIT & Circuit Training', desc: 'Combine intense cardio bursts with active rest to burn maximum calories.' },
    strength: { title: 'Heavy Compound Lifting', desc: 'Stick to lower rep ranges (3–5 reps) with heavy resistance and longer rest.' }
  };

  return (
    <div style={{ background: '#ff6b0015', border: '1px solid #ff6b00', padding: '20px', borderRadius: '12px', marginBottom: '30px' }}>
      <h3 style={{ margin: '0 0 10px 0' }}>🎯 Find Your Discipline</h3>
      <p style={{ margin: '0 0 15px 0', fontSize: '0.9rem' }}>Select your primary goal to get an instant recommended regimen:</p>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={() => setGoal('muscle')} style={{ padding: '8px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer', background: goal === 'muscle' ? '#ff6b00' : '#333', color: '#fff' }}>Build Muscle</button>
        <button onClick={() => setGoal('fatloss')} style={{ padding: '8px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer', background: goal === 'fatloss' ? '#ff6b00' : '#333', color: '#fff' }}>Fat Loss</button>
        <button onClick={() => setGoal('strength')} style={{ padding: '8px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer', background: goal === 'strength' ? '#ff6b00' : '#333', color: '#fff' }}>Raw Strength</button>
      </div>

      {goal && (
        <div style={{ marginTop: '15px', padding: '12px', background: '#ffffff10', borderRadius: '8px' }}>
          <h4 style={{ margin: '0 0 5px 0', color: '#ff6b00' }}>Recommended: {recommendations[goal].title}</h4>
          <p style={{ margin: 0, fontSize: '0.85rem' }}>{recommendations[goal].desc}</p>
        </div>
      )}
    </div>
  );
};