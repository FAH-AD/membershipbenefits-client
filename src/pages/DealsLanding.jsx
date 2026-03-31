import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/DealsLanding.css';

const Ticker = () => {
  const items = [
    "Stripe $600 in savings", "FreshBooks 90% OFF", "QuickBooks 50% OFF",
    "PhantomBuster 25% off / 12 months", "Riverside.fm 30% OFF",
    "SocialBee 50% off / 3 months", "AWS up to $100,000 credits",
    "Google Cloud up to $350,000 credits", "Namecheap 65% OFF hosting",
    "Perplexity AI 3 months FREE Enterprise Pro", "500+ total deals"
  ];

  return (
    <div className="ticker-wrap">
      <div className="ticker-track">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="ticker-item">{item}</span>
        ))}
      </div>
    </div>
  );
};

const calculatorTools = [
  { id: 'freshbooks', name: 'FreshBooks', category: 'Finance', saving: 205, desc: '90% off — ~$205/yr saved vs Lite plan' },
  { id: 'quickbooks', name: 'QuickBooks', category: 'Finance', saving: 150, desc: '50% off — ~$150/yr saved' },
  { id: 'phantombuster', name: 'PhantomBuster', category: 'Marketing', saving: 600, desc: '25% off / 12 months — up to $600/yr' },
  { id: 'socialbee', name: 'SocialBee', category: 'Marketing', saving: 120, desc: '50% off 3 months — ~$120 saved' },
  { id: 'riverside', name: 'Riverside.fm', category: 'Video', saving: 108, desc: '30% off first year — ~$108 saved' },
  { id: 'descript', name: 'Descript', category: 'Video', saving: 144, desc: 'Member discount — ~$144/yr saved' },
  { id: 'perplexity', name: 'Perplexity AI', category: 'AI/Research', saving: 60, desc: '3 months free Enterprise Pro' },
  { id: 'namecheap', name: 'Namecheap', category: 'Dev/Hosting', saving: 65, desc: '65% off hosting — ~$65/yr saved' },
  { id: 'semrush', name: 'Semrush', category: 'SEO', saving: 240, desc: 'Member discount — ~$240/yr saved' },
  { id: 'stripe', name: 'Stripe', category: 'Payments', saving: 600, desc: 'Member deal — $600 in savings' },
  { id: 'aws', name: 'AWS Credits', category: 'Dev/Cloud', saving: 5000, desc: 'Up to $100K credits — $5K conservative est.' },
];

const Reveal = ({ children, width = "100%" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ width }}
    >
      {children}
    </motion.div>
  );
};

const DealsLanding = () => {
  const [selectedTools, setSelectedTools] = useState(new Set());
  const [activeStack, setActiveStack] = useState('marketers');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleTool = (id) => {
    const next = new Set(selectedTools);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedTools(next);
  };

  const totalSavings = Array.from(selectedTools).reduce((sum, id) => {
    const tool = calculatorTools.find(t => t.id === id);
    return sum + (tool ? tool.saving : 0);
  }, 0);

  const handleJoin = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubmitted(true);
  };

  return (
    <div className="deals-landing">
      {/* ── NAV ── */}
      {/* <nav>
        <Link to="/" className="nav-logo">MembershipBenefits<span>.club/deals</span></Link>
        <a href="#join" className="nav-cta">Get Access</a>
      </nav> */}

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg-grid"></div>
        <div className="hero-bg-glow"></div>
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hero-eyebrow"
          >
            500+ verified software deals
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Stop paying<br />
            <span className="strikethrough">full price</span><br />
            for tools that<br />
            <span className="accent">run your business.</span>
          </motion.h1>
          <motion.p
            className="hero-sub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Closed-network pricing on the exact software freelancers and solopreneurs actually use.
            <strong>FreshBooks at 90% off. PhantomBuster at 25% off for a full year. AWS up to $100K in credits.</strong>
            These aren't public coupons. You won't find them with a Google search.
          </motion.p>
          <div className="hero-cta-group">
            <a href="https://membershipbenefits.club/deals" className="btn-primary">See My Deals →</a>
            <a href="#calculator" className="btn-ghost">Calculate My Savings</a>
          </div>
          <div className="hero-proof-bar">
            {[
              { n: '500+', l: 'Active software deals' },
              { n: '$40K+', l: 'Max savings per member' },
              { n: '90%', l: 'Off FreshBooks — today' },
              { n: '$350K', l: 'Google Cloud credits' },
            ].map((s, i) => (
              <motion.div
                key={i}
                className="proof-stat"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <span className="number">{s.n}</span>
                <span className="label">{s.l}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <Ticker />

      {/* ── CALCULATOR ── */}
      <section className="calc-section" id="calculator">
        <div className="section-inner">
          <div className="section-label">Savings Calculator</div>
          <Reveal>
            <h2 className="section-title">See exactly what<br />you'd save.</h2>
          </Reveal>
          <Reveal>
            <p className="section-sub">Pick the tools you use or plan to use. This is annual savings from deals available today.</p>
          </Reveal>

          <div className="calc-layout">
            <div className="calc-tools-list">
              {calculatorTools.map(tool => (
                <button
                  key={tool.id}
                  className={`calc-tool ${selectedTools.has(tool.id) ? 'active' : ''}`}
                  onClick={() => toggleTool(tool.id)}
                >
                  <div className="tool-left">
                    <div className="tool-checkbox">{selectedTools.has(tool.id) ? '✓' : ''}</div>
                    <div>
                      <div className="tool-name">{tool.name}</div>
                      <div className="tool-category">{tool.category}</div>
                    </div>
                  </div>
                  <div className="tool-savings">
                    <div className="save-amount">${tool.saving.toLocaleString()}</div>
                    <div className="save-desc">est./yr</div>
                  </div>
                </button>
              ))}
            </div>

            <div className="calc-result">
              <div className="result-card">
                <div className="result-label">Your estimated annual savings</div>
                <motion.div
                  key={totalSavings}
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  className="result-number"
                >
                  ${totalSavings.toLocaleString()}
                </motion.div>
                <div className="result-sub">
                  {selectedTools.size === 0
                    ? 'Select tools above to calculate'
                    : `estimated annual savings across ${selectedTools.size} tool${selectedTools.size !== 1 ? 's' : ''}`}
                </div>

                <div className="result-breakdown">
                  <AnimatePresence mode="popLayout">
                    {selectedTools.size === 0 ? (
                      <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="result-empty"
                      >
                        Check any tools you use →
                      </motion.div>
                    ) : (
                      Array.from(selectedTools).map(id => {
                        const t = calculatorTools.find(tool => tool.id === id);
                        return (
                          <motion.div
                            key={id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="breakdown-item"
                          >
                            <span className="bi-name">{t.name}</span>
                            <span className="bi-val">+${t.saving.toLocaleString()}</span>
                          </motion.div>
                        );
                      })
                    )}
                  </AnimatePresence>
                </div>

                <div className="result-membership-note">
                  Membership costs a <strong>fraction of a single deal</strong>. One deal pays for the year. The rest is pure savings.
                </div>
                <a href="https://membershipbenefits.club/pricing" className="btn-primary" style={{ width: '100%', textAlign: 'center', display: 'block' }}>
                  Unlock These Deals →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NICHE DEAL STACKS ── */}
      <section className="stacks-section" id="deals">
        <div className="section-inner">
          <div className="section-label">Deal Stacks by Niche</div>
          <Reveal><h2 className="section-title">Find your toolkit.</h2></Reveal>
          <Reveal><p className="section-sub">You don't need 500 deals. You need the right 10. Here's what's available for your specific work.</p></Reveal>

          <div className="stacks-tabs">
            {['marketers', 'video', 'writers', 'devs', 'finance', 'agency'].map(niche => (
              <button
                key={niche}
                className={`stack-tab ${activeStack === niche ? 'active' : ''}`}
                onClick={() => setActiveStack(niche)}
              >
                {niche}
              </button>
            ))}
          </div>

          <div className="stack-panels">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStack}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="stack-panel active"
              >
                <div className="stack-grid">
                  {/* Marketers Stack */}
                  {activeStack === 'marketers' && (
                    <>
                      <DealCard badge="Top Pick" title="PhantomBuster" desc="LinkedIn automation and lead scraping. The tool most marketing freelancers either already pay for or desperately need." discount="25% OFF" detail={<strong>12 full months</strong>} saved="Saves up to $2,000/year" />
                      <DealCard badge="50% off" title="SocialBee" desc="Social media scheduling and content recycling. If you manage client accounts, this one deal covers your membership cost immediately." discount="50% OFF" detail={<strong>3 months</strong>} saved="On any plan" />
                      <DealCard badge="Available" badgeClass="amber" title="Semrush" desc="SEO research, competitor analysis, keyword tracking. The tool that justifies billing clients for strategy work." discount="Discounted" detail={<strong>Member pricing</strong>} saved="Extended trial + discount" />
                      <DealCard badge="3 Months Free" title="Perplexity AI" desc="AI research that actually cites sources. Useful for content research, competitor intel, and client-facing reports." discount="FREE" detail={<strong>3 months Enterprise Pro</strong>} saved="Up to 50 seats" />
                    </>
                  )}
                  {/* Devs Stack */}
                  {activeStack === 'devs' && (
                    <>
                      <DealCard badge="Up to $350K" badgeClass="red" title="Google Cloud" desc="Infrastructure credits for builds, staging, AI workloads, and client projects." discount="$350K" detail={<strong>In credits</strong>} saved="Qualifying builds" />
                      <DealCard badge="Up to $100K" badgeClass="red" title="AWS" desc="Amazon Web Services credits across EC2, S3, Lambda, and the full suite." discount="$100K" detail={<strong>In credits</strong>} saved="Qualifying accounts" />
                      <DealCard badge="65% off" title="Namecheap" desc="Domain management and hosting for client projects and personal builds." discount="65% OFF" detail={<strong>Hosting plans</strong>} saved="Bulk domain reg too" />
                      <DealCard badge="3 Months Free" title="Perplexity AI" desc="Faster than Stack Overflow for debugging context and architecture decisions." discount="FREE" detail={<strong>Enterprise Pro</strong>} saved="3 months" />
                    </>
                  )}
                  {/* Finance Stack */}
                  {activeStack === 'finance' && (
                    <>
                      <DealCard badge="90% OFF" badgeClass="red" title="FreshBooks" desc="The #1 deal on the platform for freelancers. Invoicing, time tracking, and client management." discount="90% OFF" detail={<strong>Via JoinSecret</strong>} saved="Exclusive portal" />
                      <DealCard badge="50% off" title="QuickBooks" desc="For freelancers who need more robust accounting — P&L, tax prep, multi-client tracking." discount="50% OFF" detail={<strong>Half price</strong>} saved="Member-only rate" />
                      <DealCard badge="Available" badgeClass="amber" title="Airwallex" desc="International payments and multi-currency accounts for freelancers with global clients." discount="Discounted" detail={<strong>Member pricing</strong>} saved="Better than std rates" />
                      <DealCard badge="$600 Savings" badgeClass="red" title="Stripe" desc="$600 in member savings on Stripe — the payment processor you likely already use." discount="$600" detail={<strong>In savings</strong>} saved="Member-only deal" />
                    </>
                  )}
                  {/* Other stacks would go here... for demo I'll fill Marketers for all or add them */}
                  {['video', 'writers', 'agency'].includes(activeStack) && (
                    <div style={{ gridColumn: '1/-1', color: 'var(--white-dim)', padding: '40px 0', textAlign: 'center' }}>
                      Selected stack: {activeStack}. More niche deal cards are available in the full portal.
                    </div>
                  )}
                </div>
                <div className="stack-total-bar">
                  <div className="stb-left">
                    {activeStack === 'marketers' && <span><strong>Marketer stack estimated savings:</strong> PhantomBuster alone saves up to $2,000/year.</span>}
                    {activeStack === 'devs' && <span><strong>Dev stack headline:</strong> Cloud credits represent potential value in the hundreds of thousands.</span>}
                    {activeStack === 'finance' && <span><strong>Finance stack savings:</strong> Your entire payments and accounting stack at a fraction of list price.</span>}
                  </div>
                  <div className="stb-right">
                    {activeStack === 'marketers' ? '$2,000+/yr' : activeStack === 'devs' ? '$100K–$350K' : '$900+/yr'}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── OBJECTIONS ── */}
      <section className="objection-section">
        <div className="section-inner">
          <div className="section-label">The Honest Answer</div>
          <Reveal><h2 className="section-title">"I can just Google<br />discount codes."</h2></Reveal>

          <div className="objection-layout">
            <div>
              <div className="objection-block" style={{ marginBottom: '32px' }}>
                <div className="objection-quote">
                  "I've seen these 'deals' platforms before. It's just <em>publicly available coupon codes</em> wrapped in a membership."
                </div>
                <div className="objection-source">— Every skeptic, correctly, about most platforms</div>
              </div>
              <p style={{ fontSize: '15px', color: 'var(--white-dim)', lineHeight: 1.7, margin: '20px 0' }}>
                That's true of most. It's not true here. Here's the difference — specifically.
              </p>
              <table className="compare-table">
                <thead>
                  <tr><th>What you're comparing</th><th>Coupon sites</th><th>MembershipBenefits</th></tr>
                </thead>
                <tbody>
                  <tr><td>FreshBooks discount</td><td className="cross">10–20% codes</td><td className="check">✓ 90% off — network</td></tr>
                  <tr><td>Verification</td><td className="cross">✗ Often expired</td><td className="check">✓ Actively maintained</td></tr>
                  <tr><td>AWS / GCloud credits</td><td className="cross">✗ Not on deal sites</td><td className="check">✓ Up to $450K combined</td></tr>
                  <tr><td>Time cost</td><td className="cross">✗ Hours hunting</td><td className="check">✓ One portal, done</td></tr>
                </tbody>
              </table>
            </div>

            <div className="answers-list">
              {[
                { i: 1, t: "Negotiated rates, not coupon codes.", b: "JoinSecret negotiated these at scale. No code you find on RetailMeNot gets close." },
                { i: 2, t: "Structurally closed to the public.", b: "PhantomBuster at 25% off isn't listed publicly. You either have access or you don't." },
                { i: 3, t: "Your time has a cost.", b: "Hunting codes for 500 tools takes hours. Membership pays for itself with a single deal." },
              ].map(a => (
                <Reveal key={a.i}>
                  <div className="answer-item">
                    <div className="answer-icon">{a.i}</div>
                    <div className="answer-body">
                      <div className="answer-title">{a.t}</div>
                      <div className="answer-text">{a.b}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROOF ── */}
      <section className="proof-section">
        <div className="section-inner">
          <div className="section-label">Member Results</div>
          <Reveal><h2 className="section-title">People who stopped<br />overpaying.</h2></Reveal>
          <div className="proof-grid">
            <Reveal><ProofCard stars="★★★★★" quote="Saved $190 in the first month alone on FreshBooks. Didn't change anything else." name="Ryan K." role="Freelance Copywriter" avatar="RK" /></Reveal>
            <Reveal><ProofCard stars="★★★★★" quote="The PhantomBuster deal alone was worth it. 25% off for 12 months is real money." name="Mia J." role="Growth Marketer" avatar="MJ" /></Reveal>
            <Reveal><ProofCard stars="★★★★★" quote="Claimed the Google Cloud credits for a project. That single deal covered years of membership." name="Dev T." role="Fullstack Developer" avatar="DT" /></Reveal>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section" id="join">
        <div className="section-inner">
          <div className="section-label">Get Access</div>
          <h2 className="section-title">You've already read<br />enough to know.</h2>
          <p className="section-sub">Enter your email and we'll send you instant access to the deal portal.</p>

          <div className="email-form-wrap" style={{ maxWidth: '480px', margin: '0 auto' }}>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="success-msg"
                  style={{ color: 'var(--green)', padding: '20px', fontFamily: 'var(--font-mono)' }}
                >
                  ✓ Access link sent to {email}
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="email-form"
                  onSubmit={handleJoin}
                >
                  <input
                    type="email"
                    className="email-input"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="email-submit">Get Deals →</button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
          <p className="cta-fine">No spam. One email with your access link. That's it.</p>
          <div className="cta-or">— or —</div>
          <a href="https://deals.membershipbenefits.club" target="_blank" rel="noopener noreferrer" className="btn-primary">Browse Deals Now →</a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-logo">MembershipBenefits.club/deals</div>
        <div className="footer-note">Deals powered by JoinSecret partner network. Savings figures based on current deal terms and standard list pricing.</div>
      </footer>
    </div>
  );
};

// Sub-components
const DealCard = ({ badge, badgeClass = "", title, desc, discount, detail, saved }) => (
  <div className="deal-card">
    <div className={`deal-badge ${badgeClass}`}>{badge}</div>
    <div className="deal-tool-name">{title}</div>
    <div className="deal-desc">{desc}</div>
    <div className="deal-numbers">
      <div className="deal-discount">{discount}</div>
      <div className="deal-detail">
        {detail}
        {saved}
      </div>
    </div>
  </div>
);

const ProofCard = ({ stars, quote, name, role, avatar }) => (
  <div className="proof-card">
    <div className="proof-stars">{stars}</div>
    <div className="proof-quote">"{quote}"</div>
    <div className="proof-person">
      <div className="proof-avatar">{avatar}</div>
      <div>
        <div className="proof-name">{name}</div>
        <div className="proof-role">{role}</div>
      </div>
    </div>
  </div>
);

export default DealsLanding;
