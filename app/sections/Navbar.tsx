"use client"

import { sections } from "@/lib/data/section"
import React, { useEffect, useState } from "react"


export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero")

  // Scroll to section on click
  const handleScroll = (id: string) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  // IntersectionObserver to detect current section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        root: null, // viewport
        rootMargin: "0px",
        threshold: 0.5, // 50% of section visible
      }
    )

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id)
      if (el) observer.observe(el)
    })

    return () => {
      sections.forEach((sec) => {
        const el = document.getElementById(sec.id)
        if (el) observer.unobserve(el)
      })
    }
  }, [])

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">Ajay Malah</div>
        <ul className="flex gap-6">
          {sections.map((sec) => (
            <li key={sec.id}>
              <button
                onClick={() => handleScroll(sec.id)}
                className={`transition-colors ${
                  activeSection === sec.id
                    ? "text-blue-500 font-semibold"
                    : "text-gray-700 hover:text-blue-500"
                }`}
              >
                {sec.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
