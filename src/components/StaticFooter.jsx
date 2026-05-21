import React from 'react';

const StaticFooter = () => {
  return (
    <footer className="site-footer" style={{ padding: '32px 28px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
        <ul style={{ display: 'flex', gap: '20px', listStyle: 'none', flexWrap: 'wrap', padding: 0, margin: 0 }}>
          <li><a href="/privacy" style={{ color: 'var(--gray-300)', textDecoration: 'none', fontSize: '13px' }}>Privacy Policy</a></li>
          <li><a href="/terms" style={{ color: 'var(--gray-300)', textDecoration: 'none', fontSize: '13px' }}>Terms of Service</a></li>
          <li><a href="/contact" style={{ color: 'var(--gray-300)', textDecoration: 'none', fontSize: '13px' }}>Contact</a></li>
        </ul>
        <div style={{ fontSize: '12px', color: 'var(--gray-500)' }}>© {new Date().getFullYear()} MembershipBenefits.club. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default StaticFooter;
