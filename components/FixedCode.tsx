"use client";

import React, { useState } from "react";
import { LANGUAGES } from "@/config/app.config";
import SectionHeader from "./SectionHeader";

interface FixedCodeProps {
  sectionNumber: number;
  language: string;
  code: string;
  onApply: (code: string) => void;
}

export default function FixedCode({
  sectionNumber,
  language,
  code,
  onApply,
}: FixedCodeProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">(
    "idle"
  );

  const matchedLang = LANGUAGES.find((l) => l.id === language);
  const extension = matchedLang ? matchedLang.extension : "txt";
  const filename = `solution.${extension}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    } finally {
      setTimeout(() => {
        setCopyStatus("idle");
      }, 2000);
    }
  };

  let copyButtonText = "📋 COPY FIXED CODE";
  if (copyStatus === "copied") {
    copyButtonText = "✓ COPIED TO CLIPBOARD";
  } else if (copyStatus === "failed") {
    copyButtonText = "✕ COPY BLOCKED, SELECT MANUALLY";
  }

  return (
    <div className="mt-4 pt-2">
      <SectionHeader number={sectionNumber} title="Fix">
        <span className="font-mono text-xs font-bold text-google-green bg-google-green/10 border border-google-green px-2 py-0.5 rounded-full">
          CORRECTED CODE
        </span>
      </SectionHeader>

      {/* Bordered code block */}
      <div className="border-2 border-frame rounded-xl overflow-hidden bg-[#171717] shadow-[2px_2px_0_#141414] my-3">
        {/* Header strip */}
        <div className="bg-[#242424] border-b-2 border-frame px-3 py-2 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center space-x-2">
            <span className="text-neutral-400">📄</span>
            <span className="text-neutral-200 font-semibold">{filename}</span>
          </div>
          <span className="font-bold text-google-green tracking-wider uppercase text-[11px]">
            READY TO APPLY
          </span>
        </div>

        {/* Code body */}
        <pre className="p-3 text-xs sm:text-[13px] font-mono text-neutral-100 overflow-x-auto leading-relaxed whitespace-pre">
          <code>{code}</code>
        </pre>
      </div>

      {/* Action Buttons Below */}
      <div className="flex flex-wrap items-center gap-2.5 mt-3">
        <button
          type="button"
          onClick={handleCopy}
          className="flex-1 min-w-[160px] bg-white hover:bg-frame hover:text-white border-2 border-frame text-frame font-mono text-xs font-bold py-2 px-3.5 rounded-full brutal-btn transition-colors cursor-pointer text-center"
        >
          {copyButtonText}
        </button>

        <button
          type="button"
          onClick={() => onApply(code)}
          className="flex-1 min-w-[160px] bg-mustard hover:bg-frame hover:text-white border-2 border-frame text-frame font-mono text-xs font-extrabold py-2 px-3.5 rounded-full brutal-btn transition-colors cursor-pointer text-center"
        >
          APPLY TO EDITOR ↵
        </button>
      </div>
    </div>
  );
}
