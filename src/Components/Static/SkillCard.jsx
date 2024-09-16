import React from 'react';

function SkillCard({ title, description, icon }) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col items-center justify-center gap-4 p-6">
        {icon}
        <div className="space-y-1 text-center">
          <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default SkillCard;