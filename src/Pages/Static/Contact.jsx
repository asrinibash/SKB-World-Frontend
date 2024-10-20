import { useState } from "react";
import emailjs from "emailjs-com";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "", // Mobile field
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Constructing the email data with dynamic fields
    const emailData = {
      to_name: "Mir Ziauddin", // Your name or the recipient's name
      from_name: formData.name,
      from_email: formData.email,
      from_phone: formData.mobile, // Mobile number from the form
      message: formData.message,
    };

    emailjs
      .send(
        "service_fmm1925", // Replace with your EmailJS service ID
        "template_j2jinew", // Replace with your EmailJS template ID
        emailData, // Use constructed email data
        "AdpGS7Q9Tk28Rlrsw" // Replace with your EmailJS user ID
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          alert("Message sent successfully!");
          setFormData({ name: "", email: "", mobile: "", message: "" }); // Reset form
        },
        (error) => {
          console.log("FAILED...", error);
          alert("Failed to send message.");
        }
      );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 m-14">
      <div>
        <label htmlFor="name" className="block text-sm font-medium ">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded border p-2"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded border p-2"
          required
        />
      </div>
      <div>
        <label htmlFor="mobile" className="block text-sm font-medium">
          Mobile Number
        </label>
        <input
          type="tel"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          className="w-full rounded border p-2"
          required
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium">
          Message
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full rounded border p-2"
          required
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 font-bold text-white bg-accent rounded"
      >
        Send Message
      </button>
    </form>
  );
}

export default ContactForm;
