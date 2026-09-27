import React from "react";

export default function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      {/* 64x64 dashed-border square with "{}" large muted */}
      <div className="w-16 h-16 border-2 border-dashed border-frame/40 bg-cream/60 rounded-xl flex items-center justify-center mb-4 shadow-sm">
        <span className="font-mono text-2xl font-bold text-neutral-400 select-none">
          {`{}`}
        </span>
      </div>

      <h3 className="font-display font-bold text-lg sm:text-xl uppercase text-frame tracking-tight mb-2">
        Awaiting Code Submission
      </h3>

      <p className="font-sans text-xs sm:text-sm text-neutral-600 max-w-sm leading-relaxed mb-4">
        Paste your code on the left, then click{" "}
        <strong className="text-frame font-bold">&quot;ROAST MY CODE&quot;</strong> or
        press <code className="font-mono text-xs bg-cream px-1.5 py-0.5 rounded border border-neutral-300 text-frame">Ctrl+Enter</code> (⌘+Enter on Mac).
      </p>

      {/* DevFest Wireframe bonus quote */}
      <div className="text-[11px] font-mono text-neutral-400">
        // Your code is suspiciously quiet. Let&apos;s change that. 🌶️
      </div>
    </div>
  );
}
