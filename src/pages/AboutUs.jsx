import React from 'react';
import { motion } from 'framer-motion';
import StaticHeader from '../components/StaticHeader';
import StaticFooter from '../components/StaticFooter';
import '../styles/StaticPages.css';

const AboutUs = () => {
  return (
    <div className="static-page-container">
      <StaticHeader activePage="about-us" />

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="section"
      >
        <div className="section-inner">
          <div className="overline">The Origin Story</div>
          <h1>Built by someone who got tired<br />of watching members leave.</h1>
          <div className="about-grid">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="about-story"
            >
              <p>I ran two global associations. First as CMO of the VR/AR Association (VRARA), then as a director of the Applied AI Association. Between the two, I watched the same problem play out over and over: members would join with excitement, stick around for a few months, and then quietly disappear.</p>
              <p>The reason was almost never the content. It wasn't the events. It wasn't the networking. It was the gap between what they expected and what they felt they received. On day one, the excitement of joining carried them. By month three, they needed something tangible. Something that said: "This membership is saving me money. Right now. Today."</p>
              <p>Most associations try to solve this with more content, more webinars, more Slack channels. But the real answer is simpler: give people a financial reason to stay. Not a vague promise of "networking opportunities." An actual, calculable return on their membership fee.</p>
              <p>That's why I built MembershipBenefits.club. It connects your community to 400+ pre-negotiated software discounts, branded to your organization, live in under a week. Your members save money on the tools they already pay for. You get credit for it. Attrition drops. Referrals go up.</p>
              <p>I didn't build this from a whiteboard. I built it because I sat in the meetings where we debated how to keep members from leaving, and every idea we had took months to execute and moved the needle by single-digit percentages. This one takes a week and changes the retention math immediately.</p>
              <h3 style={{ marginTop: '32px', color: 'var(--green)' }}>Your members deserve more than a Slack channel and a quarterly webinar.</h3>
              <div style={{ marginTop: '20px' }}>
                <a href="#" className="btn btn-primary">Start Free →</a>
                &nbsp;&nbsp;
                <a href="/how-it-works" className="btn btn-ghost">See How It Works</a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="about-sidebar"
            >
              <h3>About Maury Rogow</h3>
              <p style={{ fontSize: '13px', color: 'var(--gray-300)', marginBottom: '18px', lineHeight: 1.7 }}>Founder of Rip Media Group. Author of "Why Buyers Say No." 15 years at the intersection of enterprise sales, brand storytelling, and AI automation.</p>
              <div className="about-stat"><div className="about-stat-num">$250M+</div><div className="about-stat-label">Client revenue generated</div></div>
              <div className="about-stat"><div className="about-stat-num">1,000+</div><div className="about-stat-label">Brand campaigns produced</div></div>
              <div className="about-stat"><div className="about-stat-num">800-1K</div><div className="about-stat-label">Daily users on Script Timer AI</div></div>
              <div className="about-stat"><div className="about-stat-num">2</div><div className="about-stat-label">Global associations led (VRARA, Applied AI)</div></div>
              <div style={{ marginTop: '18px', paddingTop: '18px', borderTop: '1px solid var(--dark-border)' }}>
                <p style={{ fontSize: '12px', color: 'var(--gray-500)', lineHeight: 1.6 }}>Also built: <a href="https://script-timer.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--teal)', textDecoration: 'none' }}>Script Timer AI</a> and <a href="https://ripmediagroup.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--teal)', textDecoration: 'none' }}>Rip Media Group</a>.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <StaticFooter />
    </div>
  );
};

export default AboutUs;