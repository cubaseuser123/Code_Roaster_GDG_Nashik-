import React from "react";
import { APP } from "@/config/app.config";

interface TopBarProps {
  children: React.ReactNode;
}

export default function TopBar({ children }: TopBarProps) {
  return (
    <header className="bg-cream border-b-2 border-frame p-3 sm:p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
      {/* Left: App name + small bordered version tag from APP config */}
      <div className="flex items-center space-x-2.5">
        {/* Google 4-color accent pill from DevFest */}
        <div className="flex items-center space-x-1 bg-white border border-frame py-1 px-2 rounded-full mr-1">
          <span className="w-2 h-2 rounded-full bg-google-blue inline-block"></span>
          <span className="w-2 h-2 rounded-full bg-google-red inline-block"></span>
          <span className="w-2 h-2 rounded-full bg-google-yellow inline-block"></span>
          <span className="w-2 h-2 rounded-full bg-google-green inline-block"></span>
        </div>

        <h1 className="font-display font-extrabold text-base sm:text-lg tracking-wider uppercase text-frame">
          {APP.name}
        </h1>

        <span className="font-mono text-[10px] font-bold uppercase bg-mustard text-frame px-2 py-0.5 rounded-full border border-frame">
          {APP.version}
        </span>
      </div>

      {/* Right: Render children (RoastControls) in wrapping flex row */}
      <div className="flex-1 flex items-center lg:justify-end text-xs font-mono">
        {children}
      </div>
    </header>
  );
}
