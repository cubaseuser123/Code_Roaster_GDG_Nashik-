import React from "react";
import { RoastIssue, Severity } from "@/types/roast";

interface IssueCardProps {
  index: number;
  issue: RoastIssue;
}

const SEVERITY_STYLES: Record<
  Severity,
  { bg: string; text: string; border: string; badgeBg: string }
> = {
  "FATAL BUG": {
    bg: "bg-[#FDF2F0]",
    text: "text-[#D9503F]",
    border: "border-[#D9503F]",
    badgeBg: "bg-[#D9503F]/15",
  },
  "CODE SMELL": {
    bg: "bg-[#FEF8EC]",
    text: "text-[#B27B1E]",
    border: "border-[#EDB13E]",
    badgeBg: "bg-[#EDB13E]/20",
  },
  OPTIMIZATION: {
    bg: "bg-[#F0F8F1]",
    text: "text-[#2E7D32]",
    border: "border-[#4FA35A]",
    badgeBg: "bg-[#4FA35A]/15",
  },
};

export default function IssueCard({ index, issue }: IssueCardProps) {
  const paddedIndex = String(index + 1).padStart(2, "0");
  const severityStyle =
    SEVERITY_STYLES[issue.severity] || SEVERITY_STYLES["CODE SMELL"];

  return (
    <div className="bg-white border-2 border-frame rounded-xl p-3.5 sm:p-4 mb-3 shadow-[2px_2px_0_#141414] transition-all">
      {/* Top Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center space-x-2">
          {/* Black Index Chip */}
          <span className="bg-frame text-white text-[10px] font-mono font-bold px-1.5 py-0.5 rounded">
            #{paddedIndex}
          </span>
          {/* Line number */}
          <span className="font-mono text-xs font-bold text-frame">
            LINE {issue.line}
          </span>
          {/* Severity Badge */}
          <span
            className={`font-mono text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border ${severityStyle.border} ${severityStyle.text} ${severityStyle.badgeBg}`}
          >
            {issue.severity}
          </span>
        </div>

        {/* Issue Title (wraps, never clips) */}
        <span className="font-sans text-xs text-neutral-600 font-medium break-words text-right flex-1 min-w-[120px]">
          {issue.title}
        </span>
      </div>

      {/* Code Snippet Block with Left Stripe */}
      {issue.codeSnippet && issue.codeSnippet.trim() !== "" && (
        <pre className="bg-[#171717] text-neutral-200 text-xs font-mono p-2.5 rounded-lg border-l-4 border-accent overflow-x-auto my-2.5 whitespace-pre">
          <code>{issue.codeSnippet}</code>
        </pre>
      )}

      {/* Diagnosis & Expected */}
      <div className="space-y-1.5 text-xs font-mono mt-2">
        <div className="text-accent leading-relaxed">
          <strong className="font-bold text-[#D9503F] mr-1.5">✕ Diagnosis:</strong>
          <span className="text-neutral-800 font-sans font-medium">{issue.diagnosis}</span>
        </div>
        <div className="text-google-green leading-relaxed">
          <strong className="font-bold text-google-green mr-1.5">✓ Expected:</strong>
          <span className="text-neutral-800 font-sans font-medium">{issue.expected}</span>
        </div>
      </div>
    </div>
  );
}
