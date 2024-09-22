import React from "react";
import { motion } from "framer-motion";

function PrivacyPolicy() {
  return (
    <motion.section
      id="privacy-policy"
      className="container mx-auto py-12 px-4 md:py-16 md:px-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-6 text-sm md:text-base lg:text-xl w-full md:w-3/4 lg:w-2/3 text-left">
        <div className="space-y-2 animate-fade-in">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl">
            Privacy <span className="text-accent">Policy</span>
          </h2>
          <p className="text-muted-foreground">
            Your privacy is important to us. This Privacy Policy outlines how we
            collect, use, and protect your personal information.
          </p>
        </div>

        {/* Ordered list for all content */}
        <ol className="space-y-4 list-decimal list-inside">
          <li>
            <h3 className="text-xl font-semibold">Information We Collect</h3>
            <p className="text-muted-foreground">
              We collect information you provide directly to us, including your
              name, email address, and other details when you contact us or use
              our services.
            </p>
          </li>

          <li>
            <h3 className="text-xl font-semibold">
              How We Use Your Information
            </h3>
            <p className="text-muted-foreground">
              We use your information to provide, maintain, and improve our
              services, as well as to communicate with you about updates or
              issues related to our platform.
            </p>
          </li>

          <li>
            <h3 className="text-xl font-semibold">Sharing Your Information</h3>
            <p className="text-muted-foreground">
              We do not sell, trade, or transfer your personal information to
              outside parties, except when required by law or to protect our
              rights.
            </p>
          </li>

          <li>
            <h3 className="text-xl font-semibold">Your Rights</h3>
            <p className="text-muted-foreground">You have the right to:</p>
            <ol className="list-decimal list-inside ml-6">
              <li>Access, modify, or delete your personal information.</li>
              <li>Opt out of receiving communications from us.</li>
            </ol>
          </li>

          <li>
            <h3 className="text-xl font-semibold">Changes to This Policy</h3>
            <p className="text-muted-foreground">
              We may update this Privacy Policy occasionally. If we make any
              significant changes, we will notify you via email or by posting a
              notice on our website.
            </p>
          </li>
        </ol>
        <p className="text-muted-foreground">
          If you have any questions about this Privacy Policy, please contact us
          via our contact form.
        </p>
      </div>
    </motion.section>
  );
}

export default PrivacyPolicy;
