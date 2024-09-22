const AnimatedText = () => {
  return (
    <span className="inline-block overflow-hidden">
      <span className="inline-block animate-text-reveal">{}</span>
    </span>
  );
};
const Services = () => {
  return (
    <section className="w-full min-h-screen bg-background text-foreground p-6 md:p-12 lg:p-16 space-y-16">
      <div className="text-center animate-fade-in">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          <span className="text-accent">Our</span> Services
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Discover the range of services we offer to help your business thrive.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 animate-fade-in animation-delay-300">
          <h2 className="text-3xl md:text-4xl font-semibold">
            <AnimatedText text="Custom Software Development" />
          </h2>
          <p className="text-lg text-muted-foreground">
            Tailored solutions designed to meet your specific business needs.
          </p>
        </div>
        <div className="flex justify-center items-center p-4">
          <img
            src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
            alt="Custom Software Development"
            className="w-full max-w-md animate-float-advanced"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex justify-center items-center p-4 order-2 md:order-1">
          <img
            src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
            alt="Web Development"
            className="w-full max-w-md animate-float-advanced"
          />
        </div>
        <div className="space-y-6 order-1 md:order-2 animate-fade-in animation-delay-600">
          <h2 className="text-3xl md:text-4xl font-semibold">
            <AnimatedText text="Web Development" />
          </h2>
          <p className="text-lg text-muted-foreground">
            Building responsive and engaging web applications to captivate your
            audience.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 animate-fade-in animation-delay-900">
          <h2 className="text-3xl md:text-4xl font-semibold">
            <AnimatedText text="Mobile Applications" />
          </h2>
          <p className="text-lg text-muted-foreground">
            Creating seamless mobile experiences on iOS and Android platforms.
          </p>
        </div>
        <div className="flex justify-center items-center p-4">
          <img
            src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
            alt="Mobile Applications"
            className="w-full max-w-md animate-float-advanced"
          />
        </div>
      </div>
    </section>
  );
};

export default Services;
