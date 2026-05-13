import React, { useState, useMemo, useEffect } from 'react';
import { categories as staticCategories } from '../data/dealsData';
import DealCard from '../components/Deals/DealCard';
import DealModal from '../components/Deals/DealModal';
import '../styles/Deals.css';

const DealsPage = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://www.joinsecret.com/api/v2/deals', {
          headers: {
            'Authorization': 'Bearer 7iNMlB0RwkxALaMHbRsxgw',
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch deals: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        // Assuming the API returns an array directly or inside a "deals" property
        const dealsArray = Array.isArray(data) ? data : (data.deals || []);
        
        const mappedDeals = dealsArray.map(mapApiDealToLocal);
        setDeals(mappedDeals);
      } catch (err) {
        console.error('Error fetching deals:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  const mapApiDealToLocal = (apiDeal) => {
    // This function maps API fields to the format expected by DealCard and DealModal
    // It's designed to be robust even if the API structure changes slightly
    return {
      id: apiDeal.id || apiDeal.slug || Math.random().toString(36).substr(2, 9),
      name: apiDeal.name || apiDeal.title || 'Unknown Tool',
      category: (apiDeal.category?.slug || apiDeal.category_slug || 'business').toLowerCase(),
      categoryName: apiDeal.category?.name || apiDeal.category_name || 'Business',
      logo: apiDeal.logo_url ? <img src={apiDeal.logo_url} alt={apiDeal.name} /> : (apiDeal.name ? apiDeal.name.substring(0, 3).toUpperCase() : 'APP'),
      logoStyle: apiDeal.logo_url ? {} : { background: 'var(--n9)', color: 'var(--w)', fontSize: '16px', fontWeight: '900' },
      tag: apiDeal.is_new ? 'NEW' : (apiDeal.is_popular ? 'POPULAR' : ''),
      tagClass: apiDeal.is_new ? 'nw' : '',
      bgClass: 'bg-a', // Default background class
      description: apiDeal.description || apiDeal.short_description || 'No description available.',
      offer: apiDeal.offer_title || apiDeal.benefit || 'Exclusive Deal',
      offerDetail: apiDeal.offer_description || apiDeal.benefit_details || apiDeal.description,
      subText: apiDeal.offer_subtext || 'Limited time offer',
      savings: apiDeal.savings_amount || 'Significant Savings',
      rating: apiDeal.rating || '4.5/5',
      users: apiDeal.users_count ? `${apiDeal.users_count} users` : 'Many users',
      dealsContent: {
        title: apiDeal.deal_terms_title || 'Terms & Conditions',
        items: apiDeal.deal_terms || ['Check website for details'],
        description: apiDeal.deal_summary || apiDeal.description
      },
      pricingContent: apiDeal.pricing_plans || [
        { name: 'Standard', price: 'Contact for pricing' }
      ],
      faqContent: apiDeal.faqs || [
        { q: 'How do I redeem?', a: 'Join our platform to get instant access to this deal and more.' }
      ]
    };
  };

  const filteredDeals = useMemo(() => {
    return deals.filter(deal => {
      const matchesCategory = activeCategory === 'all' || deal.category === activeCategory;
      const matchesSearch = deal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, deals]);

  return (
    <div className="deals-page-container">
      <header className="site-header">
        <div className="header-container">
          <a href="/" className="header-logo">
            <img
              src="https://images.squarespace-cdn.com/content/v1/69b30bfaac362e539cfe126d/07b0c51a-28f8-40b9-98cc-d5d1ab77ec6c/logo.png?format=1500w"
              alt="MembershipBenefits.club"
            />
          </a>

          <div className="mobile-burger">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <nav className="header-nav">
            <a href="/how-it-works">How It Works</a>
            <a href="/pricing">Pricing</a>
            <a href="/deals">Deals</a>
            <a href="/about-us">About Us</a>
            <a href="/faq">FAQ</a>
          </nav>
        </div>
      </header>

      <div className="pw">
        <div className="ph">
          <h1>Explore <span>600+ exclusive</span> software deals</h1>
          <p>Every deal is from a closed network — not publicly available, not on any coupon site. Access unlocks the moment you join for $29/month.</p>
          <div className="stats">
            <div className="stat"><span className="stat-val">609</span><span className="stat-lbl">active deals</span></div>
            <div className="stat"><span className="stat-val">14</span><span className="stat-lbl">categories</span></div>
            <div className="stat"><span className="stat-val">$450K+</span><span className="stat-lbl">max savings</span></div>
            <div className="stat"><span className="stat-val">$29</span><span className="stat-lbl">per month, flat</span></div>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center', marginTop: '24px' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '220px', maxWidth: '500px' }}>
              <span style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', color: 'var(--g4c)', pointerEvents: 'none' }}>🔍</span>
              <input
                type="text"
                placeholder="Search tools, categories, offers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--n7)',
                  border: '1px solid var(--n4)',
                  color: 'var(--g1)',
                  fontFamily: 'var(--bd2)',
                  fontSize: '14px',
                  padding: '10px 14px 10px 40px',
                  borderRadius: 'var(--r)',
                  outline: 'none'
                }}
              />
            </div>
          </div>
        </div>

        <div className="cl">
          <aside className="sb">
            <span className="sbt">Categories</span>
            <div className="sbc">
              {staticCategories.map(cat => (
                <button
                  key={cat.id}
                  className={`cb ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <span className="ci">{cat.icon}</span>
                  {cat.name}
                  <span className="cc">{cat.count}</span>
                </button>
              ))}
            </div>
          </aside>

          <main>
            <div className="sortbar">
              <div className="stabs">
                <span className="stab active">Most Popular</span>
                <span className="stab">Premium</span>
                <span className="stab">Recently Added</span>
              </div>
              <div className="vt">
                <button
                  className={`vb ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Grid"
                >
                  ⊞
                </button>
                <button
                  className={`vb ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  title="List"
                >
                  ☰
                </button>
              </div>
            </div>

            {loading ? (
              <div className="loading-state" style={{ textAlign: 'center', padding: '40px', color: 'var(--g1)' }}>
                <div className="loader"></div>
                <p>Fetching exclusive deals...</p>
              </div>
            ) : error ? (
              <div className="error-state" style={{ textAlign: 'center', padding: '40px', color: 'var(--red)' }}>
                <p>Error loading deals: {error}</p>
                <button onClick={() => window.location.reload()} className="btn-u">Try Again</button>
              </div>
            ) : (
              <div className={`dg ${viewMode === 'list' ? 'list-view' : ''}`}>
                {filteredDeals.length > 0 ? (
                  filteredDeals.map(deal => (
                    <DealCard key={deal.id} deal={deal} onClick={setSelectedDeal} />
                  ))
                ) : (
                  <div className="teaser">
                    <h4>No deals found</h4>
                    <p>Try adjusting your search or category filter to find what you're looking for.</p>
                  </div>
                )}

                {activeCategory === 'all' && searchQuery === '' && (
                  <div className="teaser">
                    <h4>Can't find a specific tool?</h4>
                    <p>We add 5-10 new deals every single week. If you're looking for something specific, our members can request new partnerships.</p>
                    <a href="/pricing" className="btn-u">Join to Request Deals</a>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>

      <footer>
        <div className="fi">
          <ul className="fls">
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
          <div className="fc">© 2024 MembershipBenefits.club. All rights reserved.</div>
        </div>
      </footer>

      {selectedDeal && (
        <DealModal deal={selectedDeal} onClose={() => setSelectedDeal(null)} />
      )}
    </div>
  );
};

export default DealsPage;
