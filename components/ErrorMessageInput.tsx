import React from "react";

interface ErrorMessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

export default function ErrorMessageInput({
  value,
  onChange,
  onClose,
}: ErrorMessageInputProps) {
  return (
    <div className="bg-[#EFF2FB] border-b-2 border-frame px-4 py-3 transition-all">
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-mono text-[11px] font-bold tracking-wider text-frame uppercase flex items-center gap-1.5">
          <span className="text-google-red">●</span>
          Attach Terminal Traceback / Compiler Error (Optional)
        </span>
        <button
          type="button"
          onClick={onClose}
          className="font-mono text-xs font-bold text-neutral-600 hover:text-frame cursor-pointer"
        >
          Dismiss ✕
        </button>
      </div>

      <textarea
        rows={2}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="TypeError: unsupported operand type(s) for +=: 'int' and 'list'&#10;  File 'main.py', line 4, in calculate_average"
        className="w-full bg-white border-2 border-frame rounded-lg p-2.5 font-mono text-xs text-frame placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-frame resize-none leading-relaxed"
      />
    </div>
  );
}
