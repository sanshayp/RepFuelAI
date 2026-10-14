import { useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { GoogleLogin } from '../../GoogleLogin';
import { PageHeader } from '../../components/Common/PageHeader';
import './profile-page.css';

export const SignInPage = ({ authError = '' }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    const destination = location.state?.from || '/profile';
    navigate(destination, { replace: true });
  };

  return (
    <div className="profile-page">
      <PageHeader
        badge="WELCOME TO REPFUELAI"
        badgeIcon={ShieldCheck}
        title="Sign in to"
        titleAccent="your training"
        subtitle="Use your Google account to access your profile, nutrition, and progress."
        currentPage="Sign in"
      />

      <main className="auth-content">
        <section className="auth-card" aria-labelledby="auth-heading">
          <span className="profile-card-kicker">GOOGLE ACCOUNT</span>
          <h2 id="auth-heading">Continue to RepFuelAI</h2>
          <p>Any Google account can sign in. Your profile and tracking data continue to be stored in this browser.</p>
          {authError && <p className="profile-error" role="alert">{authError}</p>}
          <GoogleLogin onLoginSuccess={handleLoginSuccess} />
        </section>
      </main>
    </div>
  );
};
