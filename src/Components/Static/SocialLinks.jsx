/* eslint-disable no-unused-vars */
import React from "react";
import { FiGithub, FiInstagram, FiLinkedin, FiTwitter } from "react-icons/fi";
function SocialLinks() {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Connect with me</h3>
      <div className="flex gap-4">
        <a
          className="text-muted-foreground hover:text-foreground"
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FiLinkedin />
        </a>
        <a
          className="text-muted-foreground hover:text-foreground"
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FiTwitter />
        </a>
        <a
          className="text-muted-foreground hover:text-foreground"
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FiInstagram />
        </a>
      </div>
    </div>
  );
}

export default SocialLinks;
