/* eslint-disable no-undef */
import { Link } from "react-router-dom";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "./Ui/Tooltip";
import {
  Home,
  Users,
  ShoppingCart,
  Settings,
  HelpCircle,
  Layers3,
  Notebook,
  Group,
} from "lucide-react";
import { AlignStartVertical } from "lucide-react";

export default function Sidebar() {
  const navItems = [
    { icon: Home, label: "Dashboard", to: "dashboard" },
    { icon: Users, label: "Users", to: "users" },
    { icon: Layers3, label: "Categories", to: "Categories" },
    { icon: Notebook, label: "Courses", to: "Courses" },
    { icon: Group, label: "Group", to: "Group" },
    { icon: ShoppingCart, label: "Order", to: "order" },
  ];

  return (
    <aside className="group inset-y-0 left-0 z-20 hidden w-16 flex-col border-r bg-background transition-all duration-300 ease-in-out hover:w-64 sm:flex h-full">
      <div className="flex h-16 shrink-0 items-center justify-start pl-6 border-b">
        <AlignStartVertical className="h-6 w-6" />
      </div>
      <nav className="flex flex-1 flex-col p-4 gap-4">
        <TooltipProvider delayDuration={0}>
          {navItems.map((item) => (
            <Tooltip key={item.label}>
              <TooltipTrigger asChild>
                <Link
                  to={item.to}
                  className="flex gap-4 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <div className="w-5 h-5 flex-shrink-0">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="hidden group-hover:inline-block text-base  truncate">
                    {item.label}
                  </span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="hidden sm:block ml-2">
                {item.label}
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>
      <div className="shrink-0 p-4">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/settings"
                className="flex items-center gap-4 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                  <Settings className="w-5 h-5" />
                </div>
                <span className="hidden group-hover:inline-block text-base font-medium truncate">
                  Settings
                </span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="hidden sm:block">
              Settings
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/help"
                className="flex items-center gap-4 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <span className="hidden group-hover:inline-block text-base font-medium truncate">
                  Help
                </span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="hidden sm:block">
              Help
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </aside>
  );
}
