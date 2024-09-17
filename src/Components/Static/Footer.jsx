import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../Context/ThemeContext";
import {
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";

function Footer() {
  const { darkMode } = useContext(ThemeContext);

  const footerLinkClasses = `text-sm font-medium transition duration-300 hover:text-primary`;
  const socialIconClasses = `w-5 h-5 transition duration-300 hover:text-primary`;

  return (
    <footer
      className={`bg-background border-t border-input ${
        darkMode ? "text-foreground" : "text-foreground"
      }`}
    >
      <div className="container mx-auto px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4 text-primary">SKB World</h2>
            <p className="text-sm mb-6">
              Empowering learners worldwide with cutting-edge courses and expert
              knowledge. Join us on a journey of continuous learning and
              professional growth.
            </p>
            <div className="flex space-x-4 mb-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className={socialIconClasses}
                aria-label="GitHub"
              >
                <FiGithub />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className={socialIconClasses}
                aria-label="Twitter"
              >
                <FiTwitter />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={socialIconClasses}
                aria-label="LinkedIn"
              >
                <FiLinkedin />
              </a>
              <a
                href="mailto:contact@skbworld.com"
                className={socialIconClasses}
                aria-label="Email"
              >
                <FiMail />
              </a>
            </div>
            <div className="space-y-2 text-sm">
              <p className="flex items-center">
                <FiPhone className="mr-2" /> +1 (123) 456-7890
              </p>
              <p className="flex items-center">
                <FiMapPin className="mr-2" /> 123 Learning Street, Education
                City, 12345
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {["Home", "About", "Courses", "Contact", "Blog"].map((item) => (
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
            <h3 className="text-lg font-semibold mb-4 text-primary">
              Resources
            </h3>
            <ul className="space-y-2">
              {[
                "Course Catalog",
                "Student Resources",
                "Career Services",
                "Alumni Network",
                "Partnership Programs",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className={footerLinkClasses}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-input text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p>
              &copy; {new Date().getFullYear()} SKB World. All rights reserved.
            </p>
            <div className="flex space-x-4">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (item) => (
                  <Link
                    key={item}
                    to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className={footerLinkClasses}
                  >
                    {item}
                  </Link>
                )
              )}
            </div>
          </div>

          <h2>
            <Link to={"admin/secure/login"}>Admin</Link>
          </h2>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
