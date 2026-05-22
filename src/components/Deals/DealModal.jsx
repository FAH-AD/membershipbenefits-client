import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import '../../styles/Deals.css';

const DealModal = ({ deal, onClose }) => {
  const [activeTab, setActiveTab] = useState('deals');
  const user = useSelector((state) => state.Auth?.user);

  if (!deal) return null;

  const handleCtaClick = (e) => {
    e.preventDefault();
    console.log("user", user);
    if (user && (user.plan === 'pro' || user.plan === 'community')) {

      const dealsUrl = localStorage.getItem('deals_sign_in_url');
      console.log("dealsUrl", dealsUrl);
      if (dealsUrl) {
        window.location.href = dealsUrl;
      } else {
        window.location.href = '/deals';
      }
    } else if (user && user.plan === 'free') {
      window.location.href = '/pricing';
    } else {
      window.location.href = '/pricing';
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-top">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="modal-logo" style={deal.logoStyle}>
              {deal.logo}
            </div>
            <h2 className="modal-title" style={{ margin: 0 }}>{deal.name}</h2>
          </div>
          <button className="modal-close" onClick={onClose} aria-label={`Close ${deal.name} details`}>×</button>
        </div>

        <nav className="modal-tabs">
          <button
            className={`modal-tab-label ${activeTab === 'deals' ? 'active' : ''}`}
            onClick={() => setActiveTab('deals')}
          >
            Deals
          </button>
          <button
            className={`modal-tab-label ${activeTab === 'pricing' ? 'active' : ''}`}
            onClick={() => setActiveTab('pricing')}
          >
            Pricing
          </button>
          <button
            className={`modal-tab-label ${activeTab === 'faq' ? 'active' : ''}`}
            onClick={() => setActiveTab('faq')}
          >
            FAQ
          </button>
        </nav>

        <div className="modal-body">
          <div className="modal-left">
            {activeTab === 'deals' && (
              <div className="tab-content tab-deals">
                <h2>{deal.dealsContent.title}</h2>
                <ul>
                  {deal.dealsContent.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <h3>Why take advantage of this {deal.name} deal?</h3>
                <p>{deal.dealsContent.description}</p>
              </div>
            )}
            {activeTab === 'pricing' && (
              <div className="tab-content tab-pricing">
                <h2>{deal.name} Pricing</h2>
                <div className="pricing-grid">
                  {deal.pricingContent.map((item, index) => (
                    <div className="pricing-row" key={index}>
                      <span className="p-name">{item.name}</span>

                      <span className="p-price">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 'faq' && (
              <div className="tab-content tab-faq">
                <h2>Frequently Asked Questions</h2>
                {deal.faqContent.map((item, index) => (
                  <div key={index} style={{ marginBottom: '20px' }}>
                    <p><strong>{item.q}</strong></p>
                    <p>{item.a}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="modal-right">
            <div className="modal-cta-card">
              <div className="cta-header">
                <div className="cta-logo" style={deal.logoStyle}>{deal.logo}</div>
                <div className="cta-title-wrap">
                  <h4>{deal.name}</h4>
                  <div className="cta-rating">⭐ {deal.rating} <span>({deal.users})</span></div>
                </div>
              </div>
              <div className="cta-savings-badge">💰 {deal.savings}</div>
              <div className="cta-offer-desc">{deal.offerDetail}</div>
              <a onClick={handleCtaClick} className="btn-get-deal-modal">Get Deal Now</a>
              <p style={{ fontSize: '12px', color: 'var(--g4c)', textAlign: 'center' }}>No credit card required to apply.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealModal;
