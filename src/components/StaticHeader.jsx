import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const StaticHeader = ({ activePage }) => {
    const user = useSelector((state) => state.Auth?.user);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
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
                    <a href="https://www.membershipbenefits.club/how-it-works" className={activePage === 'how-it-works' ? 'active' : ''}>How It Works</a>
                    <a href={user?.plan === 'free' ? '/pricing' : "https://www.membershipbenefits.club/pricing"} className={activePage === 'pricing' ? 'active' : ''}>Pricing</a>
                    <a href="/deals" className={activePage === 'deals' ? 'active' : ''}>Deals</a>
                    <a href="https://www.membershipbenefits.club/about-us" className={activePage === 'about-us' ? 'active' : ''}>About Us</a>
                    <a href="https://www.membershipbenefits.club/faq" className={activePage === 'faq' ? 'active' : ''}>FAQ</a>
                    {!localStorage.getItem('authToken') && (
                        <div className="header-actions">
                            <a href="https://portal.membershipbenefits.club/login" className="btn-login">Login</a>
                            <a href="https://www.membershipbenefits.club/pricing" className="btn-start">Start Now</a>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default StaticHeader;
