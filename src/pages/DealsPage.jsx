import React, { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import categoryData from '../category_wise_data_updated_headers.json';
import DealCard from '../components/Deals/DealCard';
import DealModal from '../components/Deals/DealModal';
import '../styles/Deals.css';

const categoryInfoMap = {
  'ai': { name: 'AI', icon: '🤖' },
  'project management': { name: 'Project Management', icon: '📊' },
  'data': { name: 'Data', icon: '🗄️' },
  'customer': { name: 'Customer', icon: '💬' },
  'developer': { name: 'Development', icon: '⚙️' },
  'marketing': { name: 'Marketing', icon: '📣' },
  'finance': { name: 'Finance', icon: '💰' },
  'communication': { name: 'Communication', icon: '📡' },
  'sales': { name: 'Sales', icon: '🎯' },
  'business': { name: 'Business', icon: '🏢' },
  'it': { name: 'IT', icon: '🖥️' },
  'humar resource': { name: 'Human Resources', icon: '👥' },
  'operations management': { name: 'Operations', icon: '🛠️' },
  'lifestyle': { name: 'Lifestyle', icon: '🏠' },
};

const categoryOrder = [
  'ai',
  'marketing',
  'sales',
  'project management',
  'developer',
  'data',
  'finance',
  'customer',
  'communication',
  'it',
  'business',
  'operations management',
  'humar resource',
  'lifestyle'
];

const DealsPage = () => {
  const user = useSelector((state) => state.Auth?.user);
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    document.title = "Deals — MembershipBenefits.club";
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const itemsPerPage = 30;

  // Process the JSON data into a flat list of deals
  const deals = useMemo(() => {
    const allDeals = [];
    Object.keys(categoryData)
      .forEach(catId => {
        const catDeals = categoryData[catId];
        if (Array.isArray(catDeals)) {
          const seenInCategory = new Set();
          catDeals.forEach(deal => {
            // Filter out incomplete entries and duplicates within this category
            if (deal['Logo Name'] && !seenInCategory.has(deal['Logo Name'])) {
              allDeals.push(mapJsonDealToLocal(deal, catId));
              seenInCategory.add(deal['Logo Name']);
            }
          });
        }
      });
    return allDeals;
  }, []);

  // Dynamically generate categories from the data with specific ordering
  const categories = useMemo(() => {
    const counts = { all: 0 };
    const allUniqueNames = new Set();

    // Count unique deals per category and total unique deals
    deals.forEach(deal => {
      counts[deal.category] = (counts[deal.category] || 0) + 1;
      allUniqueNames.add(deal.name);
    });
    counts.all = allUniqueNames.size;

    const cats = [{ id: 'all', name: 'All Deals', icon: '⚡', count: counts.all }];

    // Sort keys based on the defined order
    const sortedKeys = Object.keys(categoryData)
      .sort((a, b) => {
        const indexA = categoryOrder.indexOf(a);
        const indexB = categoryOrder.indexOf(b);
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
      });

    sortedKeys.forEach(catId => {
      const info = categoryInfoMap[catId] || {
        name: catId.charAt(0).toUpperCase() + catId.slice(1).replace(/_/g, ' '),
        icon: '📁'
      };
      cats.push({
        id: catId,
        name: info.name,
        icon: info.icon,
        count: counts[catId]
      });
    });
    return cats;
  }, [deals]);

  function mapJsonDealToLocal(jsonDeal, categoryId) {
    const name = jsonDeal['Logo Name'];
    const info = categoryInfoMap[categoryId] || { name: categoryId };

    // Detect format and normalize
    let description = jsonDeal['Description'] || '';
    let offer = jsonDeal['Deal Detail'] || '';
    let savings = jsonDeal['Save'] || '';
    let link = jsonDeal['absolute href'] || jsonDeal['btn'] || '';
    let usersText = jsonDeal['Users'] || '';

    // Handle inconsistent formats across categories
    if (savings && savings.startsWith('http')) {
      link = savings;
      savings = offer;
      offer = description;
      description = usersText;
    } else if (jsonDeal['btn'] && jsonDeal['btn'].startsWith('http')) {
      link = jsonDeal['btn'];
      if (savings === 'Get deal' || savings === 'Get deal for free') {
        savings = offer;
        offer = description;
        description = usersText;
      }
    }

    return {
      id: link || Math.random().toString(36).substr(2, 9),
      name: name,
      category: categoryId,
      categoryName: info.name,
      logo: jsonDeal['App Logo'] ? <img src={jsonDeal['App Logo']} alt={name} /> : name.substring(0, 3).toUpperCase(),
      logoStyle: jsonDeal['App Logo'] ? {} : { background: 'var(--n9)', color: 'var(--w)', fontSize: '16px', fontWeight: '900' },
      tag: '',
      tagClass: '',
      bgClass: 'bg-a',
      description: description || 'No description available.',
      offer: offer || 'Exclusive Deal',
      offerDetail: offer || 'Exclusive Deal',
      subText: usersText || 'Limited time offer',
      savings: savings || 'Significant Savings',
      rating: '4.5/5',
      users: usersText || 'Many users',
      dealsContent: {
        title: 'Deal Details',
        items: [offer],
        description: description || ''
      },
      pricingContent: [{ name: 'Standard', price: 'Check website for details' }],
      faqContent: [{ q: 'How do I redeem?', a: `Click the "Get deal" button to visit the provider's website and claim this offer.` }]
    };
  }

  const filteredDeals = useMemo(() => {
    let list = deals.filter(deal => {
      const matchesCategory = activeCategory === 'all' || deal.category === activeCategory;
      const matchesSearch = deal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (activeCategory === 'all') {
      const seen = new Set();
      list = list.filter(deal => {
        if (seen.has(deal.name)) return false;
        seen.add(deal.name);
        return true;
      });
    }

    return list;
  }, [activeCategory, searchQuery, deals]);

  // Pagination logic
  const totalPages = Math.ceil(filteredDeals.length / itemsPerPage);
  const paginatedDeals = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredDeals.slice(start, start + itemsPerPage);
  }, [filteredDeals, currentPage]);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    setSearchQuery(''); // Clear search query on category change
    setCurrentPage(1); // Reset to first page on category change
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="deals-page-container">
      <header className="site-header">
        <div className="header-container">
          <a href="https://www.membershipbenefits.club/" className="header-logo">
            <img
              src="https://images.squarespace-cdn.com/content/v1/69b30bfaac362e539cfe126d/07b0c51a-28f8-40b9-98cc-d5d1ab77ec6c/logo.png?format=1500w"
              alt="MembershipBenefits.club"
            />
          </a>

          <div className={`mobile-burger ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <nav className={`header-nav ${isMenuOpen ? 'mobile-open' : ''}`}>
            <a href="/how-it-works">How It Works</a>
            <a href={user?.plan === 'free' ? '/pricing' : "https://www.membershipbenefits.club/pricing"}>Pricing</a>
            <a href="/deals" className="active">Deals</a>

            <a href="/about-us">About Us</a>
            <a href="/faq">FAQ</a>
            {!localStorage.getItem('authToken') && (
              <div className="header-actions">
                <a href="https://portal.membershipbenefits.club/login" className="btn-login">Login</a>
                <a href="https://www.membershipbenefits.club/pricing" className="btn-start">Start Now</a>
              </div>
            )}
          </nav>
        </div>
      </header>

      <div className="pw">
        <div className="ph">
          <h1>Explore <span>330+ exclusive</span> software deals</h1>
          <p>Every deal is from a closed network — not publicly available, not on any coupon site. Access unlocks the moment you join for $29/month.</p>
          <div className="stats">
            <div className="stat"><span className="stat-val">{categories.find(c => c.id === 'all')?.count || 0}</span><span className="stat-lbl">active deals</span></div>
            <div className="stat"><span className="stat-val">{categories.length - 1}</span><span className="stat-lbl">categories</span></div>
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
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
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
      </div>

      <div className="main-content-section">
        <div className="pw">
          <div className="cl">
            <aside className="sb">
              <span className="sbt">Categories</span>
              <div className="sbc">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    className={`cb ${activeCategory === cat.id ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(cat.id)}
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

              <div className={`dg ${viewMode === 'list' ? 'list-view' : ''}`}>
                {paginatedDeals.length > 0 ? (
                  paginatedDeals.map((deal, idx) => (
                    <DealCard key={deal.id + idx} deal={deal} onClick={setSelectedDeal} />
                  ))
                ) : (
                  <div className="teaser">
                    <h4>No deals found</h4>
                    <p>Try adjusting your search or category filter to find what you're looking for.</p>
                  </div>
                )}
              </div>

              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="pg-btn"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>

                  <div className="pg-numbers">
                    {[...Array(totalPages)].map((_, i) => {
                      const page = i + 1;
                      // Only show first, last, and pages around current
                      if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                        return (
                          <button
                            key={page}
                            className={`pg-num ${currentPage === page ? 'active' : ''}`}
                            onClick={() => handlePageChange(page)}
                          >
                            {page}
                          </button>
                        );
                      } else if (page === currentPage - 2 || page === currentPage + 2) {
                        return <span key={page} className="pg-dots">...</span>;
                      }
                      return null;
                    })}
                  </div>

                  <button
                    className="pg-btn"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              )}

              {activeCategory === 'all' && searchQuery === '' && (
                <div className="teaser">
                  <h4>Can't find a specific tool?</h4>
                  <p>We add 5-10 new deals every single week. If you're looking for something specific, our members can request new partnerships.</p>
                  <a href="https://www.membershipbenefits.club/pricing" className="btn-u">Join to Request Deals</a>
                </div>
              )}
            </main>
          </div>
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
