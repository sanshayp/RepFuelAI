import React, { useEffect, useRef, useState } from 'react';
import { Activity, ChevronDown, Pencil, Save, Trash2, UserRound } from 'lucide-react';
import { PageHeader } from '../../components/Common/PageHeader';
import { useNutritionProgress } from '../../context/NutritionProgressContext';
import { safeGetStorage, safeSetStorage } from '../../utils/storageUtils';
import { calculateBmr, calculateGoalCalories, emptyProfile, PROFILE_STORAGE_KEY } from '../../utils/profileUtils';
import './profile-page.css';

const ProfileSelect = ({ name, value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  const selectedOption = options.find((option) => option.value === value) || options[0];

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div className="profile-select-wrap" ref={selectRef}>
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        className="profile-select-trigger"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span>{selectedOption.label}</span>
        <ChevronDown size={17} aria-hidden="true" />
      </button>
      {isOpen && (
        <div className="profile-select-menu" role="listbox" aria-label={name}>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={option.value === value}
              className={`profile-select-option ${option.value === value ? 'selected' : ''}`}
              onClick={() => {
                onChange({ target: { name, value: option.value } });
                setIsOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const ProfilePage = () => {
  const { setDailyCalorieTarget, clearUserData } = useNutritionProgress();
  const [profile, setProfile] = useState(() => ({ ...emptyProfile, ...safeGetStorage(PROFILE_STORAGE_KEY, emptyProfile) }));
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(() => !safeGetStorage(PROFILE_STORAGE_KEY, emptyProfile).bmr);
  const maintenanceCalories = profile.bmr ? Math.round(profile.bmr * 1.2) : null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile((currentProfile) => ({ ...currentProfile, [name]: value }));
    setError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const age = Number(profile.age);
    const height = Number(profile.height);
    const weight = Number(profile.weight);

    if (!profile.name.trim() || !age || !height || !weight || age <= 0 || height <= 0 || weight <= 0) {
      setError('Enter your name and valid age, height, and weight values.');
      return;
    }

    const updatedProfile = {
      ...profile,
      name: profile.name.trim(),
      age,
      height,
      weight,
      goal: profile.goal,
      bmr: calculateBmr({ age, height, weight, gender: profile.gender }),
      calorieTarget: calculateGoalCalories(
        calculateBmr({ age, height, weight, gender: profile.gender }),
        profile.goal
      )
    };

    setProfile(updatedProfile);
    safeSetStorage(PROFILE_STORAGE_KEY, updatedProfile);
    setDailyCalorieTarget(updatedProfile.calorieTarget);
    setError('');
    setIsEditing(false);
  };

  const handleDelete = () => {
    window.localStorage.removeItem(PROFILE_STORAGE_KEY);
    setProfile(emptyProfile);
    clearUserData();
    setError('');
    setIsEditing(true);
  };

  return (
    <div className="profile-page">
      <PageHeader
        badge="PERSONAL PROFILE"
        badgeIcon={UserRound}
        title="Your Profile"
        titleAccent="& Metabolism"
        subtitle="Keep your body metrics in one place and get a practical estimate of your daily basal metabolic rate."
        currentPage="Profile"
      />

      <main className="profile-content">
        <section className="profile-card" aria-label={isEditing ? 'Personal profile form' : 'Saved personal profile'}>
          <div className="profile-card-heading">
            <div className="profile-icon-box" aria-hidden="true">
              <UserRound size={24} />
            </div>
            <div>
              <span className="profile-card-kicker">Personal details</span>
              <h2>{isEditing ? 'Tell us about you' : profile.name}</h2>
            </div>
          </div>

          {isEditing ? (
            <form className="profile-form" onSubmit={handleSubmit}>
            <label className="profile-field profile-field-wide">
              <span>Name</span>
              <input name="name" type="text" value={profile.name} onChange={handleChange} placeholder="Your name" required />
            </label>

            <label className="profile-field">
              <span>Age <small>(years)</small></span>
              <input name="age" type="number" min="1" max="120" value={profile.age} onChange={handleChange} placeholder="e.g. 28" required />
            </label>

            <label className="profile-field">
              <span>Gender</span>
              <ProfileSelect
                name="gender"
                value={profile.gender}
                onChange={handleChange}
                options={[{ value: 'female', label: 'Female' }, { value: 'male', label: 'Male' }]}
              />
            </label>

            <label className="profile-field">
              <span>Primary goal</span>
              <ProfileSelect
                name="goal"
                value={profile.goal}
                onChange={handleChange}
                options={[
                  { value: 'lose', label: 'Lose weight' },
                  { value: 'maintain', label: 'Maintain weight' },
                  { value: 'gain', label: 'Gain weight' }
                ]}
              />
            </label>

            <label className="profile-field">
              <span>Height <small>(cm)</small></span>
              <input name="height" type="number" min="50" max="300" step="0.1" value={profile.height} onChange={handleChange} placeholder="e.g. 170" required />
            </label>

            <label className="profile-field">
              <span>Weight <small>(kg)</small></span>
              <input name="weight" type="number" min="10" max="500" step="0.1" value={profile.weight} onChange={handleChange} placeholder="e.g. 65" required />
            </label>

            {error && <p className="profile-error" role="alert">{error}</p>}

            <button type="submit" className="profile-save-button">
              <Save size={17} aria-hidden="true" />
              Save Profile
            </button>
            </form>
          ) : (
            <div className="profile-summary">
              <div className="profile-summary-grid">
                <div><span>Age</span><strong>{profile.age} years</strong></div>
                <div><span>Gender</span><strong>{profile.gender}</strong></div>
                <div><span>Height</span><strong>{profile.height} cm</strong></div>
                <div><span>Weight</span><strong>{profile.weight} kg</strong></div>
                <div><span>Goal</span><strong>{profile.goal === 'gain' ? 'Gain weight' : profile.goal === 'maintain' ? 'Maintain weight' : 'Lose weight'}</strong></div>
              </div>
              <button type="button" className="profile-edit-button" onClick={() => setIsEditing(true)}>
                <Pencil size={16} aria-hidden="true" />
                Edit Profile
              </button>
            </div>
          )}
        </section>

        <aside className="bmr-card" aria-live="polite">
          <div className="bmr-card-top">
            <div className="bmr-icon-box" aria-hidden="true">
              <Activity size={23} />
            </div>
            <span className="profile-card-kicker">Your estimate</span>
          </div>
          <h2>Daily Calorie Target</h2>
          <p>Your recommended daily calories based on your BMR, estimated maintenance, and selected weight goal.</p>
          <div className="bmr-value">
            <strong>{profile.calorieTarget ? profile.calorieTarget.toLocaleString() : '--'}</strong>
            <span>kcal / day</span>
          </div>
          <small className="bmr-method-note">BMR: {profile.bmr ? `${profile.bmr.toLocaleString()} kcal / day` : '--'} · Calculated with the Mifflin-St Jeor equation.</small>
          {profile.calorieTarget && (
            <div className="bmr-goal-note">
              <span>Estimated maintenance: {maintenanceCalories.toLocaleString()} kcal / day</span>
              <span>{profile.goal === 'gain' ? '300 kcal surplus' : profile.goal === 'maintain' ? 'No calorie adjustment' : '300 kcal deficit'} for your goal</span>
            </div>
          )}
        </aside>

        <section className="profile-delete-section" aria-label="Delete profile">
          <div>
            <span className="profile-card-kicker">Profile management</span>
            <h2>Delete profile data</h2>
            <p>Remove your saved details and BMR from this device. You can enter them again whenever you are ready.</p>
          </div>
          <button type="button" className="profile-delete-button" onClick={handleDelete}>
            <Trash2 size={17} aria-hidden="true" />
            Delete Profile
          </button>
        </section>
      </main>
    </div>
  );
};
