import React from "react";
import { AI, APP } from "@/config/app.config";

interface StatusBarProps {
  isRoasting: boolean;
}

export default function StatusBar({ isRoasting }: StatusBarProps) {
  return (
    <footer className="bg-cream border-t-2 border-frame px-4 py-2.5 font-mono text-[11px] text-neutral-600 select-none">
      {/* Main status row */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        {/* Left */}
        <div className="flex items-center space-x-1.5">
          <span className="font-bold text-frame">STATUS:</span>
          {isRoasting ? (
            <span className="text-mustard font-bold flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-mustard animate-pulse"></span>
              PROCESSING...
            </span>
          ) : (
            <span className="text-google-green font-bold flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-google-green"></span>
              ONLINE ({AI.modelLabel.toUpperCase()})
            </span>
          )}
          <span className="hidden sm:inline text-neutral-500">
            | ENGINE: GOOGLE GEMINI
          </span>
        </div>

        {/* Right */}
        <div className="font-bold text-neutral-700 uppercase tracking-widest text-[10px]">
          {APP.name} {APP.version} // LIVE
        </div>
      </div>

      {/* Second smaller centered line: exact text required */}
      <div className="mt-1.5 pt-1 border-t border-frame/10 text-center text-[10px] text-neutral-500 font-mono">
        Made at GDG Nashik Pre-DevFest Workshop
      </div>
    </footer>
  );
}
