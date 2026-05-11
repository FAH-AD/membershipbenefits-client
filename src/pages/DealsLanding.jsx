import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/DealsLanding.css';

const Ticker = () => {
  const items = [
    'Stripe $600 in savings',
    'FreshBooks 90% OFF',
    'QuickBooks 50% OFF',
    'PhantomBuster 25% off / 12 months',
    'Riverside.fm 30% OFF',
    'SocialBee 50% off / 3 months',
    'AWS up to $100,000 credits',
    'Google Cloud up to $350,000 credits',
    'Namecheap 65% OFF hosting',
    'Perplexity AI 3 months FREE Enterprise Pro',
    '500+ total deals'
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
  { id: 'freshbooks', name: 'FreshBooks', category: 'Finance', saving: 205, desc: '90% off - ~$205/yr saved vs Lite plan' },
  { id: 'quickbooks', name: 'QuickBooks', category: 'Finance', saving: 150, desc: '50% off - ~$150/yr saved' },
  { id: 'phantombuster', name: 'PhantomBuster', category: 'Marketing', saving: 600, desc: '25% off / 12 months - up to $600/yr' },
  { id: 'socialbee', name: 'SocialBee', category: 'Marketing', saving: 120, desc: '50% off 3 months - ~$120 saved' },
  { id: 'riverside', name: 'Riverside.fm', category: 'Video', saving: 108, desc: '30% off first year - ~$108 saved' },
  { id: 'descript', name: 'Descript', category: 'Video', saving: 144, desc: 'Member discount - ~$144/yr saved' },
  { id: 'perplexity', name: 'Perplexity AI', category: 'AI/Research', saving: 60, desc: '3 months free Enterprise Pro' },
  { id: 'namecheap', name: 'Namecheap', category: 'Dev/Hosting', saving: 65, desc: '65% off hosting - ~$65/yr saved' },
  { id: 'semrush', name: 'Semrush', category: 'SEO', saving: 240, desc: 'Member discount - ~$240/yr saved' },
  { id: 'stripe', name: 'Stripe', category: 'Payments', saving: 600, desc: 'Member deal - $600 in savings' },
  { id: 'aws', name: 'AWS Credits', category: 'Dev/Cloud', saving: 5000, desc: 'Up to $100K credits - $5K conservative est.' },
];

const Reveal = ({ children, width = '100%' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
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
    const tool = calculatorTools.find((t) => t.id === id);
    return sum + (tool ? tool.saving : 0);
  }, 0);

  const handleJoin = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubmitted(true);
  };

  return (
    <div className="deals-landing">
      <nav>
        <Link to="https://www.membershipbenefits.club/" className="nav-logo">Membership<span>Benefits</span>.club</Link>
        <a href="https://membershipbenefits.club/pricing" className="nav-cta">Get Started</a>
      </nav>

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
            <strong> FreshBooks at 90% off. PhantomBuster at 25% off for a full year. AWS up to $100K in credits.</strong>
            {' '}These are not public coupons. You will not find them with a Google search.
          </motion.p>
          <div className="hero-cta-group">
            <a href="https://membershipbenefits.club/deals" className="btn-primary">See My Deals →</a>
            <a href="#calculator" className="btn-ghost">Calculate My Savings</a>
          </div>
          <div className="hero-proof-bar">
            {[
              { n: '500+', l: 'Active software deals' },
              { n: '$40K+', l: 'Max savings per member' },
              { n: '90%', l: 'Off FreshBooks - today' },
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

      <Ticker />

      <section className="calc-section" id="calculator">
        <div className="section-inner">
          <div className="section-label">Savings Calculator</div>
          <Reveal>
            <h2 className="section-title">See exactly what<br />you would save.</h2>
          </Reveal>
          <Reveal>
            <p className="section-sub">Pick the tools you use or plan to use. This is annual savings from deals available today.</p>
          </Reveal>

          <div className="calc-layout">
            <div className="calc-tools-list">
              {calculatorTools.map((tool) => (
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
                      Array.from(selectedTools).map((id) => {
                        const t = calculatorTools.find((tool) => tool.id === id);
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
                <a
                  href="https://membershipbenefits.club/pricing"
                  className="btn-primary"
                  style={{ width: '100%', textAlign: 'center', display: 'block' }}
                >
                  Unlock These Deals →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="stacks-section" id="deals">
        <div className="section-inner">
          <div className="section-label">Deal Stacks by Niche</div>
          <Reveal><h2 className="section-title">Find your toolkit.</h2></Reveal>
          <Reveal><p className="section-sub">You do not need 500 deals. You need the right 10. Here is what is available for your specific work.</p></Reveal>

          <div className="stacks-tabs">
            {['marketers', 'video', 'writers', 'devs', 'finance', 'agency'].map((niche) => (
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
                  {activeStack === 'marketers' && (
                    <>
                      <DealCard badge="Top Pick" title="PhantomBuster" desc="LinkedIn automation and lead scraping. The tool most marketing freelancers either already pay for or desperately need." discount="25% OFF" detail={<strong>12 full months</strong>} saved="Saves up to $2,000/year" />
                      <DealCard badge="50% off" title="SocialBee" desc="Social media scheduling and content recycling. If you manage client accounts, this one deal covers your membership cost immediately." discount="50% OFF" detail={<strong>3 months</strong>} saved="On any plan" />
                      <DealCard badge="Available" badgeClass="amber" title="Semrush" desc="SEO research, competitor analysis, keyword tracking. The tool that justifies billing clients for strategy work." discount="Discounted" detail={<strong>Member pricing</strong>} saved="Extended trial + discount" />
                      <DealCard badge="3 Months Free" title="Perplexity AI" desc="AI research that actually cites sources. Useful for content research, competitor intel, and client-facing reports." discount="FREE" detail={<strong>3 months Enterprise Pro</strong>} saved="Up to 50 seats" />
                    </>
                  )}

                  {activeStack === 'video' && (
                    <>
                      <DealCard badge="30% OFF" title="Riverside.fm" desc="Remote recording studio for podcasts, interviews, webinars, and client content." discount="30% OFF" detail={<strong>First year</strong>} saved="~$108/year saved" />
                      <DealCard badge="Top Pick" title="Descript" desc="Edit video and audio like a document. Fast turnaround for creators, podcasts, and agencies." discount="Discounted" detail={<strong>Member pricing</strong>} saved="~$144/year saved" />
                      <DealCard badge="Creator Tool" badgeClass="amber" title="CapCut Pro" desc="Short-form editing for Reels, TikTok, Shorts, and client social video packages." discount="Discounted" detail={<strong>Pro plan access</strong>} saved="Faster content output" />
                      <DealCard badge="3 Months Free" title="Perplexity AI" desc="Use it for script writing, episode research, video outlines, and talking point prep." discount="FREE" detail={<strong>Enterprise Pro</strong>} saved="3 months included" />
                    </>
                  )}

                  {activeStack === 'writers' && (
                    <>
                      <DealCard badge="Top Pick" title="Perplexity AI" desc="Research with citations for blog posts, newsletters, SEO briefs, and client writing." discount="FREE" detail={<strong>3 months Enterprise Pro</strong>} saved="Research time savings" />
                      <DealCard badge="Writing Tool" title="Grammarly" desc="Cleaner drafts, better tone, and fewer edits before sending work to clients or editors." discount="Discounted" detail={<strong>Premium access</strong>} saved="Sharper final copy" />
                      <DealCard badge="SEO Tool" title="Semrush" desc="Keyword research, SERP tracking, topic ideation, and optimization for content that ranks." discount="Discounted" detail={<strong>Member pricing</strong>} saved="~$240/year saved" />
                      <DealCard badge="Workflow" badgeClass="amber" title="Notion AI" desc="Organize research, build editorial calendars, and draft outlines faster." discount="Discounted" detail={<strong>AI workspace tools</strong>} saved="More output per week" />
                    </>
                  )}

                  {activeStack === 'devs' && (
                    <>
                      <DealCard badge="Up to $350K" badgeClass="red" title="Google Cloud" desc="Infrastructure credits for builds, staging, AI workloads, and client projects." discount="$350K" detail={<strong>In credits</strong>} saved="Qualifying builds" />
                      <DealCard badge="Up to $100K" badgeClass="red" title="AWS" desc="Amazon Web Services credits across EC2, S3, Lambda, and the full suite." discount="$100K" detail={<strong>In credits</strong>} saved="Qualifying accounts" />
                      <DealCard badge="65% off" title="Namecheap" desc="Domain management and hosting for client projects and personal builds." discount="65% OFF" detail={<strong>Hosting plans</strong>} saved="Bulk domain reg too" />
                      <DealCard badge="3 Months Free" title="Perplexity AI" desc="Faster than Stack Overflow for debugging context and architecture decisions." discount="FREE" detail={<strong>Enterprise Pro</strong>} saved="3 months" />
                    </>
                  )}

                  {activeStack === 'finance' && (
                    <>
                      <DealCard badge="90% OFF" badgeClass="red" title="FreshBooks" desc="The #1 deal on the platform for freelancers. Invoicing, time tracking, and client management." discount="90% OFF" detail={<strong>Via JoinSecret</strong>} saved="Exclusive portal" />
                      <DealCard badge="50% off" title="QuickBooks" desc="For freelancers who need more robust accounting - P&L, tax prep, multi-client tracking." discount="50% OFF" detail={<strong>Half price</strong>} saved="Member-only rate" />
                      <DealCard badge="Available" badgeClass="amber" title="Airwallex" desc="International payments and multi-currency accounts for freelancers with global clients." discount="Discounted" detail={<strong>Member pricing</strong>} saved="Better than standard rates" />
                      <DealCard badge="$600 Savings" badgeClass="red" title="Stripe" desc="$600 in member savings on Stripe - the payment processor you likely already use." discount="$600" detail={<strong>In savings</strong>} saved="Member-only deal" />
                    </>
                  )}

                  {activeStack === 'agency' && (
                    <>
                      <DealCard badge="Top Pick" title="PhantomBuster" desc="Lead scraping and outbound automation for agencies that need predictable pipeline." discount="25% OFF" detail={<strong>12 months</strong>} saved="Up to $2,000/year" />
                      <DealCard badge="50% OFF" title="SocialBee" desc="Manage multiple client social accounts, approvals, and publishing from one place." discount="50% OFF" detail={<strong>3 months</strong>} saved="Immediate ops savings" />
                      <DealCard badge="Client Ops" title="HubSpot" desc="CRM, forms, pipelines, and automations to manage leads and client relationships." discount="Discounted" detail={<strong>Starter tools</strong>} saved="Agency workflow value" />
                      <DealCard badge="$600 Savings" title="Stripe" desc="Process retainers, invoices, and client payments with built-in member savings." discount="$600" detail={<strong>Member deal</strong>} saved="Reduced payment costs" />
                    </>
                  )}
                </div>

                <div className="stack-total-bar">
                  <div className="stb-left">
                    {activeStack === 'marketers' && <span><strong>Marketer stack estimated savings:</strong> PhantomBuster alone saves up to $2,000/year.</span>}
                    {activeStack === 'video' && <span><strong>Video stack estimated savings:</strong> Recording, editing, and AI research tools bundled into one creator toolkit.</span>}
                    {activeStack === 'writers' && <span><strong>Writer stack estimated savings:</strong> Research, SEO, editing, and planning tools at discounted member rates.</span>}
                    {activeStack === 'devs' && <span><strong>Dev stack headline:</strong> Cloud credits represent potential value in the hundreds of thousands.</span>}
                    {activeStack === 'finance' && <span><strong>Finance stack savings:</strong> Your entire payments and accounting stack at a fraction of list price.</span>}
                    {activeStack === 'agency' && <span><strong>Agency stack estimated savings:</strong> Acquire, manage, and bill clients with tools that pay for themselves fast.</span>}
                  </div>
                  <div className="stb-right">
                    {activeStack === 'marketers'
                      ? '$2,000+/yr'
                      : activeStack === 'video'
                        ? '$300+/yr'
                        : activeStack === 'writers'
                          ? '$500+/yr'
                          : activeStack === 'devs'
                            ? '$100K-$350K'
                            : activeStack === 'finance'
                              ? '$900+/yr'
                              : '$2,000+/yr'}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="objection-section">
        <div className="section-inner">
          <div className="section-label">The Honest Answer</div>
          <Reveal><h2 className="section-title">&quot;I can just Google<br />discount codes.&quot;</h2></Reveal>

          <div className="objection-layout">
            <div>
              <div className="objection-block" style={{ marginBottom: '32px' }}>
                <div className="objection-quote">
                  &quot;I have seen these deals platforms before. It is just <em>publicly available coupon codes</em> wrapped in a membership.&quot;
                </div>
                <div className="objection-source">- Every skeptic, correctly, about most platforms</div>
              </div>
              <p style={{ fontSize: '15px', color: 'var(--white-dim)', lineHeight: 1.7, margin: '20px 0' }}>
                That is true of most. It is not true here. Here is the difference - specifically.
              </p>
              {/* <table className="compare-table">
                <thead>
                  <tr><th>What you are comparing</th><th>Coupon sites</th><th>MembershipBenefits</th></tr>
                </thead>
                <tbody>
                  <tr><td>FreshBooks discount</td><td className="cross">10-20% codes</td><td className="check">✓ 90% off - network</td></tr>
                  <tr><td>Verification</td><td className="cross">✗ Often expired</td><td className="check">✓ Actively maintained</td></tr>
                  <tr><td>AWS / GCloud credits</td><td className="cross">✗ Not on deal sites</td><td className="check">✓ Up to $450K combined</td></tr>
                  <tr><td>Time cost</td><td className="cross">✗ Hours hunting</td><td className="check">✓ One portal, done</td></tr>
                </tbody>
              </table> */}
            </div>

            <div className="answers-list">
              {[
                { i: 1, t: 'Negotiated rates, not coupon codes.', b: 'JoinSecret negotiated these at scale. No code you find on RetailMeNot gets close.' },
                { i: 2, t: 'Structurally closed to the public.', b: 'PhantomBuster at 25% off is not listed publicly. You either have access or you do not.' },
                { i: 3, t: 'Your time has a cost.', b: 'Hunting codes for 500 tools takes hours. Membership pays for itself with a single deal.' },
              ].map((a) => (
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

      <section className="proof-section">
        <div className="section-inner">
          <div className="section-label">Member Results</div>
          <Reveal><h2 className="section-title">People who stopped<br />overpaying.</h2></Reveal>
          <div className="proof-grid">
            <Reveal><ProofCard stars="★★★★★" quote="Saved $190 in the first month alone on FreshBooks. Did not change anything else." name="Ryan K." role="Freelance Copywriter" avatar="RK" /></Reveal>
            <Reveal><ProofCard stars="★★★★★" quote="The PhantomBuster deal alone was worth it. 25% off for 12 months is real money." name="Mia J." role="Growth Marketer" avatar="MJ" /></Reveal>
            <Reveal><ProofCard stars="★★★★★" quote="Claimed the Google Cloud credits for a project. That single deal covered years of membership." name="Dev T." role="Fullstack Developer" avatar="DT" /></Reveal>
          </div>
        </div>
      </section>

      <section className="cta-section" id="join">
        <div className="section-inner">
          <div className="section-label">Get Access</div>
          <h2 className="section-title">You have already read<br />enough to know.</h2>
          <p className="section-sub">Enter your email and we will send you instant access to the deal portal.</p>

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
          <p className="cta-fine">No spam. One email with your access link. That is it.</p>
          <div className="cta-or">- or -</div>
          <a href="https://deals.membershipbenefits.club" target="_blank" rel="noopener noreferrer" className="btn-primary">Browse Deals Now →</a>
        </div>
      </section>

      <footer>
        <div className="footer-logo">MembershipBenefits.club/deals</div>
        <div className="footer-note">Deals powered by JoinSecret partner network. Savings figures based on current deal terms and standard list pricing.</div>
      </footer>
    </div>
  );
};

const DealCard = ({ badge, badgeClass = '', title, desc, discount, detail, saved }) => (
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
    <div className="proof-quote">&quot;{quote}&quot;</div>
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
