/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { FaLightbulb, FaUsers, FaRocket, FaChartLine } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const AnimatedText = ({ text }) => {
  return (
    <motion.span
      className="inline-block"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {text}
    </motion.span>
  );
};

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      className="bg-secondary rounded-lg p-6 shadow-md"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Icon className="text-4xl text-accent mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
};

const About = () => {
  const navigate = useNavigate();
  const companyInfo = {
    mission:
      "Our mission is to empower businesses and individuals with cutting-edge software solutions that drive growth and innovation.",
    vision:
      "We envision a world where technology seamlessly integrates with human creativity, fostering a more efficient and connected global community.",
    values: [
      "Innovation: Constantly pushing the boundaries of what's possible",
      "Quality: Delivering excellence in every line of code",
      "Collaboration: Fostering teamwork and open communication",
      "Integrity: Maintaining the highest ethical standards in all our dealings",
    ],
  };

  return (
    <section className="w-full bg-background text-foregroundp-6 md:p-12 lg:p-12">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <AnimatedText text="About Our Company" />
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We are a team of passionate developers and designers dedicated to
            creating innovative software solutions that make a difference.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold">Our Mission</h3>
            <p className="text-muted-foreground">{companyInfo.mission}</p>
            <h3 className="text-2xl font-semibold">Our Vision</h3>
            <p className="text-muted-foreground">{companyInfo.vision}</p>
          </motion.div>
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold">Our Values</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              {companyInfo.values.map((value, index) => (
                <li key={index}>{value}</li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <FeatureCard
            icon={FaLightbulb}
            title="Innovative Solutions"
            description="We leverage cutting-edge technologies to solve complex problems and drive business growth."
          />
          <FeatureCard
            icon={FaUsers}
            title="Expert Team"
            description="Our diverse team of skilled professionals brings a wealth of experience to every project."
          />
          <FeatureCard
            icon={FaRocket}
            title="Agile Development"
            description="We employ agile methodologies to ensure rapid, iterative development and timely delivery."
          />
          <FeatureCard
            icon={FaChartLine}
            title="Scalable Architecture"
            description="Our solutions are built to grow with your business, ensuring long-term success and adaptability."
          />
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-3xl font-semibold mb-4">
            Ready to Transform Your Ideas into Reality?
          </h3>
          <p className="text-xl text-muted-foreground mb-8">
            Lets collaborate to create innovative software solutions that drive
            your business forward.
          </p>
          <button
            onClick={() => {
              navigate("/contact");
            }}
            className="bg-accent text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-accent/90 transition-colors"
          >
            Get in Touch
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
