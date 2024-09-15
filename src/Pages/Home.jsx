import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../Components/Ui/Button";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Welcome to EduHub</h1>
        <p className="text-xl text-gray-600 mb-8">
          Unlock your potential with our expert-led online courses
        </p>
        <Button asChild size="lg">
          <Link to="/courses">Explore Courses</Link>
        </Button>
      </section>

      <section className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-secondary p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Learn at Your Own Pace</h2>
          <p className="text-gray-600">
            Access course materials anytime, anywhere. Learn on your schedule.
          </p>
        </div>
        <div className="bg-secondary p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Expert Instructors</h2>
          <p className="text-gray-600">
            Learn from industry professionals with years of experience.
          </p>
        </div>
        <div className="bg-secondary  p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Interactive Learning</h2>
          <p className="text-gray-600">
            Engage with peers and instructors through forums and live sessions.
          </p>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
        <p className="text-xl text-gray-600 mb-8">
          Join thousands of students already learning on EduHub
        </p>
        <Button asChild size="lg">
          <Link to="/courses">Get Started</Link>
        </Button>
      </section>
    </div>
  );
}
