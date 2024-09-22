/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

function ProjectCard({ title, description, image, technologies }) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <img
        src={image}
        width="400"
        height="300"
        alt={title}
        className="rounded-t-lg object-cover"
        style={{ aspectRatio: "400 / 300", objectFit: "cover" }}
      />
      <div className="space-y-2 p-4">
        <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="flex gap-2">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
