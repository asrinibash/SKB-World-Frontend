import React from "react";
import skbcompany from "../assets/skbcompany2.png";
import About from "../Components/Home/About";

const AnimatedText = ({ text }) => {
  return (
    <span className="inline-block overflow-hidden">
      <span className="inline-block animate-text-reveal">{text}</span>
    </span>
  );
};

const Home = () => {
  return (
    <>
      <section className="w-full min-h-screen bg-background text-foreground grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-12 lg:p-12">
        {/* Left Side Content */}
        <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in">
            {homeProps.firstTitle}
            <br />
            <span className="text-primary">
              <AnimatedText text="software" />
            </span>{" "}
            {homeProps.middleTitle}
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl animate-fade-in animation-delay-300">
            {homeProps.workDescription}
          </p>
          <button className="bg-accent text-primary-foreground py-3 px-8 text-lg font-semibold rounded hover:bg-accent/80 hover:text-accent-foreground transition-all duration-300 transform hover:scale-105 animate-fade-in animation-delay-600">
            {homeProps.button}
          </button>
        </div>

        {/* Right Side Image */}
        <div className="flex p-4 justify-end items-center ">
          <img
            src={skbcompany}
            alt="Home Logo"
            className="w-full max-w-md animate-float-advanced"
          />
        </div>
      </section>
      <About />
    </>
  );
};

const homeProps = {
  firstTitle: "We're building",
  middleTitle: "to help",
  workDescription:
    "We are dedicated to delivering high-quality software solutions that meet the unique needs of our clients. Our team specializes in developing innovative applications using the latest technologies.",
  button: "Explore >>",
};

export default Home;
