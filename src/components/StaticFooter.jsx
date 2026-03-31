import React from 'react';
import { Link } from 'react-router-dom';

const StaticFooter = () => {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="nav-logo-icon">M</div>
            <span className="nav-logo-text">MembershipBenefits.club</span>
          </div>
          <p>Give your members a reason to join. And stay.</p>
        </div>
        <div className="footer-col">
          <h4>Product</h4>
          <Link to="/how-it-works">How It Works</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/deals">Deals</Link>
          <Link to="/faq">FAQ</Link>
          <a href="#">Savings Calculator</a>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <Link to="/about-us">About</Link>
          <a href="#">Contact</a>
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
        </div>
        <div className="footer-col">
          <h4>Get Started</h4>
          <Link to="/signup" className="btn btn-primary btn-sm" style={{ marginTop: '4px' }}>Start Free →</Link>
          <p style={{ fontSize: '11px', color: 'var(--gray-500)', marginTop: '6px' }}>No credit card required</p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} MembershipBenefits.club
      </div>
    </footer>
  );
};

export default StaticFooter;
