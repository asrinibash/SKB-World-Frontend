import React from 'react';
import ContactForm from '../Components/ContactForm';
import SocialLinks from '../Components/SocialLinks';
import { motion } from "framer-motion";

function Contact() {
  return (
    <motion.section id="contact" className="container mx-auto py-12 px-4 md:py-16 md:px-6"
    initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Get in Touch</h2>
          <p className="text-muted-foreground">I'd love to hear from you! Feel free to reach out.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <ContactForm />
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="space-y-4 p-6">
              <SocialLinks />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Location</h3>
                <p className="text-muted-foreground">123 Main Street, Anytown USA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default Contact;