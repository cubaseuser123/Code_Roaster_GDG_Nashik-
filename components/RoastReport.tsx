"use client";

import React from "react";
import { ReportState, RoastResult } from "@/types/roast";
import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import SectionHeader from "./SectionHeader";
import IssueCard from "./IssueCard";
import FixedCode from "./FixedCode";

interface RoastReportProps {
  state: ReportState;
  roastLevel: string;
  language: string;
  result: RoastResult | null;
  errorMsg?: string | null;
  onRetry: () => void;
  onApplyFix: (code: string) => void;
}

export default function RoastReport({
  state,
  roastLevel,
  language,
  result,
  errorMsg,
  onRetry,
  onApplyFix,
}: RoastReportProps) {
  const hasFixedCode = Boolean(result?.correctedCode && result.correctedCode.trim() !== "");
  const hasTakeaway = Boolean(result?.takeaway && result.takeaway.trim() !== "");
  const takeawaySectionNumber = hasFixedCode ? 4 : 3;

  return (
    <div className="flex-1 flex flex-col bg-white min-h-[440px] border-t-2 lg:border-t-0 lg:border-l-2 border-frame">
      {/* 40px Header Strip */}
      <div className="h-10 bg-cream border-b-2 border-frame px-4 flex items-center justify-between select-none">
        <span className="font-mono text-xs font-bold tracking-widest text-frame uppercase">
          AUDIT // REPORT
        </span>
        <span className="font-display font-bold text-xs sm:text-sm text-frame tracking-tight uppercase">
          Roast Report
        </span>
        <div className="w-12 flex justify-end">
          {state === "results" && (
            <span className="w-2.5 h-2.5 rounded-full bg-google-green"></span>
          )}
        </div>
      </div>

      {/* Body Content based on state */}
      {state === "empty" && <EmptyState />}

      {state === "loading" && <LoadingState />}

      {state === "error" && (
        <ErrorState error={errorMsg} onRetry={onRetry} />
      )}

      {state === "results" && result && (
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
          
          {/* Section 1: Roast */}
          <div>
            <SectionHeader number={1} title="Roast">
              <span className="font-mono text-[11px] font-bold text-neutral-600 bg-neutral-100 border border-neutral-300 px-2 py-0.5 rounded-full uppercase">
                STYLE: {roastLevel}
              </span>
            </SectionHeader>

            <blockquote className="bg-cream/60 border-l-4 border-mustard p-3.5 sm:p-4 rounded-r-xl my-2 italic font-sans text-sm sm:text-base text-frame leading-relaxed shadow-sm">
              &ldquo;{result.roast}&rdquo;
            </blockquote>
          </div>

          {/* Section 2: What's Wrong */}
          <div>
            <SectionHeader number={2} title="What's Wrong">
              <span className="font-mono text-[11px] font-bold text-frame bg-mustard/20 border border-mustard px-2 py-0.5 rounded-full uppercase">
                {result.issues.length}{" "}
                {result.issues.length === 1 ? "ISSUE" : "ISSUES"}
              </span>
            </SectionHeader>

            {result.issues.length === 0 ? (
              <div className="p-4 bg-google-green/10 border-2 border-google-green rounded-xl text-google-green font-mono text-xs font-bold text-center">
                ✓ No issues found. Suspiciously clean.
              </div>
            ) : (
              <div className="space-y-3">
                {result.issues.map((issue, idx) => (
                  <IssueCard key={idx} index={idx} issue={issue} />
                ))}
              </div>
            )}
          </div>

          {/* Section 3: Fix (ONLY when correctedCode is non-empty) */}
          {hasFixedCode && (
            <FixedCode
              sectionNumber={3}
              language={language}
              code={result.correctedCode}
              onApply={onApplyFix}
            />
          )}

          {/* Takeaway Section (ONLY when takeaway is non-empty) */}
          {hasTakeaway && (
            <div>
              <SectionHeader number={takeawaySectionNumber} title="Takeaway" />
              <div className="bg-white border-2 border-frame rounded-xl p-3.5 sm:p-4 shadow-[2px_2px_0_#141414] font-sans text-xs sm:text-sm text-neutral-800 leading-relaxed">
                <span className="font-bold text-mustard mr-1.5 font-mono text-sm">💡</span>
                {result.takeaway}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
