"use client";
import Logo from "@/lib/constants/images/logo";
import Image from "next/image";
import { gsap } from "gsap";
import { useEffect } from "react";
import { useTheme } from "next-themes"; // <-- use next-themes

export default function Hero() {
  const { theme, resolvedTheme } = useTheme(); // current theme

  useEffect(() => {
    gsap.from("#logo", {
      opacity: 0,
      y: -20,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.2,
    });

    const items = gsap.utils.toArray("#owner > *");

    gsap.from(items, {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.25,
      delay: 0.5,
    });
  }, []);

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  return (
    <div className="h-screen w-[70vw] relative bg-transparent overflow-hidden">

      {/* Hero content at bottom-left */}
      <div className="absolute bottom-20 left-20 z-10 space-y-4">
        <p className="text-lg uppercase text-gray-300 -mb-1">
          Product Designer & Developer
        </p>

        <h1 className="text-7xl font-bold">Ajay Malah</h1>

        <p className="text-sm text-gray-500">
          Develop something good for world 2025
        </p>
      </div>
    </div>
  );
}
