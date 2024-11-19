import { useEffect, useState } from "react";
import axios from "axios";
import ContactImage from "../../assets/contact-image.jpg"; // Replace with your image path
import { server } from "../../main";
import { FaArrowUp } from "react-icons/fa"; // Import an up arrow icon

const ContactPage = () => {
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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${server}/contact`, formData);
      alert(response.data.message);
      setFormData({ name: "", email: "", mobile: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <>
      <div>
        {/* Main content goes here */}
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-50 dark:bg-green-950 transition duration-500">
          {/* Left side - Contact Form */}
          <div className="w-full md:w-1/2 p-8 animate-fade-in">
            <h2 className="text-3xl font-semibold text-primary dark:text-primary-foreground animate-text-reveal">
              Contact Us
            </h2>
            <p className="text-muted-foreground mt-2 mb-6">
              Send us a message and we’ll get back to you as soon as possible.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-md bg-input border-border text-foreground"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-md bg-input border-border text-foreground"
                required
              />
              <input
                type="tel"
                name="mobile"
                placeholder="Your Mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full p-3 border rounded-md bg-input border-border text-foreground"
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 border rounded-md bg-input border-border text-foreground"
                rows="4"
                required
              />
              <button
                type="submit"
                className="w-full p-3 mt-4 text-white bg-primary hover:bg-primary-foreground rounded-md transition-all animate-float-advanced"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Right side - Image */}
          <div className="hidden md:block md:w-1/2 p-8">
            <img
              src={ContactImage}
              alt="Contact Us"
              className="w-full h-full object-cover rounded-md animate-float-advanced"
            />
          </div>
        </div>
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

export default ContactPage;
