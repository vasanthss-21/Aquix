import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useUser } from '../contexts/UserContext';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const navigate = useNavigate();
  const { userName } = useUser();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedUser) => {
      setUser(loggedUser);
    });
    return () => unsubscribe();
  }, []);
  
  useEffect(() => {
    if (showLoginMessage) {
      const timer = setTimeout(() => {
        setShowLoginMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showLoginMessage]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const handleCloseMenu = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setIsMenuOpen(false);
      setIsAnimatingOut(false);
    }, 400); 
  };

  const handleToggleMenu = () => {
    if (isMenuOpen && !isAnimatingOut) {
      handleCloseMenu();
    } else if (!isMenuOpen) {
      setIsMenuOpen(true);
    }
  };

  const handleProtectedLinkClick = (path) => {
    if (user) {
      navigate(path);
    } else {
      setShowLoginMessage(true);
    }
    if (isMenuOpen) {
        handleCloseMenu();
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes topToBottom {
            from { opacity: 0; transform: translateY(-15px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes bottomToTop {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-15px); }
          }
          @keyframes fadeInDown {
            from { opacity: 0; transform: translate(-50%, -20px); }
            to { opacity: 1; transform: translate(-50%, 0); }
          }

          .navbar {
            background-color: rgba(0, 0, 0, 0.26);
            backdrop-filter: blur(25px);
            -webkit-backdrop-filter: blur(25px);
            border-bottom: 1px solid #ff9800;
            border-top: 1px solid #ff9800;
            padding: 15px 5%;
            position: sticky;
            top: 0;
            z-index: 1000;
            width: 90%;
          }
          .navbar-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
          }
          .logo {
            width: 35px;
            height: auto;
          }
          .nav-links {
            display: flex;
            align-items: center;
            gap: 35px;
          }
          .nav-links a, .nav-links .auth-link-mobile {
            color: white;
            text-decoration: none;
            font-size: 18px;
            font-weight: 500;
            transition: color 0.3s ease;
            position: relative;
            padding-bottom: 5px;
            cursor: pointer;
          }
          .nav-links a::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background-color: #ffeb3b;
            transition: width 0.3s ease;
          }
          .nav-links a:hover {
            color: #ffeb3b;
          }
          .nav-links a:hover::after {
            width: 100%;
          }
          .user-display a, .user-display span {
            color: white;
            border: 1.5px solid white;
            padding: 8px 16px;
            border-radius: 20px;
            text-decoration: none;
            font-weight: 500;
            transition: background-color 0.3s, color 0.3s;
          }
          .user-display a:hover, .user-display span:hover {
            background-color: white;
            color: rgb(4, 23, 71);
          }
          
          .login-prompt {
            position: fixed;
            top: 80px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #ffc107;
            color: black;
            padding: 12px 24px;
            border-radius: 8px;
            z-index: 1001;
            font-weight: 500;
            box-shadow: 0 4px 10px rgba(0,0,0,0.2);
            animation: fadeInDown 0.5s;
          }
          
          .mobile-title {
              display: none;
          }

          @media (max-width: 992px) {
            .navbar-container {
                position: relative;
            }
            .mobile-title {
                display: block;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                color: white;
                font-size: 1.5rem;
                font-weight: 600;
                pointer-events: none;
            }
            .menu-icon {
              display: flex;
              cursor: pointer;
              flex-direction: column;
              gap: 6px;
              z-index: 1002;
            }
            .line {
              width: 2rem;
              height: 0.2rem;
              background: white;
              border-radius: 10px;
              transition: all 0.3s linear;
              position: relative;
              transform-origin: 1px;
            }
            .menu-icon.open .line1 {
              transform: rotate(45deg);
            }
            .menu-icon.open .line2 {
              opacity: 0;
              transform: translateX(20px);
            }
            .menu-icon.open .line3 {
              transform: rotate(-45deg);
            }

            .nav-links {
              display: none;
              position: absolute;
              top: 80px;
              transform: translateX(-50%);
              border: 1px solid #ff9800;
              border-radius: 20px;
              width: 100%;
              flex-direction: column;
              padding: 20px 0;
              gap: 15px;
            }
            .nav-links.active {
              display: flex;
              background-color: rgba(0, 0, 0, 0.8);
              backdrop-filter: blur(10px);
              -webkit-backdrop-filter: blur(10px);
              animation: topToBottom 0.4s ease-out forwards;
            }
            .nav-links.closing {
              display: flex;
              background-color: rgba(0, 0, 0, 0.8);
              backdrop-filter: blur(10px);
              -webkit-backdrop-filter: blur(10px);
              animation: bottomToTop 0.4s ease-out forwards;
            }
            .user-display {
              display: none;
            }
          }
        `}
      </style>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/home">
            <img className="logo" src="logo.png" alt="Logo" />
          </Link>

          <div className="mobile-title">Aquix</div>
          
          <div className={`menu-icon ${isMenuOpen && !isAnimatingOut ? 'open' : ''}`} onClick={handleToggleMenu}>
            <div className="line line1"></div>
            <div className="line line2"></div>
            <div className="line line3"></div>
          </div>

          <div className="nav-links">
            <Link to="/home">Home</Link>
            <a onClick={() => handleProtectedLinkClick('/story/1')}>Story</a>
            <a onClick={() => handleProtectedLinkClick('/quiz')}>Mastery</a>
            <a onClick={() => handleProtectedLinkClick('/dashboard')}>Dashboard</a>
            {user && (
              <a onClick={handleLogout}>Log Out</a>
            )}
          </div>
          
          {isMenuOpen && (
             <div className={`nav-links ${isAnimatingOut ? 'closing' : 'active'}`}>
                <Link to="/home" onClick={handleCloseMenu}>Home</Link>
                <a onClick={() => handleProtectedLinkClick('/story/1')}>Story</a>
                <a onClick={() => handleProtectedLinkClick('/quiz')}>Mastery</a>
                <a onClick={() => handleProtectedLinkClick('/dashboard')}>Dashboard</a>
                {user ? (
                  <a className="auth-link-mobile" onClick={() => { handleLogout(); handleCloseMenu(); }}>Log Out</a>
                ) : (
                  <Link to="/login" className="auth-link-mobile" onClick={handleCloseMenu}>Login / Sign Up</Link>
                )}
             </div>
          )}
          
          <div className="user-display">
            {user ? (
              <span>Hello, {userName || user.displayName || user.email}</span>
            ) : (
              <Link to="/login">Login / Sign Up</Link>
            )}
          </div>
        </div>
      </nav>
      {showLoginMessage && (
        <div className="login-prompt">
          Please log in to access this page.
        </div>
      )}
    </>
  );
};

export default Navbar;

