import React from "react";

interface ErrorStateProps {
  error?: string | null;
  onRetry: () => void;
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  const displayError =
    error && error.trim() !== ""
      ? error
      : "An unknown error occurred during code evaluation.";

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      {/* 64x64 accent-bordered square with accent "!" */}
      <div className="w-16 h-16 border-2 border-google-red bg-[#FDF2F0] rounded-xl flex items-center justify-center mb-4 shadow-[3px_3px_0_#D9503F]">
        <span className="font-mono text-3xl font-black text-google-red select-none">
          !
        </span>
      </div>

      <h3 className="font-display font-extrabold text-lg sm:text-xl uppercase text-google-red tracking-tight mb-2">
        Analysis Failed
      </h3>

      <p className="font-sans text-xs sm:text-sm text-neutral-700 max-w-md leading-relaxed mb-5 bg-white border border-neutral-300 p-3 rounded-lg font-mono">
        {displayError}
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="bg-white hover:bg-frame hover:text-white border-2 border-frame text-frame font-mono text-xs font-extrabold px-5 py-2.5 rounded-full brutal-btn transition-colors cursor-pointer flex items-center space-x-2"
      >
        <span>RETRY ANALYSIS ↵</span>
      </button>
    </div>
  );
}
