import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { GoogleLogin } from '../../GoogleLogin';
import { isFirebaseConfigured } from '../../firebase';
import './profile-page.css';

export const SignInPage = ({ authError = '' }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    const destination = location.state?.from || '/profile';
    navigate(destination, { replace: true });
  };

  return (
    <div className="signin-page">
      <div className="signin-glow" aria-hidden="true" />
      <div className="signin-container">
        {/* Breadcrumb Navigation */}
        <nav className="signin-breadcrumbs" aria-label="Breadcrumbs">
          <Link to="/" className="signin-breadcrumb-link">
            <ArrowLeft size={14} aria-hidden="true" />
            <span>Home</span>
          </Link>
          <span className="signin-breadcrumb-sep" aria-hidden="true">/</span>
          <span className="signin-breadcrumb-current">Sign in</span>
        </nav>

        {/* Hero Section */}
        <header className="signin-hero" aria-labelledby="signin-heading">
          <div className="signin-badge">
            <ShieldCheck size={14} aria-hidden="true" />
            <span>WELCOME TO REPFUELAI</span>
          </div>
          <h1 id="signin-heading" className="signin-title">
            Sign in to <span className="title-accent">your training</span>
          </h1>
          <p className="signin-subtitle">
            Use your Google account to access your profile, nutrition, and progress.
          </p>
        </header>

        {/* Centered Sign-in Card */}
        <main className="auth-content">
          <section className="auth-card" aria-labelledby="auth-heading">
            <span className="profile-card-kicker">GOOGLE ACCOUNT</span>
            <h2 id="auth-heading" className="auth-card-title">Continue to RepFuelAI</h2>
            <p className="auth-card-desc">
              Any Google account can sign in. Your profile and tracking data continue to be stored in this browser.
            </p>
            {authError && (
              <p className="profile-error auth-error-banner" role="alert">
                {authError}
              </p>
            )}
            {!isFirebaseConfigured && (
              <p className="profile-error auth-error-banner" role="alert">
                Firebase is not configured. Copy <code>.env.example</code> to <code>.env.local</code> and add your Firebase values.
              </p>
            )}
            <div className="auth-btn-container">
              <GoogleLogin onLoginSuccess={handleLoginSuccess} disabled={!isFirebaseConfigured} />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default SignInPage;
