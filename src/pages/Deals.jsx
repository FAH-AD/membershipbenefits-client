import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import StaticFooter from '../components/StaticFooter';
import '../styles/StaticPages.css';

const Deals = () => {
  const [activeTab, setActiveTab] = useState('All Deals');

  const tabs = [
    'All Deals', 'AI & Productivity', 'Sales & Marketing', 
    'Finance', 'Operations', 'Design', 'Development', 'HR & Hiring'
  ];

  const allDeals = [
    { name: 'Notion', desc: '3 months free on Business', icon: 'N', bg: '#1a1a2e', color: '#fff', badge: '-50%', save: 'Save $1,200', category: 'AI & Productivity' },
    { name: 'Stripe', desc: 'Waived fees on first $20K', icon: 'S', bg: '#635BFF', color: '#fff', badge: '-100%', save: 'Save $500+', category: 'Finance' },
    { name: 'HubSpot', desc: '90% off Professional plan', icon: 'H', bg: '#FF7A59', color: '#fff', badge: '-40%', save: 'Save $7,000', category: 'Sales & Marketing' },
    { name: 'OpenAI', desc: 'API credits + priority', icon: 'AI', bg: '#10A37F', color: '#fff', badge: '-30%', save: 'Credits incl.', category: 'AI & Productivity' },
    { name: 'Zapier', desc: '75% off for 12 months', icon: 'Z', bg: '#FF4F00', color: '#fff', badge: '-75%', save: 'Save $2,400', category: 'AI & Productivity' },
    { name: 'Apollo', desc: '20% off annual plans', icon: 'A', bg: '#3B82F6', color: '#fff', badge: '-20%', save: 'Save $860', category: 'Sales & Marketing' },
    { name: 'Make.com', desc: 'Free core plan + 10K ops', icon: 'M', bg: '#6D28D9', color: '#fff', badge: '-100%', save: 'Free', category: 'AI & Productivity' },
    { name: 'Airtable', desc: '$1K in credits', icon: 'AT', bg: '#2563EB', color: '#fff', badge: '-50%', save: '$1K credits', category: 'AI & Productivity' },
    { name: 'Brevo', desc: '75% off Business 1yr', icon: 'B', bg: '#0EA5E9', color: '#fff', badge: '-75%', save: 'Save $1,800', category: 'Sales & Marketing' },
    { name: 'Webflow', desc: '30% off CMS plan', icon: 'W', bg: '#F97316', color: '#fff', badge: '-30%', save: 'Save $400', category: 'Design' },
    { name: 'Pipedrive', desc: '30% off Pro 1yr', icon: 'P', bg: '#059669', color: '#fff', badge: '-30%', save: 'Save $600', category: 'Sales & Marketing' },
    { name: 'Descript', desc: '50% off Pro 6mo', icon: 'D', bg: '#7C3AED', color: '#fff', badge: '-50%', save: 'Save $150', category: 'AI & Productivity' },
  ];

  const filteredDeals = activeTab === 'All Deals' 
    ? allDeals 
    : allDeals.filter(deal => deal.category === activeTab);

  return (
    <div className="static-page-container">
      <Navbar />

      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="section"
      >
        <div className="section-inner">
          <div style={{ textAlign: 'center' }}>
            <div className="overline">The Proof</div>
            <h1>400+ Software Deals. Exposed.</h1>
            <p className="body-text" style={{ margin: '0 auto' }}>Browse the deals your members get instant access to. Pre-negotiated discounts, not coupon codes. 20% to 100% off.</p>
          </div>
          
          <div className="filter-tabs">
            {tabs.map(tab => (
              <span 
                key={tab}
                className={`filter-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </span>
            ))}
          </div>

          <motion.div 
            layout
            className="deals-grid"
          >
            <AnimatePresence mode='popLayout'>
              {filteredDeals.map((deal) => (
                <motion.div 
                  key={deal.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="deal-grid-card"
                >
                  <div className="deal-icon" style={{ background: deal.bg, color: deal.color }}>{deal.icon}</div>
                  <div className="deal-info">
                    <div className="deal-name">{deal.name}</div>
                    <div className="deal-desc">{deal.desc}</div>
                  </div>
                  <div>
                    <div className="deal-badge">{deal.badge}</div>
                    <div style={{ color: 'var(--green)', fontSize: '11px', fontWeight: 600, marginTop: '3px' }}>{deal.save}</div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredDeals.length === 0 && (
            <div style={{ textAlign: 'center', padding: '48px', color: 'var(--gray-500)' }}>
              No deals found in this category yet.
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '28px', padding: '28px', background: 'var(--dark-card)', border: '1px solid var(--dark-border)', borderRadius: '14px' }}>
            <p style={{ color: 'var(--gray-300)', fontSize: '13px', marginBottom: '4px' }}>Showing {filteredDeals.length} of 400+ deals</p>
            <p style={{ color: 'var(--gray-100)', fontSize: '17px', fontWeight: 600, marginBottom: '18px' }}>Your members are already paying for these tools. Let them pay less.</p>
            <a href="#" className="btn btn-primary">Start Free →</a>
            <p className="micro">No credit card. No developer. Live in under a week.</p>
          </div>
        </div>
      </motion.section>

      <StaticFooter />
    </div>
  );
};

export default Deals;
