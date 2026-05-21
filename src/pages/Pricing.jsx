import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import StaticFooter from '../components/StaticFooter';
import '../styles/StaticPages.css';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`}>
      <div className="faq-q" onClick={onClick}>
        {question}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="faq-a"
            style={{ overflow: 'hidden' }}
          >
            <p>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Pricing = () => {
  const user = useSelector((state) => state.Auth?.user);
  const [openIndex, setOpenIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pricingFaqs = [
    {
      question: "What happens after the 14-day trial?",
      answer: "You pick a plan and enter payment. If you don't, access pauses. No surprise charges. No auto-billing during the trial."
    },
    {
      question: "Can I upgrade or downgrade anytime?",
      answer: "Yes. Switch plans month to month. Upgrades are instant. Downgrades take effect at the next billing cycle."
    },
    {
      question: "What if I need more than 50 members but less than full Enterprise?",
      answer: "Reach out on the Enterprise form. We have flexible plans between Community and full white-label. Pricing scales with member count, not complexity."
    },
    {
      question: "Is there an annual discount?",
      answer: "Yes. Annual plans save 20%. Reach out after starting your trial and we'll set it up."
    }
  ];

  return (
    <div className="static-page-container">
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
            <a href="https://www.membershipbenefits.club/how-it-works">How It Works</a>
            <a href={user?.plan === 'free' ? '/pricing' : "https://www.membershipbenefits.club/pricing"} className="active">Pricing</a>
            <a href="/deals">Deals</a>
            <a href="https://www.membershipbenefits.club/about-us">About Us</a>
            <a href="https://www.membershipbenefits.club/faq">FAQ</a>
            {!localStorage.getItem('authToken') && (
              <div className="header-actions">
                <a href="https://portal.membershipbenefits.club/login" className="btn-login">Login</a>
                <a href="https://www.membershipbenefits.club/pricing" className="btn-start">Start Now</a>
              </div>
            )}
          </nav>
        </div>
      </header>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="section"
      >
        <div className="section-inner" style={{ textAlign: 'center' }}>
          <div className="overline">Pricing</div>
          <h2 style={{ color: 'white' }}>That’s one of many great deals!. </h2>
          <h2 style={{ color: 'var(--green)' }}>Become a member and it’s yours! </h2>

        </div>
      </motion.section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-inner">
          <div className="pricing-grid">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="pricing-card"
            >
              <div className="pricing-name">Solo</div>
              <div className="pricing-price">$29<span>/mo</span></div>
              <div className="pricing-desc">For individual professionals and freelancers who want personal access to all deals.</div>
              <ul className="pricing-features">
                <li>Personal access to every deal</li>
                <li>400+ discounts on top tools</li>
                <li>New premium deals monthly</li>
              </ul>
              <a href="https://buy.stripe.com/28EdR93QNf1EcQP3Bg1ck01" className="btn btn-ghost" style={{ backgroundColor: 'white', color: '#000' }}>Get Started</a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="pricing-card featured"
            >
              <div className="pricing-badge">Most Popular</div>
              <div className="pricing-name">Community</div>
              <div className="pricing-price">$97<span>/mo</span></div>
              <div className="pricing-desc">For communities, associations, and membership groups up to 50 members.</div>
              <ul className="pricing-features">
                <li>50 authorized member logins</li>
                <li>Every member gets all deals</li>
                <li>Membership verification</li>
                <li>New premium deals monthly</li>
                <li>7/7 premium support</li>
              </ul>
              <a href="https://buy.stripe.com/14A3cv0EB1aO7wv5Jo1ck03" className="btn btn-primary">Start Your Community Plan</a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="pricing-card"
            >
              <div className="pricing-name">Enterprise</div>
              <div className="pricing-price" style={{ fontSize: '34px' }}>Custom</div>
              <div className="pricing-desc">For large associations and communities 50+ members. Full white-label control.</div>
              <ul className="pricing-features">
                <li>Full white-label branding</li>
                <li>Unlimited member access</li>
                <li>Custom domain</li>
                <li>Add your own vendor deals</li>
                <li>Job board & event feed add-ons</li>
                <li>Usage analytics dashboard</li>
                <li>7/7 premium support</li>
              </ul>
              <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0JeLlE9aCBV1emvEd1BcRMcFysNEAAPXuCdfqxDZJjReDM72JV6oudD84TfKtiGF0IR0Jfi6yn?gv=true" className="btn btn-ghost" style={{ backgroundColor: 'white', color: '#000' }}>Talk to Us</a>
            </motion.div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <p style={{ color: 'var(--gray-100)', fontSize: '15px', marginBottom: '10px' }}>All plans include a 14-day free trial. No credit card required to start.</p>
            <p style={{ color: 'var(--green)', fontSize: '14px', fontWeight: 600 }}>30-day money-back guarantee. If your community doesn't see measurable value, we refund your first month.</p>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--dark-card)', paddingTop: '48px', paddingBottom: '48px' }}>
        <div className="section-narrow">
          <h2 style={{ textAlign: 'center', marginBottom: '28px' }}>Common Pricing Questions</h2>
          {pricingFaqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>
      </section>

      <section className="section cta-section">
        <div className="section-narrow" style={{ position: 'relative', zIndex: 2 }}>
          <h2>Not sure which plan?<br />Start free and figure it out.</h2>
          <div className="cta-ctas">
            <a href="#" className="btn btn-primary btn-lg">Start Your 14-Day Trial →</a>
          </div>
          <p className="micro">No credit card required.</p>
        </div>
      </section>

      <StaticFooter />
    </div>
  );
};

export default Pricing;
