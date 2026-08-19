import React, { useState } from 'react';
import '../styles/LaunchKit.css';
import { Link } from 'react-router-dom';


const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button className={`copy-btn ${copied ? 'copied' : ''}`} onClick={handleCopy}>
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
};

const LaunchKit = () => {
  return (
    <div className="launch-kit">
      <nav>
        <Link to="/" className="header-logo">
          <img
            src="/mbc-logo.webp"
            alt="MembershipBenefits.club"
          />
        </Link>
        <a href="https://membershipbenefits.club/pricing" className="nav-cta">Get Started</a>
      </nav>

      <div className="hero">
        <div className="hero-eyebrow">Done-For-You</div>
        <h1>Launch kit for<br />community owners</h1>
        <p>Six assets. Copy, paste, swap in your name and portal link. Every asset is written to sound like you, not like a software company announcement.</p>
      </div>

      <div className="instructions">
        <strong>How to use this kit:</strong> Every placeholder is highlighted in <span className="placeholder">[BRACKETS]</span> like this. At minimum, swap in your name, your community name, and your portal link. Where noted, add the 1-2 deals most relevant to your audience.
      </div>

      <div className="kit-body">
        {/* Asset 01 */}
        <div className="asset">
          <div className="asset-header">
            <div className="asset-number">Asset 01</div>
            <div className="asset-title">Announcement Email</div>
            <div className="asset-note">Under 250 words</div>
          </div>
          <div className="card">
            <div className="card-label">Subject Lines — Pick One</div>
            <div className="subject-lines">
              <div className="subject-line"><span className="num">A</span> Your <span className="placeholder">[COMMUNITY NAME]</span> member perk is live</div>
              <div className="subject-line"><span className="num">B</span> FreshBooks 90% off. QuickBooks 50% off. These are yours now.</div>
              <div className="subject-line"><span className="num">C</span> I added something to your membership today</div>
            </div>
            <div className="card-label">Body Copy</div>
            <div className="copy-block">
              {`Hey [FIRST NAME],

I just added something to your [COMMUNITY NAME] membership that you're going to want to bookmark.

You now have access to a private software deal portal with 500+ discounts unavailable to the general public. These aren't coupon codes. Merchants reserve their deepest pricing for verified closed audiences like ours, not public coupon sites.

A few things already in there:

• FreshBooks — 90% off (vs. 10% publicly)
• QuickBooks — 50% off
• PhantomBuster — saves up to $2,000/year
• Perplexity AI — 3 months free Enterprise Pro
• Riverside.fm — 30% off your first year
• Google Cloud — up to $350,000 in credits
• AWS — up to $100,000 in credits
[OPTIONAL: Add 1–2 deals specific to your audience niche here]
• 500+ more across AI, marketing, video, finance, and dev tools

The FreshBooks deal alone saves most people over $300. That's more than most people spend on a single software subscription in a month.

A few of these deals have redemption caps. Once the cap hits, they close with no exceptions. If you use any of these tools or have been considering them, grab your access now.

[ACCESS YOUR PORTAL →] [PORTAL LINK]

This is included in your membership at no extra cost.

[YOUR NAME]
[COMMUNITY NAME]

P.S. Most members find at least one deal worth more than a full month's membership in the first 10 minutes.`}
            </div>
            <CopyButton text={`Hey [FIRST NAME],

I just added something to your [COMMUNITY NAME] membership that you're going to want to bookmark.

You now have access to a private software deal portal with 500+ discounts unavailable to the general public. These aren't coupon codes. Merchants reserve their deepest pricing for verified closed audiences like ours, not public coupon sites.

A few things already in there:

• FreshBooks — 90% off (vs. 10% publicly)
• QuickBooks — 50% off
• PhantomBuster — saves up to $2,000/year
• Perplexity AI — 3 months free Enterprise Pro
• Riverside.fm — 30% off your first year
• Google Cloud — up to $350,000 in credits
• AWS — up to $100,000 in credits
[OPTIONAL: Add 1–2 deals specific to your audience niche here]
• 500+ more across AI, marketing, video, finance, and dev tools

The FreshBooks deal alone saves most people over $300. That's more than most people spend on a single software subscription in a month.

A few of these deals have redemption caps. Once the cap hits, they close with no exceptions. If you use any of these tools or have been considering them, grab your access now.

[ACCESS YOUR PORTAL →] [PORTAL LINK]

This is included in your membership at no extra cost.

[YOUR NAME]
[COMMUNITY NAME]

P.S. Most members find at least one deal worth more than a full month's membership in the first 10 minutes.`} />
          </div>
        </div>

        {/* Asset 02 */}
        <div className="asset">
          <div className="asset-header">
            <div className="asset-number">Asset 02</div>
            <div className="asset-title">Social Post</div>
            <div className="asset-note">LinkedIn · Facebook · Community feed</div>
          </div>
          <div className="card">
            <div className="version-label">Version 1 — Benefit First</div>
            <div className="copy-block">
              {`I just added a private software deal portal to [COMMUNITY NAME] memberships. No extra cost.

You now have access to 500+ discounts that don't exist publicly. Not coupon codes. Actual closed-network pricing that merchants reserve for verified communities.

FreshBooks: 90% off (10% publicly).
QuickBooks: 50% off.
PhantomBuster: saves up to $2,000.
Perplexity AI: 3 months free Enterprise Pro.
[OPTIONAL: Add one deal that fits your specific audience]

It's live now and already included in your membership. No extra cost.

[PORTAL LINK] — go see what applies to your stack.

[YOUR NAME]`}
            </div>
            <div className="version-divider"></div>
            <div className="copy-block">
              {`Why does FreshBooks give 90% off inside private communities but only 10% off publicly?

Because merchants reserve their best pricing for verified closed audiences. Public coupon sites get scraps.

I just added a portal with 500+ of these closed-network deals to [COMMUNITY NAME] memberships. No extra cost.

QuickBooks 50% off. PhantomBuster saves up to $2,000. Perplexity AI free for 3 months. [OPTIONAL: Add one more deal relevant to your audience] And 490+ more.

Already included in your membership.

[PORTAL LINK]

[YOUR NAME]`}
            </div>
            <CopyButton text={`I just added a private software deal portal to [COMMUNITY NAME] memberships. No extra cost.

You now have access to 500+ discounts that don't exist publicly. Not coupon codes. Actual closed-network pricing that merchants reserve for verified communities.

FreshBooks: 90% off (10% publicly).
QuickBooks: 50% off.
PhantomBuster: saves up to $2,000.
Perplexity AI: 3 months free Enterprise Pro.
[OPTIONAL: Add one deal that fits your specific audience]

It's live now and already included in your membership. No extra cost.

[PORTAL LINK] — go see what applies to your stack.

[YOUR NAME]`} />
          </div>
        </div>

        {/* FAQ Asset */}
        <div className="asset">
          <div className="asset-header">
            <div className="asset-number">Asset 05</div>
            <div className="asset-title">Member FAQ One-Pager</div>
            <div className="asset-note">Paste into docs or posts</div>
          </div>
          <div className="card">
            <div className="faq-item">
              <div className="faq-q"><span className="faq-q-num">Q1</span> Is this free for members?</div>
              <div className="faq-a">Yes. Access to the deal portal is included in your <span className="placeholder">[COMMUNITY NAME]</span> membership at no extra cost.</div>
            </div>
            <div className="faq-item">
              <div className="faq-q"><span className="faq-q-num">Q2</span> How do I access it?</div>
              <div className="faq-a">Click <span className="placeholder">[PORTAL LINK]</span>, register once, and you'll have full access immediately.</div>
            </div>
            <CopyButton text={`Q: Is this free for members?
A: Yes. Access to the deal portal is included in your [COMMUNITY NAME] membership at no extra cost.

Q: How do I access it?
A: Click [PORTAL LINK], register once, and you'll have full access immediately.`} />
          </div>
        </div>

        {/* SMS Asset */}
        <div className="asset">
          <div className="asset-header">
            <div className="asset-number">Asset 06</div>
            <div className="asset-title">SMS / Short DM</div>
          </div>
          <div className="card">
            <div className="sms-box">
              <span className="placeholder">[COMMUNITY NAME]</span> perk just dropped: 500+ software deals, up to 90% off. FreshBooks, QuickBooks, PhantomBuster & more. Yours free: <span className="placeholder">[PORTAL LINK]</span>
            </div>
            <div className="char-count">~130 characters · Under 160 limit ✓</div>
            <CopyButton text={`[COMMUNITY NAME] perk just dropped: 500+ software deals, up to 90% off. FreshBooks, QuickBooks, PhantomBuster & more. Yours free: [PORTAL LINK]`} />
          </div>
        </div>
      </div>

      <footer className="kit-footer">
        <div>Proprietary Launch Kit — <strong>MembershipBenefits.club</strong></div>
        <div>v1.2.0 — Updated 2026</div>
      </footer>
    </div>
  );
};

export default LaunchKit;
