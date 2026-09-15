import React from 'react';
import { Link } from 'react-router-dom';
import { UserRound } from 'lucide-react';
import './profile-required.css';

export const ProfileRequired = ({ feature = 'this feature' }) => (
  <section className="profile-required" aria-label="Profile required">
    <div className="profile-required-icon" aria-hidden="true">
      <UserRound size={26} />
    </div>
    <div>
      <span className="profile-required-kicker">Profile needed</span>
      <h2>Create your profile to use {feature}</h2>
      <p>Add your body details and goal first so your calories and progress are based on your data.</p>
      <Link to="/profile" className="profile-required-link">Set up profile</Link>
    </div>
  </section>
);
