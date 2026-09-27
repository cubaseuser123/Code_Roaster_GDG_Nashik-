"use client";

import React, { useEffect, useState } from "react";

const ROTATING_MESSAGES = [
  "Evaluating computational complexity and architectural purity...",
  "Compiler ki chai thandi ho rahi hai… ☕",
  "Sharma ji ke bete se comparison chal raha hai… 🤦",
  "Bhau, roast tayyar ho raha hai… 🔥",
  "Panchavati Express se bhi late hai tumhara loop… 🚂",
];

export default function LoadingState() {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % ROTATING_MESSAGES.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      {/* 64x64 solid-border square with spinning "/" */}
      <div className="w-16 h-16 border-2 border-frame bg-cream rounded-xl flex items-center justify-center mb-4 shadow-[3px_3px_0_#141414]">
        <span className="font-mono text-2xl font-bold text-frame animate-spin inline-block">
          /
        </span>
      </div>

      <h3 className="font-display font-extrabold text-lg sm:text-xl uppercase text-frame tracking-tight mb-2 animate-pulse">
        Analyzing Code
      </h3>

      <p className="font-sans text-xs sm:text-sm text-neutral-600 max-w-sm leading-relaxed mb-3">
        Evaluating computational complexity and architectural purity...
      </p>

      {/* Rotating Desi Wireframe Humor Message */}
      <div className="inline-block bg-mustard/20 border border-mustard px-3 py-1 rounded-full text-xs font-mono text-neutral-800 font-semibold transition-all">
        {ROTATING_MESSAGES[msgIndex]}
      </div>
    </div>
  );
}
