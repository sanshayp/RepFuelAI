import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Sun, Moon, Menu, X, Flame, ChevronRight, UserCircle, LogIn, LogOut } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { auth } from '../../firebase';
import '../../styles/components/navbar.css';

export const Navbar = ({ 
  brandName = "RepFuelAI", 
  navLinks = []
}) => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [authActionError, setAuthActionError] = useState('');
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!auth) return undefined;
    return onAuthStateChanged(auth, setUser, (error) => {
      setAuthActionError(error.message || 'Could not check your sign-in status.');
    });
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleSignOut = async () => {
    setAuthActionError('');
    try {
      await signOut(auth);
    } catch (error) {
      setAuthActionError(error.message || 'Could not sign out. Please try again.');
    }
  };

  const isLinkActive = (href) => {
    if (!href) return false;

    const currentHash = typeof window !== 'undefined' ? window.location.hash : '';

    if (href === '/') {
      return pathname === '/' && !currentHash;
    }

    if (href.startsWith('/#')) {
      const targetHash = href.slice(href.indexOf('#'));
      return pathname === '/' && currentHash === targetHash;
    }

    return pathname === href;
  };

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand Wordmark */}
        <Link to="/" className="navbar-brand" aria-label={`${brandName} Home`} onClick={closeMobileMenu}>
          <div className="brand-icon-wrap" aria-hidden="true">
            <Flame size={22} />
          </div>
          <span>RepFuel<span className="brand-accent">AI</span></span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="nav-desktop" aria-label="Main Navigation">
          <ul className="nav-menu-desktop">
            {navLinks.map((link, idx) => {
              const active = isLinkActive(link.href);
              const isHashLink = link.href.includes('#');

              return (
                <li key={idx}>
                  {isHashLink ? (
                    <a
                      href={link.href}
                      className={`nav-link ${active ? 'active' : ''}`}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className={`nav-link ${active ? 'active' : ''}`}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Actions: Theme Toggle + Mobile Toggle */}
        <div className="navbar-actions">
          {/* User Profile */}
          <Link
            to="/profile"
            className={`profile-nav-link ${pathname === '/profile' ? 'active' : ''}`}
            aria-label="Open profile"
            title="Profile"
          >
            <UserCircle size={20} />
            <span>Profile</span>
          </Link>

          {user ? (
            <button
              type="button"
              className="profile-nav-link auth-sign-out"
              onClick={handleSignOut}
              aria-label={`Sign out${user.displayName ? `, ${user.displayName}` : ''}`}
              title={user.displayName || 'Signed in'}
            >
              <LogOut size={19} aria-hidden="true" />
              <span>{user.displayName || 'Signed in'}</span>
            </button>
          ) : (
            <Link
              to="/sign-in"
              className={`profile-nav-link ${pathname === '/sign-in' ? 'active' : ''}`}
              onClick={closeMobileMenu}
              aria-label="Sign in with Google"
            >
              <LogIn size={19} aria-hidden="true" />
              <span>Sign in</span>
            </Link>
          )}

          {/* User-Controlled Theme Toggle */}
          <button 
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button 
            type="button"
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {authActionError && <p className="navbar-auth-error" role="alert">{authActionError}</p>}
      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer" role="dialog" aria-modal="true">
          <ul className="mobile-nav-links">
            {navLinks.map((link, idx) => {
              const active = isLinkActive(link.href);
              const isHashLink = link.href.includes('#');

              return (
                <li key={idx}>
                  {isHashLink ? (
                    <a 
                      href={link.href} 
                      className={`mobile-nav-link ${active ? 'active' : ''}`}
                      onClick={closeMobileMenu}
                    >
                      <span>{link.label}</span>
                      <ChevronRight size={18} opacity={0.6} />
                    </a>
                  ) : (
                    <Link
                      to={link.href} 
                      className={`mobile-nav-link ${active ? 'active' : ''}`}
                      onClick={closeMobileMenu}
                    >
                      <span>{link.label}</span>
                      <ChevronRight size={18} opacity={0.6} />
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="mobile-drawer-footer">
            <Link
              to="/profile"
              className={`mobile-nav-link ${pathname === '/profile' ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              <span><UserCircle size={19} aria-hidden="true" /> Profile</span>
              <ChevronRight size={18} opacity={0.6} />
            </Link>
            {user ? (
              <button
                type="button"
                className="mobile-nav-link mobile-sign-out"
                onClick={handleSignOut}
                aria-label={`Sign out${user.displayName ? `, ${user.displayName}` : ''}`}
              >
                <span><LogOut size={19} aria-hidden="true" /> Sign out</span>
                <ChevronRight size={18} opacity={0.6} />
              </button>
            ) : (
              <Link
                to="/sign-in"
                className={`mobile-nav-link ${pathname === '/sign-in' ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                <span><LogIn size={19} aria-hidden="true" /> Sign in</span>
                <ChevronRight size={18} opacity={0.6} />
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
