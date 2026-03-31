import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
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

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What is MembershipBenefits.club?",
      answer: "A white-labeled software deals marketplace for community owners, associations, and mailing list operators. Plug it into your membership and your members instantly get 30-80% off 400+ tools. Your brand. Their savings. Your retention."
    },
    {
      question: "How is this different from free trials or coupon codes?",
      answer: "Free trials expire. These are negotiated discounts, credits, and extended plans that go beyond what's publicly available. Many are exclusive to our network. Some include $10,000+ in credits on a single tool."
    },
    {
      question: "Do I need a developer?",
      answer: "No. You give us your logo, brand colors, and either API access or a Google Sheet of member emails. We handle everything. Most communities are live in under 5 business days."
    },
    {
      question: "What platforms do you integrate with?",
      answer: "Skool, Circle, Mighty Networks, Slack, Discord, Kajabi, Teachable, Thinkific, WordPress/BuddyBoss, and any system that can export a member list."
    },
    {
      question: "How do members access the deals?",
      answer: "They click a link (or go to deals.yourcommunity.com), log in with SSO, and browse. No separate accounts. No extra passwords."
    },
    {
      question: "Does this cost my members anything extra?",
      answer: "That's up to you. Most include it free. Some use it as a premium upsell tier. Some use it as a lead magnet for signups."
    },
    {
      question: "What does this cost me?",
      answer: "$29/mo for individual access. $97/mo for communities up to 50 members. Custom pricing for larger organizations. 14-day free trial, no credit card required."
    },
    {
      question: "What if my members don't use these tools?",
      answer: "400+ tools across AI, marketing, productivity, sales, finance, ops, design, and development. The odds a business owner uses zero of them are essentially zero."
    },
    {
      question: "Can I add my own deals?",
      answer: "Yes. On Enterprise, you can add your own vendor deals and hide ones you don't want."
    },
    {
      question: "Is there a long-term contract?",
      answer: "No. Month-to-month. Cancel anytime. If the value doesn't speak for itself, we don't want to trap you."
    },
    {
      question: "What support do I get?",
      answer: "7/7 premium support on Community and Enterprise plans. We help with setup, launch comms, and ongoing questions."
    },
    {
      question: "Who built this?",
      answer: "Maury Rogow. Former CMO of the VR/AR Association and director of the Applied AI Association. Built this because he lived the retention problem and got tired of the same half-measures."
    }
  ];

  return (
    <div className="static-page-container">
      <Navbar />
      
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="section"
      >
        <div className="section-narrow" style={{ textAlign: 'center' }}>
          <div className="overline">FAQ</div>
          <h1>Questions We Get.<br />Answers That Don't Waste Your Time.</h1>
        </div>
      </motion.section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-narrow">
          {faqs.map((faq, index) => (
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
          <h2>Still have questions?<br />Start free and see it for yourself.</h2>
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

export default FAQ;
