import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleSignOut = () => {
    // Add sign out logic here
  };
  
  const handleProfile = () => {
    // Add profile logic here
  };
  return (
    <nav>
      <div className="navbar-logo">
        <Link to="/">
          <img src="https://uploads-ssl.webflow.com/61e75b706cf5aa711b66c13e/6480fa5d11a49048cbf8b5a8_captionai-standalone-free-ai-caption-generator.jpg" style={{ maxWidth: 80 }} alt="Logo" />
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Projects</Link>
        <Link to="/pricing">Pricing</Link>
        <Link to="/affiliate">Affiliate</Link>
        <Link to="/community">Community</Link>
        <div className="user-info" onClick={toggleUserMenu}>
          <img src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png" style={{ maxWidth: 40}} alt="User" />
        </div>
        {userMenuOpen && (
          <div className="user-menu">
            <p>Mohd Arshad</p>
            <p>arshad@gmail.com</p>
            <button onClick={handleProfile}>My Profile</button>
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
