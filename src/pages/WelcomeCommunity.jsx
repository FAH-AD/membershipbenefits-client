import React, { useState, useRef } from 'react';
import { post } from '../services/ApiEndpoint';
import { CircleDollarSign, LayoutDashboard, RefreshCcw, TrendingUp, Zap, LifeBuoy } from 'lucide-react';
import './Welcome.css';
import RegistrationLoading from '../components/RegistrationLoading';

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse';

export default function WelcomeCommunity() {
  const [success, setSuccess] = useState(false);
  const [regUrl, setRegUrl] = useState('');
  const firstNameRef = useRef(null);

  const [formData, setFormData] = useState({
    communityName: '',
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
      // Direct registration in backend for community
      const response = await post('/api/auth/register-community', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        communityName: formData.communityName
      });

      if (response.status === 201) {
        setSuccess(true);
        setRegUrl(response.data.data.community.registrationUrl);
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
    document.getElementById('regFormCommunity').scrollIntoView({ behavior: 'smooth' });
    if (firstNameRef.current) firstNameRef.current.focus();
  };

  return (
    <div className="welcome-theme-wrapper">
      {loading && <RegistrationLoading color="#22c55e" />}
      <div className="container">
        {/* NAV */}
        <nav>
          <Link to="/" className="header-logo">
            <img
              src="/mbc-logo.webp"
              alt="MembershipBenefits.club"
            />
          </Link>
          <div className="nav-badge">✦ Member Access</div>
        </nav>

        {/* HERO */}
        <section className="hero">
          <div className="hero-badge">
            <span className="check">
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            Payment Confirmed
          </div>
          <h1>Welcome to the club!</h1>
          <p>
            You just unlocked 30–80% off 400+ tools your team already uses. Register below and your personal deals portal goes live instantly.
          </p>
        </section>

        {/* SAVINGS TICKER */}
        <section className="ticker-section">
          <div className="section-label green" style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(1.4rem,3vw,1.8rem)", fontWeight: 800, letterSpacing: "-0.02em", textTransform: "none", color: "var(--green-primary)", marginBottom: "24px", textAlign: "center" }}>
            Start saving today.
          </div>
          <div className="ticker">
            <div className="ticker-item">
              <div className="ticker-number">$22,000+</div>
              <div className="ticker-label">In Annual Savings</div>
            </div>
            <div className="ticker-divider"></div>
            <div className="ticker-item">
              <div className="ticker-number">400+</div>
              <div className="ticker-label">Tool Deals</div>
            </div>
            <div className="ticker-divider"></div>
            <div className="ticker-item">
              <div className="ticker-number">30–80%</div>
              <div className="ticker-label">Off Retail</div>
            </div>
          </div>
        </section>
      </div>

      {/* HIGHLIGHTED ZONE */}
      <div className="highlight-zone">
        <div className="container">
          {/* REGISTRATION FORM */}
          <section className="reg-section">
            <div className="reg-card">
              {!success ? (
                <div id="formArea">
                  <div className="reg-header">
                    <h2>🎉 Activate Your Membership</h2>
                    <p>Enter your details to get instant access to your deals portal.</p>
                  </div>
                  <form id="regFormCommunity" className="form-grid" onSubmit={handleSubmit}>
                    <div className="form-group full">
                      <label htmlFor="communityName">Community Name</label>
                      <input type="text" id="communityName" name="communityName" placeholder="My Awesome Community" required ref={firstNameRef} value={formData.communityName} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <input type="text" id="firstName" name="firstName" placeholder="Jane" required value={formData.firstName} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name</label>
                      <input type="text" id="lastName" name="lastName" placeholder="Doe" required value={formData.lastName} onChange={handleChange} />
                    </div>
                    <div className="form-group full">
                      <label htmlFor="email">Email Address</label>
                      <input type="email" id="email" name="email" placeholder="jane@community.com" required value={formData.email} onChange={handleChange} />
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

                    <button type="submit" className="submit-btn cta-btn" disabled={loading}>
                      {loading ? (
                        <>
                          <span className="btn-loader"></span>
                          Activating...
                        </>
                      ) : 'Activate My Deals Portal →'}
                    </button>
                    <div className="form-note">Your info is only used to set up your portal. No spam, ever.</div>
                  </form>
                </div>
              ) : (
                <div id="successArea" className="success-message show">
                  <div className="success-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3>You're all set! 🚀</h3>
                  <p>Welcome to the club. Your community is registered and your deals portal is live. Please check your email to get access for 400+ deals. <br />The email may take a minute to arrive, we appreciate your patience.</p>
                  <div style={{ marginTop: '30px', padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid var(--border-green)' }}>
                    <p style={{ color: 'var(--green-primary)', fontWeight: '700', marginBottom: '10px' }}>Your Member Invite Link:</p>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <input
                        readOnly
                        value={regUrl}
                        style={{ flex: 1, background: '#000', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px', color: '#fff', fontSize: '0.8rem' }}
                      />
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(regUrl);
                          alert('Link copied to clipboard!');
                        }}
                        style={{ background: 'var(--green-primary)', border: 'none', borderRadius: '8px', padding: '0 15px', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}
                      >
                        Copy
                      </button>
                    </div>
                    <p style={{ marginTop: '15px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      Share this link with your members so they can join your community's private portal.
                    </p>
                  </div>


                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      <div className="container">
        {/* BENEFITS */}
        <section className="benefits-section">
          <div className="section-label">What You Get</div>
          <h2 className="section-title">Everything included in your membership</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon"><CircleDollarSign size={24} color="var(--green-primary)" /></div>
              <h3>Instant Savings</h3>
              <p>Access 400+ exclusive deals the moment you register. Most members save more than their fee on day one.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon"><LayoutDashboard size={24} color="var(--green-primary)" /></div>
              <h3>Your Custom Portal</h3>
              <p>A custom deals page with your community name and logo. Pin it in your group — members tap and save.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon"><RefreshCcw size={24} color="var(--green-primary)" /></div>
              <h3>New Deals Monthly</h3>
              <p>We negotiate fresh discounts every month. Your portal updates automatically — no work on your end.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon"><TrendingUp size={24} color="var(--green-primary)" /></div>
              <h3>Retention Engine</h3>
              <p>Members who save money stay. Members who stay tell friends. Your community grows on word of mouth.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon"><Zap size={24} color="var(--green-primary)" /></div>
              <h3>Live in Minutes</h3>
              <p>No code, no developers. Register above, get your portal, pin the link. Your members start saving today.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon"><LifeBuoy size={24} color="var(--green-primary)" /></div>
              <h3>Dedicated Support</h3>
              <p>Questions? We're here via WhatsApp and email. Real humans, real help, usually within the hour.</p>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="testimonials-section">
          <div className="section-label">Members Love It</div>
          <h2 className="section-title">Hear from real community owners</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p className="testimonial-text">"I pinned the deals portal on Monday. By Friday, members were posting screenshots of their savings. Best retention hack I've found."</p>
              <div className="testimonial-author">
                <div className="author-avatar">A</div>
                <div className="author-info">
                  <div className="name">Alex T.</div>
                  <div className="savings">Saved $4,200 in first month</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">"HubSpot alone saved me $1,200. Then Notion, then Stripe credits… it paid for itself ten times over. No brainer."</p>
              <div className="testimonial-author">
                <div className="author-avatar">S</div>
                <div className="author-info">
                  <div className="name">Sarah K.</div>
                  <div className="savings">Saved $6,800 total</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">"My members used to mute the group. Now they check it daily because they don't want to miss a new deal drop."</p>
              <div className="testimonial-author">
                <div className="author-avatar">M</div>
                <div className="author-info">
                  <div className="name">Mike R.</div>
                  <div className="savings">Community grew 3x</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">"Setup was literally 5 minutes. I signed up, got the portal link, pinned it, done. My members started saving the same day."</p>
              <div className="testimonial-author">
                <div className="author-avatar">J</div>
                <div className="author-info">
                  <div className="name">Jordan P.</div>
                  <div className="savings">Live within 10 min</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA FOOTER */}
        <section className="cta-footer">
          <h2>Ready to explore your deals?</h2>
          <p>Register above and your portal goes live instantly.</p>
          <a href="#regFormCommunity" onClick={handleFocusForm} className="cta-btn">Activate My Membership →</a>
        </section>

        <div className="footer-copy">© {new Date().getFullYear()} MembershipBenefits.club</div>
      </div>
    </div>
  );
}
