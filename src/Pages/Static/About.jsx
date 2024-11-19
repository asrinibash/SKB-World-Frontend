/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa"; // Import an up arrow icon

const AnimatedText = (props) => {
  return (
    <span className="inline-block overflow-hidden">
      <span className="inline-block animate-text-reveal">{props.text}</span>
    </span>
  );
};

const About = () => {
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
        <section className="w-full min-h-screen bg-background text-foreground p-6 md:p-12 lg:p-12 space-y-12">
          <section className="w-full min-h-screen bg-background text-foreground ">
            <div className="text-center animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                <span className="text-accent">About</span> Us
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Innovating the future of software development with cutting-edge
                solutions and unparalleled expertise.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-in animation-delay-300 ">
                <h2 className="text-3xl md:text-4xl font-semibold">
                  <AnimatedText text="Our Work" />
                </h2>
                <p className="text-lg text-muted-foreground">
                  We are dedicated to delivering high-quality software solutions
                  that meet the unique needs of our clients. Our team
                  specializes in developing innovative applications using the
                  latest technologies, ensuring scalability, efficiency, and
                  user-centric design.
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Custom software development</li>
                  <li>Web and mobile applications</li>
                  <li>Cloud-based solutions</li>
                  <li>AI and machine learning integration</li>
                </ul>
              </div>
              <div className="flex justify-end items-center p-12">
                <img
                  src={
                    "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  alt="Our Work"
                  className="w-full max-w-md animate-float-advanced"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-8">
              <div className="flex justify-start items-center p-12">
                <img
                  src={
                    "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  alt="Our Company"
                  className="w-full max-w-md animate-float-advanced"
                />
              </div>
              <div className="space-y-6 order-1 md:order-2 animate-fade-in animation-delay-600">
                <h2 className="text-3xl md:text-4xl font-semibold">
                  <AnimatedText text="Our Company" />
                </h2>
                <p className="text-lg text-muted-foreground">
                  Our company focuses on using responsive design, React.js,
                  Tailwind CSS, and TypeScript to create efficient and scalable
                  web applications. We strive to stay at the forefront of
                  technology to provide the best possible solutions to our
                  clients.
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-accent rounded-lg p-4">
                    <h3 className="text-xl text-white font-semibold mb-2">
                      100+
                    </h3>
                    <p className="text-white/90">Projects Completed</p>
                  </div>
                  <div className="bg-accent rounded-lg p-4">
                    <h3 className="text-xl text-white font-semibold mb-2">
                      50+
                    </h3>
                    <p className="text-white/90">Happy Clients</p>
                  </div>
                  <div className="bg-accent rounded-lg p-4">
                    <h3 className="text-xl text-white font-semibold mb-2">
                      24/7
                    </h3>
                    <p className="text-white/90">Support</p>
                  </div>
                  <div className="bg-accent rounded-lg p-4">
                    <h3 className="text-xl text-white font-semibold mb-2">
                      10+
                    </h3>
                    <p className="text-white/90">Years Experience</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
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

export default About;
