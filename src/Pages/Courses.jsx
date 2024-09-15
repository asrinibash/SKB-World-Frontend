import React from 'react';
import { Button } from '../Components/Ui/Button';

const courses = [
  {
    id: 1,
    title: "Introduction to Web Development",
    description: "Learn the basics of HTML, CSS, and JavaScript to build modern websites.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "$49.99"
  },
  {
    id: 2,
    title: "Data Science Fundamentals",
    description: "Explore the world of data analysis, machine learning, and statistical modeling.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "$59.99"
  },
  {
    id: 3,
    title: "Digital Marketing Mastery",
    description: "Learn effective strategies for online marketing, SEO, and social media campaigns.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "$39.99"
  },
  {
    id: 4,
    title: "UX/UI Design Principles",
    description: "Master the art of creating user-friendly and visually appealing digital interfaces.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "$54.99"
  },
  {
    id: 5,
    title: "UX/UI Design Principles",
    description: "Master the art of creating user-friendly and visually appealing digital interfaces.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "$54.99"
  },
  {
    id: 6,
    title: "UX/UI Design Principles",
    description: "Master the art of creating user-friendly and visually appealing digital interfaces.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "$54.99"
  },

];

export default function Courses() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Courses</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div key={course.id} className="bg-secondary rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <img 
                src={course.image} 
                alt={course.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-blue-600">{course.price}</span>
                <Button>Enroll Now</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
