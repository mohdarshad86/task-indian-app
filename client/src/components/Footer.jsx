import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="footer-logo">
        <Link to="/">
          <img src="https://uploads-ssl.webflow.com/61e75b706cf5aa711b66c13e/6480fa5d11a49048cbf8b5a8_captionai-standalone-free-ai-caption-generator.jpg" style={{maxWidth:80}} alt="Logo" />
        </Link>
      </div>
      <div className="footer-links">
        <Link to="/pricing">Pricing</Link>
        <Link to="/privacy">Privacy</Link>
        <Link to="/terms-of-use">Terms of Use</Link>
      </div>
    </footer>
  );
};

export default Footer;
