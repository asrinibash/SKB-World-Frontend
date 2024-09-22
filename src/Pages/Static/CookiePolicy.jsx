import { motion } from "framer-motion";

function CookiePolicy() {
  return (
    <motion.section
      className="container mx-auto py-12 px-4  rounded-lg shadow-md transition duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-green-800">
        Cookie Policy
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mt-4">
        This Cookie Policy outlines how we use cookies and similar technologies
        on our website to enhance user experience.
      </p>
      <h3 className="text-xl font-semibold mt-6">What are Cookies?</h3>
      <p className="text-gray-700 dark:text-gray-300">
        Cookies are small text files stored on your device when you visit a
        website. They help the website remember your actions and preferences
        over time.
      </p>
      <h3 className="text-xl font-semibold mt-6">How We Use Cookies</h3>
      <p className="text-gray-700 dark:text-gray-300">
        We use cookies for various purposes, including:
      </p>
      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2">
        <li>Understanding user preferences to improve our services</li>
        <li>Analyzing website traffic to enhance performance</li>
        <li>
          Personalizing content and advertisements based on user interests
        </li>
      </ul>
      <h3 className="text-xl font-semibold mt-6">Managing Cookies</h3>
      <p className="text-gray-700 dark:text-gray-300">
        You can manage your cookie preferences through your browser settings.
        You have the option to block or delete cookies, but this may affect your
        experience on our website.
      </p>
      <h3 className="text-xl font-semibold mt-6">
        Changes to This Cookie Policy
      </h3>
      <p className="text-gray-700 dark:text-gray-300">
        We may update our Cookie Policy periodically. Significant changes will
        be communicated through a notice on our website or by email to the
        address associated with your account.
      </p>
      <h3 className="text-xl font-semibold mt-6">Contact Us</h3>
      <p className="text-gray-700 dark:text-gray-300">
        If you have any questions or concerns about our Cookie Policy, please
        feel free to reach out via our contact form.
      </p>
    </motion.section>
  );
}

export default CookiePolicy;
