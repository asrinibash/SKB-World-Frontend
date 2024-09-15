import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../Context/ThemeContext";
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from "react-icons/fi";

function Footer() {
  const { darkMode } = useContext(ThemeContext);

  const footerLinkClasses = `text-sm font-medium transition duration-300 hover:text-gray-400`;
  const socialIconClasses = `w-5 h-5 transition duration-300 hover:text-gray-400`;

  return (
    <footer className={`bg-background border-t border-input ${darkMode ? 'text-gray-200' : 'text-gray-600'}`}>
      <div className="container mx-auto px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold mb-4">SKB World</h2>
            <p className="text-sm mb-4">Empowering learners worldwide with cutting-edge courses and expert knowledge.</p>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={socialIconClasses}>
                <FiGithub />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={socialIconClasses}>
                <FiTwitter />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={socialIconClasses}>
                <FiLinkedin />
              </a>
              <a href="mailto:contact@skbworld.com" className={socialIconClasses}>
                <FiMail />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-md font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "About", "Courses", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className={footerLinkClasses}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-md font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className={footerLinkClasses}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-input text-sm text-center">
          <p>&copy; {new Date().getFullYear()} SKB World. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;