import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Bell, MessageSquare, Settings, LogOut, User, Users, Briefcase, Shield, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { logout, fetchUserProfile } from "../redux/AuthSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Auth.user);
  const isAuthenticated = !!user;
  const token = localStorage.getItem('authToken'); // Get token from localStorage

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [regUrl, setRegUrl] = useState('');

  const navigate = useNavigate();
  const location = useLocation(); // Add this line to get the current location

  // Fetch user profile from API
  useEffect(() => {
    const fetchProfile = async () => {
      if (isAuthenticated && user?.role === 'client' && token) {
        console.log("Attempting to fetch profile with token:", token);
        try {
          const response = await fetch(` https://membershiptbenefits-server-1.onrender.com/api/user-profile/${user._id}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          setUserProfile(data.data.user);
          localStorage.setItem('userStatus', data.data.user.clientVerification.status); // Store profile in localStorage
        } catch (error) {
          console.error('Error fetching user profile:', error.message);
          // If the token is invalid, you might want to log the user out
          if (error.message.includes('401')) {
            console.log("Token seems to be invalid. Logging out.");
            handleLogout();
          }
        }
      }

      // Fetch Community Invite Link for clients
      if (isAuthenticated && user?.role === 'client' && token) {
        try {
          const response = await fetch('https://membershiptbenefits-server-1.onrender.com/api/auth/my-community', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
          });
          if (response.ok) {
            const data = await response.json();
            setRegUrl(data.data.registrationUrl);
          }
        } catch (error) {
          console.error('Error fetching community link:', error);
        }
      }
    };

    fetchProfile();
  }, [isAuthenticated, user, token]);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const target = event.target;
      if (!target.closest(".profile-menu") && !target.closest(".profile-trigger")) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, isAuthenticated]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    console.log("logout is clicked")
    dispatch(logout());
    navigate('/');
    setIsProfileOpen(false);
  };

  // Navigation links based on user role
  const getNavLinks = () => {
    if (user?.role === "admin") {
      return [
        { name: "Dashboard", href: "/admin" },
        { name: "Users", href: "/admin/users" },
        { name: "Verify Users", href: "/admin/verify-users" },
        { name: "Issues", href: "/admin/issues" },
        { name: "Reports", href: "/admin/reports" },
        { name: "Settings", href: "/admin/settings" },
      ];
    }

    return [
      { name: "How It Works", href: "https://www.membershipbenefits.club/how-it-works" },
      { name: "Pricing", href: user?.plan === 'free' ? '/pricing' : "https://www.membershipbenefits.club/pricing" },
      { name: "Deals", href: "/deals" },
      { name: "About Us", href: "https://www.membershipbenefits.club/about-us" },
      { name: "FAQ", href: "https://www.membershipbenefits.club/faq" },
    ];
  };

  const navLinks = getNavLinks();

  const getVerificationStatus = () => {
    if (!isAuthenticated || user?.role !== 'client' || !userProfile) {
      return null;
    }

    const clientVerification = userProfile.clientVerification || {};


    switch (clientVerification.status) {
      case 'not-verified':
        return {
          text: 'Verify Your Company',
          icon: <Shield size={16} className="mr-2 text-yellow-500" />,
          action: () => navigate('/client/verify-company')
        };
      case 'pending':
        return {
          text: 'Verification Pending',
          icon: <Clock size={16} className="mr-2 text-blue-500" />
        };
      case 'verified':
        return {
          text: 'Company Verified',
          icon: <CheckCircle size={16} className="mr-2 text-green-500" />
        };
      case 'rejected':
        return {
          text: 'Verification Rejected',
          icon: <AlertCircle size={16} className="mr-2 text-red-500" />,
          action: () => navigate('/verify-company')
        };
      default:
        return null;
    }
  };

  const verificationStatus = getVerificationStatus();

  return (
    <header className="site-header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="header-logo">
          <img
            src="https://images.squarespace-cdn.com/content/v1/69b30bfaac362e539cfe126d/07b0c51a-28f8-40b9-98cc-d5d1ab77ec6c/logo.png?format=1500w"
            alt="MembershipBenefits.club"
          />
        </Link>

        {/* Mobile Burger */}
        <div className={`mobile-burger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Navigation Wrapper */}
        <nav className={`header-nav ${isMenuOpen ? 'mobile-open' : ''}`}>
          {/* Desktop/Mobile Navigation Links */}
          {navLinks.map((link, index) => {
            const isExternal = link.href.startsWith('http');
            const isActive = location.pathname === link.href;

            return isExternal ? (
              <a
                key={index}
                href={link.href}
                className={isActive ? "active" : ""}
                onClick={closeMenu}
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={index}
                to={link.href}
                className={isActive ? "active" : ""}
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            );
          })}

          {/* Header Actions (Auth / Profile) */}
          <div className="header-actions">
            {isAuthenticated ? (
              <>
                {/* User Profile Dropdown */}
                <div className="relative">
                  <button onClick={toggleProfile} className="profile-trigger flex items-center gap-2 focus:outline-none">
                    <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-[#00d26a]">
                      <img
                        src="https://cdn-icons-png.freepik.com/256/12225/12225828.png?ga=GA1.1.929895557.1769420934&semt=ais_white_label"
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium text-white truncate max-w-[100px] sm:max-w-[150px]">{user?.name}</span>
                    <ChevronDown size={16} className="text-white flex-shrink-0" />
                  </button>

                  {isProfileOpen && (
                    <div className="profile-menu absolute right-0 mt-2 w-48 md:w-56 rounded-md bg-white border border-slate-200 shadow-lg py-1 z-50">
                      <div className="px-4 py-3 border-b border-slate-200">
                        <p className="text-sm text-slate-900 font-bold">{userProfile?.name || user?.name}</p>
                        <p className="text-xs text-slate-500 truncate">{userProfile?.email || user?.email}</p>
                      </div>
                      <div className="mt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center px-4 py-2 text-sm text-slate-900 hover:bg-slate-100 transition-colors"
                        >
                          <LogOut size={16} className="mr-2" />
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Copy Invite Link - Only for client owners */}
                {user?.role === 'client' && regUrl && (
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(regUrl);
                      alert('Invite link copied to clipboard!');
                    }}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-xs font-bold transition-all border border-white/10 text-white"
                  >
                    <Users size={14} />
                    Invite
                  </button>
                )}
              </>
            ) : !localStorage.getItem('authToken') ? (
              <>
                <Link to="/login" className="btn-login" onClick={closeMenu}>
                  Log in
                </Link>
                <a
                  href="https://www.membershipbenefits.club/pricing"
                  className="btn-start"
                  onClick={closeMenu}
                >
                  Start Now
                </a>
              </>
            ) : null}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;