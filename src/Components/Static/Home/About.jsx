import React from "react";

const DynamicText = ({ text }) => {
  return (
    <span className="inline-block overflow-hidden">
      <span className="inline-block animate-text-reveal text-primary">
        {text}
      </span>
    </span>
  );
};

const About = () => {
  const workTitle = "Our Work";
  const workDescription =
    "We are dedicated to delivering high-quality software solutions that meet the unique needs of our clients. Our team specializes in developing innovative applications using the latest technologies.";
  const companyTitle = "Our Company";
  const companyDescription =
    "Our company focuses on using responsive design, React.js, Tailwind CSS, and TypeScript to create efficient and scalable web applications. We strive to stay at the forefront of technology to provide the best possible solutions to our clients.";

  return (
    <section className="w-full min-h-screen bg-background text-foreground grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-12 lg:p-12">
      {/* Our Work Section */}
      <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-6">
        <h2 className="text-2xl md:text-3xl font-semibold animate-fade-in">
          <DynamicText text={workTitle} />
        </h2>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl animate-fade-in animation-delay-300">
          {workDescription}
        </p>
      </div>
      <div className="flex justify-center items-center p-4">
        <img
          src={
            "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt="Our Work"
          className="w-full h-auto max-w-xs md:max-w-sm rounded"
        />
      </div>

      {/* Our Company Section */}
      <div className="flex justify-start items-center p-4">
        <img
          src={
            "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt="Company"
          className="w-full h-auto max-w-xs md:max-w-sm rounded"
        />
      </div>
      <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-6">
        <h2 className="text-2xl md:text-3xl font-semibold animate-fade-in">
          <DynamicText text={companyTitle} />
        </h2>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl animate-fade-in animation-delay-300">
          {companyDescription}
        </p>
      </div>
    </section>
  );
};

export default About;
