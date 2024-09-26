const Help = () => {
  return (
    <section className="w-full min-h-screen bg-background text-foreground p-6 md:p-12 lg:p-16 space-y-16">
      <div className="text-center animate-fade-in">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          <span className="text-accent">Need</span> Help?
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          We are here to assist you with any questions or support you may need.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 animate-fade-in animation-delay-300">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Check out our FAQs to find answers to common inquiries.
          </p>
        </div>
        <div className="flex justify-center items-center p-4">
          <img
            src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
            alt="Help and Support"
            className="w-full max-w-md animate-float-advanced"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex justify-center items-center p-4 order-2 md:order-1">
          <img
            src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
            alt="Contact Us"
            className="w-full max-w-md animate-float-advanced"
          />
        </div>
        <div className="space-y-6 order-1 md:order-2 animate-fade-in animation-delay-600">
          <h2 className="text-3xl md:text-4xl font-semibold">Contact Us</h2>
          <p className="text-lg text-muted-foreground">
            Reach out to our support team for personalized assistance.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 animate-fade-in animation-delay-900">
          <h2 className="text-3xl md:text-4xl font-semibold">Live Chat</h2>
          <p className="text-lg text-muted-foreground">
            Chat with us live for immediate support and guidance.
          </p>
        </div>
        <div className="flex justify-center items-center p-4">
          <img
            src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
            alt="Live Chat"
            className="w-full max-w-md animate-float-advanced"
          />
        </div>
      </div>
    </section>
  );
};

export default Help;
