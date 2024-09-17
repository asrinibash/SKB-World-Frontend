import React from 'react';

export const Breadcrumb = ({ ...props }) => <nav {...props} />;
export const BreadcrumbList = ({ className, ...props }) => (
  <ol className={`flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5 ${className}`} {...props} />
);
export const BreadcrumbItem = ({ className, ...props }) => <li className={`inline-flex items-center gap-1.5 ${className}`} {...props} />;
export const BreadcrumbLink = React.forwardRef(({ className, ...props }, ref) => (
  <a
    ref={ref}
    className={`hover:text-foreground ${className}`}
    {...props}
  />
));
export const BreadcrumbPage = ({ className, ...props }) => <span className={`font-normal text-foreground ${className}`} {...props} />;
export const BreadcrumbSeparator = ({ className, ...props }) => (
  <li className={`opacity-50 ${className}`} {...props}>
    /
  </li>
);