"use client"

import About from "./sections/about/About";
import About1 from "./sections/about/About1";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";

export default function Home() {
  return (
    <div
      id="scroll-container"
      className="h-screen max-w-7xl mx-auto overflow-y-scroll snap-y snap-mandatory scroll-smooth"
    >
      <section id="hero" className="snap-start min-h-screen w-full"><Hero /></section>
      <section id="about" className="snap-start min-h-screen w-full"><About /></section>
      <section id="about-1" className="snap-start min-h-screen w-full"><About1 /></section>
      <section id="about-2" className="snap-start min-h-screen w-full"><Projects /></section>
      <section id="contact" className="snap-start min-h-screen w-full"><Contact /></section>
      <section id="footer" className="snap-start min-h-screen w-full"><Footer /></section>
    </div>
  );
}
