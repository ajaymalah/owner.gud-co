"use client";
import Logo from "@/lib/constants/images/logo";
import Image from "next/image";
import { useTheme } from "next-themes";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { GithubIcon, Linkedin, Twitter } from "lucide-react";

const socials = [
  { id: "github", icon: <GithubIcon className="w-5 h-5" />, href: "https://github.com/yourusername" },
  { id: "linkedin", icon: <Linkedin className="w-5 h-5" />, href: "https://linkedin.com/in/yourusername" },
  { id: "twitter", icon: <Twitter className="w-5 h-5" />, href: "https://twitter.com/yourusername" },
];

export default function LeftSidebar() {
  const { theme, resolvedTheme } = useTheme();
  const currentTheme = theme === "system" ? resolvedTheme : theme;

  return (
    <div className=" hidden md:flex fixed top-1/2 left-8 -translate-y-1/2  flex-col items-center z-50 space-y-8">
      {/* Logo rotated */}
      {/* <div className="rotate-90">
        <Image
          src={currentTheme !== "dark" ? Logo.dark : Logo.light}
          alt="logo"
          width={120}
          height={20}
        />
      </div> */}
      
      <div className="h-2">
        
      </div>
      {/* Theme toggle */}
      <div>
        <ModeToggle />
      </div>

      {/* Social links */}
      <div className="flex flex-col items-center space-y-4">
        {socials.map((social) => (
          <a
            key={social.id}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full border-2 border-border bg-background text-foreground hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] transition-colors duration-300"
          >
            {social.icon}
          </a>
        ))}
      </div>

      {/* Vertical line under everything */}
      <div className="w-[2px] bg-border h-24 mt-6" />
    </div>
  );
}
