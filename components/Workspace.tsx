"use client";

import React, { useCallback, useEffect, useState } from "react";
import { DEFAULTS, SAMPLE } from "@/config/app.config";
import { requestRoast } from "@/lib/api";
import { LanguageId, ReportState, RoastLevel, RoastResult } from "@/types/roast";
import TopBar from "./TopBar";
import RoastControls from "./RoastControls";
import ErrorMessageInput from "./ErrorMessageInput";
import CodeEditor from "./CodeEditor";
import RoastReport from "./RoastReport";
import StatusBar from "./StatusBar";

export default function Workspace() {
  const [roastLevel, setRoastLevel] = useState<RoastLevel>(DEFAULTS.roastLevel);
  const [language, setLanguage] = useState<LanguageId>(DEFAULTS.language);
  const [code, setCode] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorDrawerOpen, setErrorDrawerOpen] = useState<boolean>(false);
  const [reportState, setReportState] = useState<ReportState>("empty");
  const [roastResult, setRoastResult] = useState<RoastResult | null>(null);
  const [roastedCode, setRoastedCode] = useState<string>("");
  const [apiError, setApiError] = useState<string | null>(null);

  const isRoasting = reportState === "loading";

  // ErrorLine definition per spec:
  // only defined when reportState === "results" && code === roastedCode
  // must go undefined the instant the user edits the code
  const errorLine =
    reportState === "results" && code === roastedCode
      ? roastResult?.issues?.[0]?.line
      : undefined;

  const handleRoast = useCallback(async () => {
    if (isRoasting) return;

    if (!code || code.trim() === "") {
      setApiError("No code provided. I can't roast the void.");
      setReportState("error");
      return;
    }

    setReportState("loading");
    setApiError(null);

    try {
      const result = await requestRoast({
        language,
        code,
        roastLevel,
        errorMessage: errorMessage.trim() || undefined,
      });
      setRoastResult(result);
      setRoastedCode(code);
      setReportState("results");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to analyze code.";
      setApiError(message);
      setReportState("error");
    }
  }, [code, errorMessage, isRoasting, language, roastLevel]);

  const handleLoadSample = () => {
    setLanguage(SAMPLE.language as LanguageId);
    setCode(SAMPLE.code);
  };

  const handleApplyFix = (fixedCode: string) => {
    setCode(fixedCode);
    // Loading corrected code without auto-re-roasting
  };

  // Keyboard shortcut Ctrl/Cmd + Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleRoast();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleRoast]);

  return (
    <div className="w-full max-w-[1360px] mx-auto flex flex-col items-center">
      {/* DevFest Floating Pill Navbar */}
      <header className="w-full mb-4">
        <nav className="h-14 sm:h-16 px-4 sm:px-6 bg-white rounded-full brutal-card flex items-center justify-between transition-all">
          {/* Left: GDG Nashik Badge */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-cream border border-frame py-1 px-2.5 rounded-full">
              <span className="w-2.5 h-2.5 rounded-full bg-google-blue"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-google-red"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-google-yellow"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-google-green"></span>
              <span className="text-xs font-mono font-bold tracking-tight text-frame ml-1">
                GDG NASHIK
              </span>
            </div>
            <span className="hidden md:inline text-xs font-mono text-neutral-500">
              // PRE-DEVFEST
            </span>
          </div>

          {/* Center: Wordmark */}
          <div className="flex items-center space-x-1.5">
            <span className="text-lg">🌶️</span>
            <span className="font-display font-black text-sm sm:text-base tracking-tight uppercase">
              CODE ROASTER
            </span>
            <span className="bg-mustard text-frame text-[10px] font-mono px-2 py-0.5 rounded-full border border-frame font-bold">
              v3
            </span>
          </div>

          {/* Right: DevFest Badge */}
          <div className="flex items-center space-x-1.5">
            <div className="bg-cream border border-frame px-2.5 py-1 rounded-full flex items-center space-x-1.5">
              <span className="text-google-blue font-bold text-xs">★</span>
              <span className="font-mono text-xs font-bold text-frame">
                DevFest Nashik 2026
              </span>
            </div>
          </div>
        </nav>
      </header>

      {/* Compact Hero Section */}
      <div className="text-center mb-4 sm:mb-5">
        <div className="inline-flex items-center space-x-2 bg-white px-3 py-0.5 rounded-full border-2 border-frame shadow-[2px_2px_0_#141414] mb-2">
          <span className="text-[11px] font-mono font-bold text-google-red tracking-widest uppercase">
            CODE BOL RAHA HAI
          </span>
          <span className="text-neutral-400 font-mono">·</span>
          <span className="text-xs font-bold text-frame">
            मला वाचवा! 🆘
          </span>
        </div>

        <h2 className="font-display font-black text-2xl sm:text-4xl text-frame uppercase tracking-tight mb-1">
          Code Roaster{" "}
          <span className="text-mustard underline decoration-frame decoration-2">
            Desi Edition
          </span>
        </h2>
        <p className="text-xs sm:text-sm font-sans text-neutral-700 max-w-lg mx-auto">
          Paste your code. Pick your roast. Get humbled. Walk away with the fix.
        </p>
      </div>

      {/* Main Workstation Card */}
      <main className="w-full bg-white border-2 border-frame rounded-2xl sm:rounded-[22px] shadow-[4px_4px_0_#141414] sm:shadow-[6px_6px_0_#141414] flex flex-col overflow-hidden transition-all">
        {/* TopBar with RoastControls */}
        <TopBar>
          <RoastControls
            roastLevel={roastLevel}
            onRoastLevelChange={setRoastLevel}
            language={language}
            onLanguageChange={setLanguage}
            onRoast={handleRoast}
            isRoasting={isRoasting}
            errorDrawerOpen={errorDrawerOpen}
            onToggleErrorDrawer={() => setErrorDrawerOpen((prev) => !prev)}
          />
        </TopBar>

        {/* Conditionally rendered Error Message Input Drawer */}
        {errorDrawerOpen && (
          <ErrorMessageInput
            value={errorMessage}
            onChange={setErrorMessage}
            onClose={() => setErrorDrawerOpen(false)}
          />
        )}

        {/* Split Row: CodeEditor (~54-55% width) + RoastReport (~46-45% width) */}
        <div className="flex flex-col lg:flex-row flex-1 min-h-[480px]">
          <div className="w-full lg:w-[54%] flex flex-col">
            <CodeEditor
              code={code}
              onChange={setCode}
              language={language}
              errorLine={errorLine}
              onLoadSample={handleLoadSample}
            />
          </div>

          <div className="w-full lg:w-[46%] flex flex-col">
            <RoastReport
              state={reportState}
              roastLevel={roastLevel}
              language={language}
              result={roastResult}
              errorMsg={apiError}
              onRetry={handleRoast}
              onApplyFix={handleApplyFix}
            />
          </div>
        </div>

        {/* StatusBar */}
        <StatusBar isRoasting={isRoasting} />
      </main>

      {/* Rangoli / Warli Geometric Decorative Strip */}
      <div className="w-full my-4 py-2 px-4 bg-white rounded-full brutal-card flex items-center justify-between text-frame text-xs font-mono select-none">
        <div className="flex items-center space-x-2 font-bold text-neutral-700">
          <span className="text-mustard">❖</span>
          <span>NASHIK TECH COMMUNITY</span>
          <span className="hidden sm:inline text-neutral-400">//</span>
          <span className="hidden sm:inline text-neutral-500 font-normal">
            कुठं नेऊन ठेवलाय कोड आमचा?
          </span>
        </div>

        {/* Geometric Motifs */}
        <div className="hidden md:flex items-center space-x-2 text-neutral-800 tracking-widest text-[11px]">
          <span>▲</span>
          <span className="text-mustard">●</span>
          <span>▼</span>
          <span className="text-google-blue">●</span>
          <span>▲</span>
          <span className="text-google-red">●</span>
          <span>▼</span>
          <span className="text-google-green">●</span>
          <span>▲</span>
        </div>

        <div className="flex items-center space-x-1.5 font-bold">
          <span className="w-2 h-2 rounded-full bg-google-green animate-pulse"></span>
          <span>100% OPEN FOR DEVFEST</span>
        </div>
      </div>
    </div>
  );
}
