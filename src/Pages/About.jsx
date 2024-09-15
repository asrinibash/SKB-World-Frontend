import React from 'react';

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">About EduHub</h1>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-4">
            At EduHub, we're passionate about making quality education accessible to everyone. 
            Our mission is to empower learners worldwide by providing engaging, expert-led courses 
            that help you achieve your personal and professional goals.
          </p>
          <p className="text-gray-600">
            Whether you're looking to advance your career, explore a new hobby, or gain cutting-edge skills, 
            EduHub is here to support your learning journey every step of the way.
          </p>
        </div>
        <div className="relative h-[300px] rounded-lg overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="About EduHub" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="bg-secondary p-8 rounded-lg mb-16">
        <h2 className="text-2xl font-semibold mb-4 text-center">Why Choose EduHub?</h2>
        <ul className="grid md:grid-cols-2 gap-4">
          <li className="flex items-start">
            <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            <span>Expert instructors with real-world experience</span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            <span>Flexible learning schedules</span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            <span>Interactive and engaging course content</span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            <span>Certificates of completion</span>
          </li>
        </ul>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Join Our Learning Community</h2>
        <p className="text-gray-600 mb-8">
          Become part of a vibrant community of learners, instructors, and experts. 
          Start your learning journey with EduHub today!
        </p>
      </div>
    </div>
  );
}
