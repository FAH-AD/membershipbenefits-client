import React, { useState, useRef } from 'react';
import { post } from '../services/ApiEndpoint';
import { CircleDollarSign, LayoutDashboard, RefreshCcw, TrendingUp, Zap, LifeBuoy, Mic, PenTool, Video, ImagePlus, ShieldCheck, ClipboardCheck } from 'lucide-react';
import './Welcome.css';
import { Link } from "react-router-dom"
import RegistrationLoading from '../components/RegistrationLoading';

export default function WelcomeScriptTimer() {
  const [success, setSuccess] = useState(false);
  const firstNameRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await post('/api/auth/register-script-timer', {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        password: formData.password,
        role: 'freelancer'
      });

      if (response.status === 201) {
        setSuccess(true);
      }
    } catch (err) {
      console.error('Registration failed:', err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFocusForm = (e) => {
    e.preventDefault();
    document.getElementById('regForm').scrollIntoView({ behavior: 'smooth' });
    if (firstNameRef.current) firstNameRef.current.focus();
  };

  return (
    <div className="welcome-theme-wrapper script-timer-theme" style={{ '--green-primary': '#06b6d4', '--green-glow': 'rgba(6, 182, 212, 0.15)', '--green-dark': '#0891b2', '--border-green': 'rgba(6, 182, 212, 0.25)' }}>
      {loading && <RegistrationLoading color="#06b6d4" />}
      <div className="container">
        {/* NAV */}
        <nav>
          <Link to="/" className="header-logo">
            <img
              src="/mbc-logo.webp"
              alt="MembershipBenefits.club"
            />
          </Link>
          <div className="nav-badge" style={{ color: '#06b6d4', borderColor: 'rgba(6, 182, 212, 0.3)', background: 'rgba(6, 182, 212, 0.1)' }}>✦ Script Timer Access</div>
        </nav>

        {/* HERO */}
        <section className="hero">

          <div className="container">
            {/* REGISTRATION FORM */}
            <section className="reg-section">
              <div className="reg-card" style={{ boxShadow: '0 50px 100px -20px rgba(0, 0, 0, 0.8), 0 0 40px rgba(6, 182, 212, 0.2)' }}>
                {!success ? (
                  <div id="formArea">
                    <div className="reg-header">
                      <h2>🎉 Activate Your Portal Access</h2>
                      <p>Enter your details to link your Script Timer account and get instant access.</p>
                    </div>
                    <form id="regForm" className="form-grid" onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" name="firstName" placeholder="Jane" required ref={firstNameRef} value={formData.firstName} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" name="lastName" placeholder="Doe" required value={formData.lastName} onChange={handleChange} />
                      </div>
                      <div className="form-group full">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" name="email" placeholder="jane@example.com" required value={formData.email} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-wrapper">
                          <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            placeholder="••••••••"
                            required
                            minLength="8"
                            value={formData.password}
                            onChange={handleChange}
                          />
                          <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? (
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                            ) : (
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <div className="password-wrapper">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="••••••••"
                            required
                            minLength="8"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                          />
                          <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                          >
                            {showConfirmPassword ? (
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                            ) : (
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                            )}
                          </button>
                        </div>
                      </div>

                      {error && (
                        <div className="form-error" style={{ color: '#ff4d4d', fontSize: '0.9rem', gridColumn: 'span 2', marginTop: '10px', textAlign: 'center' }}>
                          {error}
                          {error.toLowerCase().includes('already exist') && (
                            <div style={{ marginTop: '10px' }}>
                              <a href="/login" style={{ color: 'var(--green-primary, #06b6d4)', textDecoration: 'underline', fontWeight: 'bold' }}>Login here</a>
                            </div>
                          )}
                        </div>
                      )}

                      <button type="submit" className="submit-btn cta-btn" style={{ background: '#06b6d4' }} disabled={loading}>
                        {loading ? (
                          <>
                            <span className="btn-loader"></span>
                            Activating...
                          </>
                        ) : 'Activate My Portal →'}
                      </button>
                      <div className="form-note">Your info is only used to set up your portal. No spam, ever.</div>
                    </form>
                  </div>
                ) : (
                  <div id="successArea" className="success-message show">
                    <div className="success-icon" style={{ background: 'rgba(6, 182, 212, 0.15)' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h3>You're all set! 🚀</h3>
                    <p>Welcome to the club. Your account is active and verified. Please check your email to get access to 400+ deals. <br />The email may take a minute to arrive, we appreciate your patience.</p>
                  </div>
                )}
              </div>
            </section>
          </div>
          <div className="hero-badge" style={{ color: '#06b6d4', borderColor: 'rgba(6, 182, 212, 0.3)', background: 'rgba(6, 182, 212, 0.1)' }}>
            <span className="check" style={{ background: '#06b6d4' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            Script Timer Member Verified
          </div>
          <h1>Welcome to the club!</h1>
          <p>
            As a <b>Script Timer</b> member, you've unlocked free access to our portal with 400+ tool deals. Register below to go live instantly.
          </p>
        </section>

        {/* SAVINGS TICKER */}
        <section className="ticker-section">
          <div className="section-label" style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(1.4rem,3vw,1.8rem)", fontWeight: 800, letterSpacing: "-0.02em", textTransform: "none", color: "#06b6d4", marginBottom: "24px", textAlign: "center" }}>
            Your premium benefits are ready.
          </div>
          <div className="ticker">
            <div className="ticker-item">
              <div className="ticker-number" style={{ color: '#06b6d4' }}>$20,000+</div>
              <div className="ticker-label">In Annual Savings</div>
            </div>
            <div className="ticker-divider"></div>
            <div className="ticker-item">
              <div className="ticker-number" style={{ color: '#06b6d4' }}>400+</div>
              <div className="ticker-label">Tool Deals</div>
            </div>
            <div className="ticker-divider"></div>
            <div className="ticker-item">
              <div className="ticker-number" style={{ color: '#06b6d4' }}>30–80%</div>
              <div className="ticker-label">Off Retail</div>
            </div>
          </div>
        </section>
      </div>

      {/* HIGHLIGHTED ZONE */}
      <div className="highlight-zone" style={{ borderTopColor: '#06b6d4', borderBottomColor: '#06b6d4' }}>

      </div>

      <div className="container">
        {/* BENEFITS */}
        <section className="benefits-section">
          <div className="section-label" style={{ color: '#06b6d4' }}>What You Get</div>
          <h2 className="section-title">Everything included in your membership</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon" style={{ background: 'rgba(6, 182, 212, 0.1)' }}><CircleDollarSign size={24} color="#06b6d4" /></div>
              <h3>Instant Savings</h3>
              <p>Access 400+ exclusive deals the moment you register. Most members save more than their fee on day one.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon" style={{ background: 'rgba(6, 182, 212, 0.1)' }}><LayoutDashboard size={24} color="#06b6d4" /></div>
              <h3>Your Custom Portal</h3>
              <p>A private deals page tailored for you. Tap and save anytime on anywhere.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon" style={{ background: 'rgba(6, 182, 212, 0.1)' }}><RefreshCcw size={24} color="#06b6d4" /></div>
              <h3>New Deals Monthly</h3>
              <p>We negotiate fresh discounts every month. Your portal updates automatically.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon" style={{ background: 'rgba(6, 182, 212, 0.1)' }}><TrendingUp size={24} color="#06b6d4" /></div>
              <h3>More Savings over time</h3>
              <p>Your access grows as we add more valuable partnerships.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon" style={{ background: 'rgba(6, 182, 212, 0.1)' }}><Zap size={24} color="#06b6d4" /></div>
              <h3>Live in Minutes</h3>
              <p>Register above, get your portal link, save it, and start saving today.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon" style={{ background: 'rgba(6, 182, 212, 0.1)' }}><LifeBuoy size={24} color="#06b6d4" /></div>
              <h3>Dedicated Support</h3>
              <p>Questions? We're here via WhatsApp and email. Real humans, real help.</p>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="testimonials-section">
          <div className="section-label" style={{ color: '#06b6d4' }}>Members Love It</div>
          <h2 className="section-title">Hear from our members</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p className="testimonial-text">"I accessed the deals portal on Monday. By Friday, I had saved so much on tools I already use. Best investment I've made."</p>
              <div className="testimonial-author">
                <div className="author-avatar" style={{ background: 'rgba(6, 182, 212, 0.1)', color: '#06b6d4', borderColor: 'rgba(6, 182, 212, 0.3)' }}>A</div>
                <div className="author-info">
                  <div className="name">Alex T.</div>
                  <div className="savings" style={{ color: '#06b6d4' }}>Saved $1,200 in first month</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">"HubSpot alone saved me $800. Then Notion, then Stripe credits… it paid for itself ten times over. No brainer."</p>
              <div className="testimonial-author">
                <div className="author-avatar" style={{ background: 'rgba(6, 182, 212, 0.1)', color: '#06b6d4', borderColor: 'rgba(6, 182, 212, 0.3)' }}>S</div>
                <div className="author-info">
                  <div className="name">Sarah K.</div>
                  <div className="savings" style={{ color: '#06b6d4' }}>Saved $2,800 total</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA FOOTER */}
        <section className="cta-footer">
          <h2>Ready to explore your deals?</h2>
          <p>Register above and your portal goes live instantly.</p>
          <a href="#regForm" onClick={handleFocusForm} className="cta-btn" style={{ background: '#06b6d4' }}>Activate My Portal →</a>
        </section>

        <div className="footer-copy">© {new Date().getFullYear()} MembershipBenefits.club</div>
      </div>
    </div>
  );
}
