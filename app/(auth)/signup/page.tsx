'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image' 

const Signup: React.FC = () => {
  return (
    <div className="auth-container">
      {/* Left Panel – Signup Form */}
      <div className="auth-left">
        <div className="auth-left-inner">
          {/* Logo */}
          <div className="logo-row">
            <Image width={100} height={100} src="/logo.png" alt="Zengwa Logo" />
            <span className="logo-text">Zengwa Mission Connect</span>
          </div>

          {/* Heading */}
          <div className="auth-heading">
            <h1>Join the mission 🌱</h1>
            <p>Create an account to donate, sponsor a child, or volunteer with us.</p>
          </div>

          {/* Signup Form */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              // Add your signup logic here
              console.log('Signup form submitted');
            }}
          >
            <div className="name-row">
              <div className="field-group">
                <label>First Name</label>
                <div className="field-input">
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                  <input type="text" placeholder="John" className="flex-1 bg-transparent outline-none" />
                </div>
              </div>
              <div className="field-group">
                <label>Last Name</label>
                <div className="field-input">
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                  <input type="text" placeholder="Mwangi" className="flex-1 bg-transparent outline-none" />
                </div>
              </div>
            </div>

            <div className="field-group">
              <label>Email Address</label>
              <div className="field-input">
                <span className="icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                  </svg>
                </span>
                <input type="email" placeholder="you@example.com" className="flex-1 bg-transparent outline-none" />
              </div>
            </div>

            <div className="field-group">
              <label>Phone Number</label>
              <div className="field-input">
                <span className="icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
                  </svg>
                </span>
                <input type="tel" placeholder="+254 700 000 000" className="flex-1 bg-transparent outline-none" />
              </div>
            </div>

            <div className="field-group">
              <label>Password</label>
              <div className="field-input">
                <span className="icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input type="password" placeholder="Create a strong password" className="flex-1 bg-transparent outline-none" />
                <span className="icon-end">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </span>
              </div>
            </div>

            <div className="terms-row">
              <div className="check">✓</div>
              <span className="terms-text">
                I agree to the <a href="/terms-of-service">Terms of Service</a> and <a href="/privacy-policy">Privacy Policy</a>
              </span>
            </div>

            <button type="submit" className="btn-primary">Create My Account</button>

            <div className="auth-footer">
              <span>Already have an account?</span>
              <Link href="/login">Sign in here</Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right Panel – Branding */}
      <BrandingPanel />
    </div>
  );
};

// Branding Panel (same as in Login, can be extracted to a shared file)
const BrandingPanel: React.FC = () => (
  <div className="auth-right">
    <img
      src="https://storage.googleapis.com/banani-generated-images/generated-images/161f85d8-8e74-4726-a6b9-928f4a60713f.jpg"
      alt="African children in school uniforms smiling in a classroom"
      loading="lazy"
    />
    <div className="overlay" />
    <div className="content">
      <div className="brand-top">
        <div className="brand-header">
          <div className="brand-icon">
            <div className="brand-icon">
              <Image src="/logo.png" alt="zengwa logo" width={50} height={50} />
            </div>
          </div>
          <div>
            <div className="brand-name">Zengwa Mission</div>
            <div className="brand-sub">Christian Education Centre</div>
          </div>
        </div>
        <p className="brand-tagline">Transforming lives through faith, education, and community empowerment across Africa.</p>
      </div>

      <div className="brand-bottom">
        <div className="impact-card">
          <div className="impact-label">Our Impact</div>
          <div className="impact-grid">
            <div className="impact-stat">
              <div className="stat-number">1,240+</div>
              <div className="stat-label">Children Supported</div>
            </div>
            <div className="impact-stat">
              <div className="stat-number">38</div>
              <div className="stat-label">Active Projects</div>
            </div>
            <div className="impact-stat">
              <div className="stat-number">6,800+</div>
              <div className="stat-label">Lives Impacted</div>
            </div>
            <div className="impact-stat">
              <div className="stat-number">12</div>
              <div className="stat-label">Communities Served</div>
            </div>
          </div>
        </div>
        <div className="brand-copy">© {new Date().getFullYear()} Zengwa Christian Education Centre</div>
      </div>
    </div>
  </div>
);

export default Signup;