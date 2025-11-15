"use client"
import Logo from "@/lib/constants/images/logo"
import Image from "next/image"
import { gsap } from "gsap";
import { useEffect } from "react";
import { useTheme } from "next-themes";
import { getSystemTheme } from "@/lib/helper/getTheme";

export default function Hero() {

  useEffect(() => {
  
    gsap.from("#logo", {
      opacity: 0,
      y: -20,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.2
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

  return (
    <div className="h-screen w-screen relative flex items-end justify-start pb-20 pl-20">
      
      {/* Animated Theme Logo */}
      <div id="logo" className="absolute top-12 left-20">
        <Image
          src={ getSystemTheme() ? Logo.light : Logo.dark}
          alt="logo"
          width={120}
          height={20}
        />
      </div>

      <div id="owner" className="relative z-10 space-y-4">
        <p className="text-lg uppercase text-gray-300 -mb-1">
          Product Designer & Developer
        </p>

        <h1 className="text-7xl font-bold">Ajay Malah</h1>

        <p className="text-sm text-gray-500">
          Develop something good for world 2025
        </p>
      </div>
    </div>
  )
}
