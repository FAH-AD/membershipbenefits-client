import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { get, post } from '../services/ApiEndpoint';
import './Welcome.css';

export default function CommunityRegister() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [communityName, setCommunityName] = useState('Community');
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const fetchCommunityInfo = async () => {
      try {
        const response = await get(`/api/auth/community-info/${id}`);
        if (response.status === 200) {
          setCommunityName(response.data.data.name);
        }
      } catch (err) {
        console.error('Failed to fetch community info:', err);
        setError('Community not found or link expired.');
      } finally {
        setPageLoading(false);
      }
    };

    fetchCommunityInfo();
  }, [id]);

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
      const response = await post(`/api/auth/register-community-member/${id}`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
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

  if (pageLoading) {
    return (
      <div className="welcome-theme-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="welcome-theme-wrapper">
      <div className="container" style={{ paddingTop: '50px' }}>
        <nav>
          <div className="logo">Community<span>Access</span></div>
          <div className="nav-badge">✦ Official Registration</div>
        </nav>

        <section className="reg-section" style={{ marginTop: '40px' }}>
          <div className="reg-card">
            {!success ? (
              <div id="formArea">
                <div className="reg-header">
                  <div className="hero-badge" style={{ marginBottom: '15px' }}>
                    <span className="check">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    Join {communityName}
                  </div>
                  <h2>Member Registration</h2>
                  <p>Register below to join the official {communityName} members portal.</p>
                </div>

                <form className="form-grid" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="Jane"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Doe"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group full">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="jane@example.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
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
                      >
                        {showConfirmPassword ? (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                        ) : (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {error && <div className="form-error" style={{ color: '#ff4d4d', fontSize: '0.9rem', gridColumn: 'span 2', marginTop: '10px', textAlign: 'center' }}>{error}</div>}

                  <button type="submit" className="submit-btn" disabled={loading} style={{ animation: 'shimmer 3s infinite' }}>
                    {loading ? 'Joining Community...' : `Join ${communityName} Community →`}
                  </button>

                  <div className="form-note">Your account will be created instantly and synced with the community records.</div>
                </form>
              </div>
            ) : (
              <div id="successArea" className="success-message show">
                <div className="success-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3>Welcome to {communityName}! 🚀</h3>
                <p>You have successfully registered. Please check your email to get access for 400+ deals. <br />The email may take a minute to arrive, we appreciate your patience.</p>
              </div>
            )}
          </div>
        </section>

        <div className="footer-copy">© {new Date().getFullYear()} CommunityAccess Portal</div>
      </div>
    </div>
  );
}
