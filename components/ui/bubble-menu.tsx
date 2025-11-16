"use client";

import { useState, useEffect, useRef } from "react";
import { Tooltip } from "@/components/ui/tooltip";
import Link from "next/link";
import { Home, User, Folder, Mail } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

const sections = [
  { id: "hero", label: "Home", icon: <Home className="w-4 h-4" /> },
  {
    id: "about",
    label: "About",
    icon: <User className="w-4 h-4" />,
    sub: [
      { id: "about", label: "About" },
      { id: "about-1", label: "About 1" },
    ],
  },
  { id: "about-2", label: "Projects", icon: <Folder className="w-4 h-4" /> },
  { id: "contact", label: "Contact", icon: <Mail className="w-4 h-4" /> },
];

export default function BubbleMenu() {
  const [activeSection, setActiveSection] = useState("hero");
  const [lineHeight, setLineHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = document.getElementById("scroll-container");
    if (!container) return;
    containerRef.current = container as HTMLDivElement;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const middle = scrollTop + container.clientHeight / 2;

      let current = "hero";
      sections.forEach((section) => {
        if (section.sub) {
          section.sub.forEach((sub) => {
            const el = document.getElementById(sub.id);
            if (!el) return;
            const top = el.offsetTop;
            const bottom = top + el.offsetHeight;
            if (middle >= top && middle < bottom) current = sub.id;
          });
        } else {
          const el = document.getElementById(section.id);
          if (!el) return;
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (middle >= top && middle < bottom) current = section.id;
        }
      });

      setActiveSection(current);

      // Update line fill based on reached sections
      const firstEl = document.getElementById(sections[0].id);
      const lastEl = document.getElementById(sections[sections.length - 1].id);
      if (firstEl && lastEl) {
        const start = firstEl.offsetTop;
        const end = lastEl.offsetTop + lastEl.offsetHeight;
        const totalHeight = end - start;
        const fill = Math.min(Math.max(scrollTop + container.clientHeight / 2 - start, 0), totalHeight);
        setLineHeight((fill / totalHeight) * 100);
      }
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const isParentActive = (section: any) => section.sub?.some((sub: { id: string }) => sub.id === activeSection);

  const getLabel = (section: any) => {
    if (section.sub) {
      const sub = section.sub.find((s: { id: string }) => s.id === activeSection);
      return sub ? sub.label : null;
    }
    return section.id === activeSection ? section.label : null;
  };

  const getBubbleFill = (section: any, sub?: any) => {
    const container = document.getElementById("scroll-container");
    if (!container) return false;

    if (sub) {
      const el = document.getElementById(sub.id);
      return el ? container.scrollTop + container.clientHeight / 2 >= el.offsetTop : false;
    }

    if (section.sub) {
      return section.sub.some((s: any) => getBubbleFill(section, s));
    }

    const el = document.getElementById(section.id);
    return el ? container.scrollTop + container.clientHeight / 2 >= el.offsetTop : false;
  };

  return (
    <div className="fixed top-1/2 right-8 -translate-y-1/2 flex flex-col items-center z-50">
      {/* Mode toggle at the top */}
  
      {/* Vertical background line */}
      <div className="absolute top-0 bottom-0 w-[2px] border-l border-border" />

      {/* Fill line */}
      <div
        className="absolute top-0 left-1/2 w-[2px] bg-[var(--accent)] origin-top"
        style={{ height: `${lineHeight}%`, transform: "translateX(-50%)" }}
      />

      {/* Bubbles */}
      <div className="flex flex-col gap-6 relative z-10">
        {sections.map((section) => (
          <div key={section.id} className="flex flex-col items-center relative">
            {/* Main bubble */}
            <Tooltip open={activeSection === section.id || isParentActive(section)}>
              <Link href={`#${section.id}`}>
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full border-2 cursor-pointer
                    ${getBubbleFill(section) ? "bg-[var(--accent)] border-[var(--accent)] scale-110" : "bg-background border-border"} 
                    transition-all duration-300`}
                >
                  {section.icon}
                </div>
              </Link>
            </Tooltip>

            {/* Badge for active section */}
            {(activeSection === section.id || isParentActive(section)) && (
              <span className="absolute right-12 top-1/2 -translate-y-1/2 bg-[var(--accent)] text-[var(--accent-foreground)] text-xs px-2 py-0.5 rounded-full whitespace-nowrap">
                {getLabel(section)}
              </span>
            )}

            {/* Sub-bubbles without icons */}
            {section.sub && (
              <div className="flex flex-col mt-2 gap-2">
                {section.sub.map((sub) => (
                  <Tooltip key={sub.id} open={activeSection === sub.id}>
                    <Link href={`#${sub.id}`}>
                      <div
                        className={`w-4 h-4 rounded-full border cursor-pointer
                          ${getBubbleFill(section, sub) ? "bg-[var(--accent)] border-[var(--accent)]" : "bg-background border-border"} 
                          transition-all duration-300`}
                      />
                    </Link>
                  </Tooltip>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
