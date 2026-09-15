import React, { useState, useEffect } from 'react';
import { Droplet, Bell, Plus } from 'lucide-react';

export const WaterTracker = ({ initialGoal = 3000, initialInterval = 60 }) => {
  const [goal, setGoal] = useState(Number(initialGoal));
  
  // Initialize current amount from localStorage so it persists when closed or refreshed
  const [current, setCurrent] = useState(() => {
    const savedDate = localStorage.getItem('water_date');
    const today = new Date().toDateString();
    if (savedDate === today) {
      const savedAmount = localStorage.getItem('water_current');
      return savedAmount ? Number(savedAmount) : 0;
    }
    return 0;
  });

  const [intervalMinutes, setIntervalMinutes] = useState(Number(initialInterval));
  const [timeLeft, setTimeLeft] = useState(Number(initialInterval) * 60);
  const [reminderActive, setReminderActive] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // Sync with profile changes if any
  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('userFitnessProfile') || '{}');
    if (profile.waterGoal) setGoal(Number(profile.waterGoal));
    if (profile.waterInterval) {
      setIntervalMinutes(Number(profile.waterInterval));
      setTimeLeft(Number(profile.waterInterval) * 60);
    }
  }, []);

  // Save current water intake to localStorage whenever it changes
  useEffect(() => {
    const today = new Date().toDateString();
    localStorage.setItem('water_date', today);
    localStorage.setItem('water_current', current);
  }, [current]);

  // Interval reminder countdown loop
  useEffect(() => {
    let timer;
    if (reminderActive) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setAlertMessage('💧 Hydration Alert: Time to drink water!');
            setTimeout(() => setAlertMessage(''), 8000); // hide alert after 8s
            return intervalMinutes * 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [reminderActive, intervalMinutes]);

  const addWater = (amount) => {
    setCurrent((prev) => Math.min(goal, prev + amount));
  };

  const formatCountdown = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
  };

  const percentage = Math.min(100, Math.round((current / goal) * 100));

  return (
    <div style={{
      background: '#18181b', border: '1px solid #27272a', borderRadius: '16px',
      padding: '24px', color: '#fff', maxWidth: '400px', width: '100%',
      boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)', position: 'relative'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: 'rgba(14, 165, 233, 0.15)', padding: '10px', borderRadius: '12px', color: '#0ea5e9' }}>
            <Droplet size={22} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Water Intake Tracker</h3>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#a1a1aa' }}>Daily hydration goal</p>
          </div>
        </div>

        <button
          onClick={() => setReminderActive(!reminderActive)}
          style={{
            display: 'flex', alignItems: 'center', gap: '5px', padding: '6px 12px',
            borderRadius: '20px', border: 'none', background: reminderActive ? '#0ea5e9' : '#27272a',
            color: '#fff', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '600'
          }}
        >
          <Bell size={13} />
          {reminderActive ? 'Reminder ON' : 'Start Reminders'}
        </button>
      </div>

      {alertMessage && (
        <div style={{
          background: 'rgba(14, 165, 233, 0.2)', border: '1px solid #0ea5e9',
          padding: '10px', borderRadius: '8px', marginBottom: '14px',
          fontSize: '0.85rem', color: '#38bdf8', textAlign: 'center', fontWeight: 'bold'
        }}>
          {alertMessage}
        </div>
      )}

      {/* Progress Info */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
          <span style={{ color: '#a1a1aa' }}>Drank: <strong style={{ color: '#fff' }}>{current} ml</strong> / {goal} ml</span>
          <span style={{ color: '#0ea5e9', fontWeight: 'bold' }}>{percentage}%</span>
        </div>
        <div style={{ width: '100%', height: '8px', background: '#27272a', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ width: `${percentage}%`, height: '100%', background: 'linear-gradient(90deg, #0284c7, #38bdf8)', transition: 'width 0.3s ease' }} />
        </div>
      </div>

      {/* Quick Add Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '16px' }}>
        {[250, 500, 750].map((amt) => (
          <button
            key={amt}
            onClick={() => addWater(amt)}
            style={{
              padding: '10px', borderRadius: '8px', border: '1px solid #27272a',
              background: '#27272a40', color: '#fff', cursor: 'pointer',
              fontWeight: '600', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px'
            }}
          >
            <Plus size={14} /> +{amt}ml
          </button>
        ))}
      </div>

      {/* Timer status if active */}
      {reminderActive && (
        <div style={{ fontSize: '0.8rem', color: '#a1a1aa', textAlign: 'center', background: '#09090b', padding: '8px', borderRadius: '8px', border: '1px solid #27272a' }}>
          Next reminder notification in: <strong style={{ color: '#0ea5e9' }}>{formatCountdown(timeLeft)}</strong>
        </div>
      )}
    </div>
  );
};