import React from "react";

interface SectionHeaderProps {
  number: number;
  title: string;
  children?: React.ReactNode;
}

export default function SectionHeader({
  number,
  title,
  children,
}: SectionHeaderProps) {
  const paddedNumber = String(number).padStart(2, "0");

  return (
    <div className="flex items-center justify-between border-b-2 border-frame pb-2 mb-3">
      <span className="font-mono text-xs font-bold uppercase tracking-widest text-frame">
        {paddedNumber} // {title}
      </span>
      {children && <div className="flex items-center">{children}</div>}
    </div>
  );
}
