"use client";

import React, { useRef, useState, useEffect } from "react";
import { LANGUAGES } from "@/config/app.config";

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  language: string;
  errorLine?: number;
  onLoadSample: () => void;
}

export default function CodeEditor({
  code,
  onChange,
  language,
  errorLine,
  onLoadSample,
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState({ line: 1, col: 1 });

  const matchedLang = LANGUAGES.find((l) => l.id === language);
  const languageLabel = matchedLang ? matchedLang.label : language;

  const lines = code.split("\n");
  const lineCount = Math.max(lines.length, 10);
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  // Sync scroll from textarea to gutter
  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (gutterRef.current) {
      gutterRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  const handleSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    const selStart = target.selectionStart;
    const textBefore = target.value.substring(0, selStart);
    const splitLines = textBefore.split("\n");
    const currentLine = splitLines.length;
    const currentCol = splitLines[splitLines.length - 1].length + 1;
    setCursor({ line: currentLine, col: currentCol });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      target.setRangeText("    ", start, end, "end");
      onChange(target.value);
    }
  };

  const handleClear = () => {
    onChange("");
    setCursor({ line: 1, col: 1 });
  };

  return (
    <div className="flex-1 flex flex-col bg-[#171717] min-h-[440px]">
      {/* 40px Header Strip */}
      <div className="h-10 bg-[#1F1F1F] border-b-2 border-frame px-4 flex items-center justify-between text-neutral-300 select-none">
        <div className="flex items-center space-x-2">
          {/* Decorative Google Dots */}
          <div className="flex items-center space-x-1.5 mr-1">
            <span className="w-2.5 h-2.5 rounded-full bg-google-red inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-google-yellow inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-google-green inline-block"></span>
          </div>
          <span className="font-mono text-xs text-neutral-400 font-medium">
            INPUT // SRC
          </span>
        </div>

        <span className="font-display font-bold text-xs sm:text-sm text-white tracking-tight uppercase">
          Your Code
        </span>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={onLoadSample}
            className="text-[11px] font-mono font-bold uppercase tracking-wider text-mustard hover:text-white bg-[#2A2A2A] hover:bg-neutral-700 px-2 py-0.5 rounded border border-neutral-700 transition-colors cursor-pointer"
          >
            SAMPLE BUG
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            CLEAR
          </button>
        </div>
      </div>

      {/* Editor & Gutter Container */}
      <div className="flex-1 relative flex overflow-hidden font-mono text-xs sm:text-[13px] leading-relaxed">
        {/* Line Numbers Gutter */}
        <div
          ref={gutterRef}
          aria-hidden="true"
          className="select-none bg-[#1C1C1C] text-neutral-600 w-12 py-3 pr-3 text-right border-r border-neutral-800 overflow-hidden space-y-0"
        >
          {lineNumbers.map((num) => {
            const isError = errorLine !== undefined && num === errorLine;
            return (
              <div
                key={num}
                className={`h-6 leading-6 text-xs transition-colors ${
                  isError
                    ? "text-[#D9503F] bg-[#D9503F]/20 font-bold px-1 rounded-sm"
                    : ""
                }`}
              >
                {String(num).padStart(2, "0")}
              </div>
            );
          })}
        </div>

        {/* Textarea Surface */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onSelect={handleSelect}
          onKeyUp={handleSelect}
          onClick={handleSelect}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          placeholder="// Paste your code here..."
          className="flex-1 w-full h-full py-3 px-4 bg-transparent text-neutral-100 placeholder:text-neutral-600 resize-none outline-none font-mono text-xs sm:text-[13px] leading-6 whitespace-pre overflow-x-auto selection:bg-mustard selection:text-frame"
        />
      </div>

      {/* Bottom Status Strip */}
      <div className="h-8 bg-[#141414] border-t border-neutral-800 px-4 flex items-center justify-between text-[11px] font-mono text-neutral-400 select-none">
        <div className="flex items-center space-x-2">
          <span className="text-mustard font-bold">
            Ln {cursor.line}, Col {cursor.col}
          </span>
          <span>·</span>
          <span>{languageLabel}</span>
          {errorLine && (
            <>
              <span>·</span>
              <span className="text-google-red font-bold">
                ⚠️ BUG ON LINE {errorLine}
              </span>
            </>
          )}
        </div>

        <div className="hidden sm:flex items-center space-x-3 text-neutral-500">
          <span>{code.length.toLocaleString()} chars</span>
          <span>·</span>
          <span>UTF-8 · Tab Size: 4</span>
        </div>
      </div>
    </div>
  );
}
