import { APP_NAME } from "@/lib/config";
import React from "react";
import ThemeSelector from "./theme-selector";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { LinkButton } from "./ui/button";
import { SquarePen } from "lucide-react";

export const Logo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    // className="lucide lucide-layers"
  >
    <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
    <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
    <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
  </svg>
);

const Header = () => {
  return (
    <header>
      <div className="min-h-16 h-full p-2 md:px-4 justify-between flex items-center">
        <div className="flex flex-row gap-2 items-center">
          <Logo />
          <h1>{APP_NAME}</h1>
        </div>
        <div className="flex flex-row gap-1 items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <LinkButton
                href="/new"
                className="rounded-full"
                variant="ghost"
                size="icon"
              >
                <SquarePen />
                <span className="sr-only">New Split</span>
              </LinkButton>
            </TooltipTrigger>
            <TooltipContent>New Chat</TooltipContent>
          </Tooltip>
          <ThemeSelector />
        </div>
      </div>
    </header>
  );
};

export default Header;
