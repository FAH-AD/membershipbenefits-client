import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import StaticFooter from '../components/StaticFooter';
import '../styles/StaticPages.css';

const Step = ({ number, title, description, micro, delay }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    style={{ display: 'flex', gap: '14px', marginBottom: '32px' }}
  >
    <div className="step-num" style={{ width: '44px', height: '44px', fontSize: '18px', flexShrink: 0 }}>{number}</div>
    <div>
      <h3>{title}</h3>
      <p style={{ color: 'var(--gray-300)', fontSize: '14px' }}>{description}</p>
      <p className="micro">{micro}</p>
    </div>
  </motion.div>
);

const HowItWorks = () => {
  return (
    <div className="static-page-container">
      <Navbar />

      <section className="section">
        <div className="section-inner">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="overline">The Setup</div>
            <h1>From signup to live<br />in under a week.</h1>
            <p className="body-text" style={{ marginBottom: '48px' }}>No developers. No IT tickets. No vendor negotiations. We handle the platform. You handle the community. Your members handle the savings.</p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr .85fr', gap: '40px' }} className="how-it-works-grid">
            <div className="steps-list">
              <Step 
                number="1" 
                title="Tell Us About Your Community" 
                description="Sign up and answer a few questions: your platform, approximate member count, brand colors, logo. That's it. We take it from there." 
                micro="~5 minutes of your time"
                delay={0.1}
              />
              <Step 
                number="2" 
                title="We Build Your Portal" 
                description="We configure your white-labeled deals marketplace. Your logo. Your colors. Your custom URL. We connect via API or Google Sheet." 
                micro="1-3 business days"
                delay={0.2}
              />
              <Step 
                number="3" 
                title="Invite Your Members" 
                description="We give you announcement templates, email copy, and a direct link. Members click, log in with SSO, and start savings. No extra accounts." 
                micro="Day of launch"
                delay={0.3}
              />
              <Step 
                number="4" 
                title="Watch Retention Improve" 
                description="New deals added monthly. Members save without you lifting a finger. Dashboard shows usage, savings, and most popular tools." 
                micro="Ongoing (autopilot)"
                delay={0.4}
              />
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="feature-card" style={{ marginBottom: '20px' }}>
                <h3 style={{ color: 'var(--green)', marginBottom: '14px' }}>Every Plan Includes</h3>
                <ul className="pricing-features">
                  <li>White-labeled savings portal</li>
                  <li>400+ deals (updated monthly)</li>
                  <li>SSO/API integration</li>
                  <li>Custom URL on your domain</li>
                  <li>Usage analytics dashboard</li>
                  <li>Launch email templates</li>
                  <li>7/7 premium support</li>
                  <li>Optional: Job board + event feed</li>
                </ul>
              </div>
              <div className="feature-card">
                <h3 style={{ color: 'var(--teal)', marginBottom: '10px' }}>Platforms We Connect To</h3>
                <p style={{ fontSize: '13px', color: 'var(--gray-300)', lineHeight: 1.7 }}>
                  Skool, Circle, Mighty Networks, Slack, Discord, Kajabi, Teachable, Thinkific, WordPress/BuddyBoss, or any platform that exports a member list.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="section-narrow" style={{ position: 'relative', zIndex: 2 }}>
          <h2>Ready to give your members something worth paying for?</h2>
          <div className="cta-ctas">
            <a href="#" className="btn btn-primary btn-lg">Start Free →</a>
            <a href="#" className="btn btn-ghost">See Pricing</a>
          </div>
        </div>
      </section>

      <StaticFooter />
    </div>
  );
};

export default HowItWorks;
