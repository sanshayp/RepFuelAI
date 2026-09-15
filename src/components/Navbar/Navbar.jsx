import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, Flame, ArrowRight, ChevronRight, Settings } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import '../../styles/components/navbar.css';

export const Navbar = ({ 
  brandName = "RepFuelAI", 
  navLinks = [], 
  ctaText = "Explore Workouts", 
  ctaLink = "/workouts",
  onOpenOnboarding
}) => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
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

        {/* Actions: Onboarding Button + Theme Toggle + CTA Button + Mobile Toggle */}
        <div className="navbar-actions">
          {/* Re-open Fitness Questionnaire Button */}
          {onOpenOnboarding && (
            <button
              type="button"
              className="onboarding-reopen-btn"
              onClick={onOpenOnboarding}
              aria-label="Open fitness profile setup"
              title="Update your fitness goals & metrics"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '20px',
                border: '1px solid #ff6b00',
                background: 'rgba(255, 107, 0, 0.1)',
                color: '#ff6b00',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: '600'
              }}
            >
              <Settings size={15} />
              <span>Profile</span>
            </button>
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

          {/* Primary Action Button */}
          <Link to={ctaLink} className="navbar-cta-btn">
            <span>{ctaText}</span>
            <ArrowRight size={16} />
          </Link>

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
            {onOpenOnboarding && (
              <button
                type="button"
                onClick={() => {
                  closeMobileMenu();
                  onOpenOnboarding();
                }}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ff6b00',
                  background: 'rgba(255, 107, 0, 0.1)',
                  color: '#ff6b00',
                  fontWeight: 'bold',
                  marginBottom: '10px',
                  cursor: 'pointer'
                }}
              >
                ⚙️ Fitness Profile Setup
              </button>
            )}
            <Link 
              to={ctaLink} 
              className="mobile-cta-btn"
              onClick={closeMobileMenu}
            >
              {ctaText}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};