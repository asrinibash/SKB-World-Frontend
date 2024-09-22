// TermsOfService.js
import { motion } from "framer-motion";

function TermsOfService() {
  return (
    <motion.section
      id="terms-of-service"
      className="flex flex-col md:flex-row container mx-auto py-12 px-4 md:py-16 md:px-12   rounded-lg shadow-md transition duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* <aside className="md:w-1/4 bg-white dark:bg-gray-700 rounded-lg shadow-md p-4 mb-6 md:mb-0">
        <h3 className="font-bold text-lg text-gray-800 dark:text-white">
          Quick Navigation
        </h3>
        <ul className="space-y-2 mt-2">
          <li>
            <a
              href="#acceptance"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Acceptance of Terms
            </a>
          </li>
          <li>
            <a
              href="#modifications"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Modifications to the Terms
            </a>
          </li>
          <li>
            <a
              href="#responsibilities"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              User Responsibilities
            </a>
          </li>
          <li>
            <a
              href="#liability"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Limitation of Liability
            </a>
          </li>
          <li>
            <a
              href="#governing-law"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Governing Law
            </a>
          </li>
        </ul>
      </aside> */}

      <div className="md:w-3/4 text-sm md:text-base lg:text-xl text-left">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-800 dark:text-white">
            Terms of <span className="text-accent">Service</span>
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Welcome to our Terms of Service. Please read these terms carefully
            before using our services.
          </p>
        </div>

        <ol className="space-y-4 list-decimal list-inside mt-6 text-gray-700 dark:text-gray-300">
          <li id="acceptance">
            <h3 className="text-xl font-semibold">1. Acceptance of Terms</h3>
            <p>
              By accessing or using our services, you agree to be bound by these
              terms and conditions.
            </p>
          </li>
          <li id="modifications">
            <h3 className="text-xl font-semibold">
              2. Modifications to the Terms
            </h3>
            <p>
              We may update these terms from time to time. Any changes will be
              posted on this page with an updated effective date.
            </p>
          </li>
          <li id="responsibilities">
            <h3 className="text-xl font-semibold">3. User Responsibilities</h3>
            <p>
              You are responsible for your use of our services and for any
              activity that occurs under your account.
            </p>
          </li>
          <li id="liability">
            <h3 className="text-xl font-semibold">
              4. Limitation of Liability
            </h3>
            <p>
              We are not liable for any indirect, incidental, or consequential
              damages arising from your use of our services.
            </p>
          </li>
          <li id="governing-law">
            <h3 className="text-xl font-semibold">5. Governing Law</h3>
            <p>
              These terms shall be governed by the laws of the jurisdiction in
              which we operate.
            </p>
          </li>
          <li>
            <p>
              If you have any questions about these Terms of Service, please
              contact us via our contact form.
            </p>
          </li>
        </ol>
      </div>
    </motion.section>
  );
}

export default TermsOfService;
