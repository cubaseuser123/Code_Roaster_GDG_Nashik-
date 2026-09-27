"use client";

import React from "react";
import { LANGUAGES, ROAST_LEVELS } from "@/config/app.config";
import { LanguageId, RoastLevel } from "@/types/roast";

interface RoastControlsProps {
  roastLevel: RoastLevel;
  onRoastLevelChange: (level: RoastLevel) => void;
  language: LanguageId;
  onLanguageChange: (lang: LanguageId) => void;
  onRoast: () => void;
  isRoasting: boolean;
  errorDrawerOpen: boolean;
  onToggleErrorDrawer: () => void;
}

export default function RoastControls({
  roastLevel,
  onRoastLevelChange,
  language,
  onLanguageChange,
  onRoast,
  isRoasting,
  errorDrawerOpen,
  onToggleErrorDrawer,
}: RoastControlsProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 w-full">
      {/* Left controls: Roast Level, Language, Error Drawer */}
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
        
        {/* (1) Roast Level: Radio Group */}
        <div className="flex items-center bg-white border-2 border-frame rounded-full px-3 py-1 shadow-[2px_2px_0_#141414]">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500 mr-2 select-none">
            Roast Level:
          </span>
          <div className="flex items-center space-x-2">
            {ROAST_LEVELS.map((level) => {
              const isSelected = roastLevel === level.id;
              return (
                <label
                  key={level.id}
                  title={level.description}
                  className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full cursor-pointer text-xs font-mono transition-all ${
                    isSelected
                      ? "bg-mustard text-frame font-bold border border-frame shadow-sm"
                      : "text-neutral-700 hover:text-frame hover:bg-neutral-100"
                  }`}
                >
                  <input
                    type="radio"
                    name="roastLevel"
                    value={level.id}
                    checked={isSelected}
                    onChange={() => onRoastLevelChange(level.id)}
                    className="w-3.5 h-3.5 accent-frame cursor-pointer"
                  />
                  <span>{level.label}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* (2) Language: Native <select> custom-styled */}
        <div className="relative inline-flex items-center">
          <label htmlFor="language-select" className="sr-only">
            Language
          </label>
          <div className="flex items-center bg-white border-2 border-frame rounded-full px-3 py-1.5 shadow-[2px_2px_0_#141414]">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500 mr-2 select-none">
              Language:
            </span>
            <div className="relative">
              <select
                id="language-select"
                value={language}
                onChange={(e) => onLanguageChange(e.target.value as LanguageId)}
                className="appearance-none bg-transparent pr-5 text-xs font-mono font-bold text-frame outline-none cursor-pointer"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.id} value={lang.id}>
                    {lang.label} (.{lang.extension})
                  </option>
                ))}
              </select>
              <span className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[10px] text-neutral-500">
                ▾
              </span>
            </div>
          </div>
        </div>

        {/* (3) Error Drawer Toggle Button */}
        <button
          type="button"
          onClick={onToggleErrorDrawer}
          className={`flex items-center space-x-1.5 border-2 border-dashed px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
            errorDrawerOpen
              ? "bg-frame text-white border-frame shadow-[2px_2px_0_#141414]"
              : "bg-white text-neutral-700 border-neutral-700 hover:bg-neutral-50"
          }`}
        >
          <span>{errorDrawerOpen ? "− ERROR MESSAGE" : "+ ERROR MESSAGE"}</span>
        </button>

      </div>

      {/* (4) Primary Action Button */}
      <div className="flex items-center ml-auto">
        <button
          type="button"
          onClick={onRoast}
          disabled={isRoasting}
          className={`font-mono text-xs sm:text-sm font-bold uppercase px-5 sm:px-6 py-2 rounded-full border-2 border-frame transition-all flex items-center space-x-2.5 ${
            isRoasting
              ? "bg-neutral-800 text-neutral-400 border-neutral-800 cursor-not-allowed animate-pulse"
              : "bg-frame hover:bg-neutral-800 text-white brutal-btn cursor-pointer shadow-[3px_3px_0_#EDB13E]"
          }`}
        >
          {isRoasting ? (
            <span>ANALYZING...</span>
          ) : (
            <>
              <span>ROAST MY CODE</span>
              <span className="text-[10px] font-mono bg-white/20 text-white px-2 py-0.5 rounded-full border border-white/30">
                Ctrl ⏎
              </span>
            </>
          )}
        </button>
      </div>

    </div>
  );
}
