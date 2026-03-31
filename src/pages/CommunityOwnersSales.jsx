import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/CommunityOwnersSales.css';

const Reveal = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const CommunityOwnersSales = () => {
  return (
    <div className="community-sales">
      <nav>
        <Link to="/" className="nav-logo">Membership<span>Benefits</span>.club</Link>
        <a href="#pricing" className="nav-cta">Get Started</a>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero-eyebrow">For Community Owners</div>
          <h1>
            Turn your <em>community</em> into a <br />
            software super-hub.
          </h1>
          <p className="hero-sub">
            Add a private deal portal with <strong>500+ deep software discounts</strong> to your membership. 
            FreshBooks 90% off. QuickBooks 50% off. AWS up to $100K in credits.
          </p>
          <div className="hero-cta-group">
            <a href="#pricing" className="btn-primary">View Pricing & Plans</a>
            <a href="#how-it-works" className="btn-secondary">How it works →</a>
          </div>
        </div>
      </section>

      {/* Business Case */}
      <section className="business-case">
        <div className="container">
          <div className="section-label">The Business Case</div>
          <h2>Value that <em>outlasts</em> the content.</h2>
          <div className="bc-grid">
            <div className="bc-card">
              <div className="bc-number">$205</div>
              <h4>Annual Saving</h4>
              <p>On a single FreshBooks Lite plan for one member.</p>
            </div>
            <div className="bc-card">
              <div className="bc-number">500+</div>
              <h4>Active Deals</h4>
              <p>Across AI, Marketing, Dev, and Finance tools.</p>
            </div>
            <div className="bc-card">
              <div className="bc-number">100%</div>
              <h4>Branded</h4>
              <p>Your portal, your members, your credit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Deals Grid */}
      <section className="proof-block">
        <div className="container-wide">
          <div className="section-label">The Deal Catalog</div>
          <h2>Discounts they can’t find <em>anywhere else</em>.</h2>
          <div className="deals-grid">
            <DealCard name="FreshBooks" desc="Invoicing and accounting software for freelancers." discount="90% OFF" vs="10%" />
            <DealCard name="QuickBooks" desc="Professional accounting and tax preparation." discount="50% OFF" vs="Public" />
            <DealCard name="PhantomBuster" desc="LinkedIn automation and lead scraping tools." discount="25% OFF" vs="None" />
            <DealCard name="Perplexity AI" desc="AI research with cited sources." discount="3 Months FREE" vs="Paid Only" />
            <DealCard name="AWS" desc="Cloud infrastructure and storage." discount="$100k Credits" vs="Std" />
            <DealCard name="Google Cloud" desc="Infrastructure for scale and AI workloads." discount="$350k Credits" vs="Std" />
          </div>
          <div className="deals-total">
            <p>500+ total deals spanning every professional software category.</p>
            <strong>View full catalog →</strong>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="pricing" id="pricing">
        <div className="container">
          <div className="section-label">Pricing</div>
          <h2>Simple, <em>community-first</em> pricing.</h2>
          <div className="pricing-grid">
            <div className="price-card">
              <div className="price-tier">Starter</div>
              <div className="price-amount">$49<span>/mo</span></div>
              <div className="price-per">Billed monthly</div>
              <ul className="price-features">
                <li>Up to 100 members</li>
                <li>Full deal portal access</li>
                <li>Standard branding</li>
                <li>Weekly deal updates</li>
              </ul>
              <a href="#" className="price-cta price-cta-secondary">Get Started</a>
            </div>
            <div className="price-card featured">
              <div className="price-tier">Growth</div>
              <div className="price-amount">$99<span>/mo</span></div>
              <div className="price-per">Billed monthly</div>
              <ul className="price-features">
                <li>Unlimited members</li>
                <li>Full custom branding</li>
                <li>Priority support</li>
                <li>Launch marketing kit</li>
              </ul>
              <a href="#" className="price-cta price-cta-primary">Get Started</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '60px 0', textAlign: 'center', borderTop: '1px solid var(--navy-border)' }}>
        <p style={{ color: 'var(--text-dim)', fontSize: '14px', fontFamily: 'var(--mono)' }}>
          © 2026 MembershipBenefits.club — All rights reserved.
        </p>
      </footer>
    </div>
  );
};

const DealCard = ({ name, desc, discount, vs }) => (
  <div className="deal-card">
    <div className="deal-vs"><span>{vs}</span>Public</div>
    <div className="deal-name">{name}</div>
    <div className="deal-description">{desc}</div>
    <div className="deal-discount">{discount}</div>
    <div className="deal-savings">Est./yr</div>
  </div>
);

export default CommunityOwnersSales;
