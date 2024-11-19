import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa"; // Import an up arrow icon

const AnimatedText = () => {
  return (
    <span className="inline-block overflow-hidden">
      <span className="inline-block animate-text-reveal">{}</span>
    </span>
  );
};

const Services = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Function to handle scrolling back to the top
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Event listener to toggle the visibility of the Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div>
        {/* Main content goes here */}
        <section className="w-full min-h-screen bg-background text-foreground p-6 md:p-12 lg:p-16 space-y-16">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-accent">Our</span> Services
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Empowering businesses with cutting-edge software solutions
              tailored to meet your unique challenges and drive growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in animation-delay-300">
              <h2 className="text-3xl md:text-4xl font-semibold">
                <AnimatedText text="Custom Software Development" />
              </h2>
              <p className="text-lg text-muted-foreground">
                We create bespoke software solutions that address your specific
                business needs, streamline operations, and enhance productivity.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Tailored applications for unique business processes</li>
                <li>Scalable architecture for future growth</li>
                <li>Integration with existing systems</li>
                <li>Ongoing support and maintenance</li>
              </ul>
            </div>
            <div className="flex justify-center items-center p-4">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt="Custom Software Development"
                className="w-full max-w-md animate-float-advanced"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center items-center p-4 order-2 md:order-1">
              <img
                src="https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt="Web Development"
                className="w-full max-w-md animate-float-advanced"
              />
            </div>
            <div className="space-y-6 order-1 md:order-2 animate-fade-in animation-delay-600">
              <h2 className="text-3xl md:text-4xl font-semibold">
                <AnimatedText text="Web Development" />
              </h2>
              <p className="text-lg text-muted-foreground">
                We build responsive, high-performance web applications that
                deliver exceptional user experiences and drive engagement.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>React.js for dynamic, interactive UIs</li>
                <li>Tailwind CSS for rapid, customizable styling</li>
                <li>
                  TypeScript for enhanced code quality and maintainability
                </li>
                <li>Progressive Web Apps (PWAs) for offline capabilities</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in animation-delay-900">
              <h2 className="text-3xl md:text-4xl font-semibold">
                <AnimatedText text="Mobile App Development" />
              </h2>
              <p className="text-lg text-muted-foreground">
                We develop intuitive, feature-rich mobile applications for iOS
                and Android platforms, ensuring a seamless user experience
                across devices.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Native iOS and Android development</li>
                <li>Cross-platform solutions using React Native</li>
                <li>UI/UX design optimized for mobile</li>
                <li>Integration with device features and APIs</li>
              </ul>
            </div>
            <div className="flex justify-center items-center p-4">
              <img
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt="Mobile App Development"
                className="w-full max-w-md animate-float-advanced"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center items-center p-4 order-2 md:order-1">
              <img
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt="Cloud Solutions"
                className="w-full max-w-md animate-float-advanced"
              />
            </div>
            <div className="space-y-6 order-1 md:order-2 animate-fade-in animation-delay-1200">
              <h2 className="text-3xl md:text-4xl font-semibold">
                <AnimatedText text="Cloud Solutions" />
              </h2>
              <p className="text-lg text-muted-foreground">
                We leverage cloud technologies to build scalable, secure, and
                cost-effective solutions that empower your business to innovate
                and grow.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Cloud-native application development</li>
                <li>Microservices architecture</li>
                <li>Serverless computing</li>
                <li>DevOps and CI/CD implementation</li>
              </ul>
            </div>
          </div>
        </section>
        {/* Back to Top button */}
        {showBackToTop && (
          <button
            onClick={handleBackToTop}
            className="fixed bottom-10 right-10 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-secondary hover:text-primary"
            aria-label="Back to top"
          >
            <FaArrowUp size={20} />
          </button>
        )}
      </div>
    </>
  );
};

export default Services;
