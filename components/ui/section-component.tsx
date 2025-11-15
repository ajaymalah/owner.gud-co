import React from "react";
import { Separator } from "./separator";

interface SectionComponentProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function SectionComponent({
  title,
  children,
  className = "",
}: SectionComponentProps) {
  return (
    <div
      className={`flex flex-col justify-between px-8 h-full space-y-2 ${className}`}
    >
      {/* Header */}
      <div>
        <h2 className="pb-2 text-lg font-semibold">{title}</h2>
        <Separator />
      </div>

      {/* Main Content */}
      <div className="flex-1">{children}</div>

      {/* Footer */}
      <div>
        <Separator />
        <div className="px-2 hidden md:flex font-light text-sm flex justify-between mt-2">
          <h3>AJAY MALAH</h3>
          <h3>SOFTWARE ENGG & TECH CREATOR</h3>
          <h3>2025</h3>
        </div>
      </div>
    </div>
  );
}
