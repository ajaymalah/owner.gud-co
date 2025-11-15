
import About from "./sections/about/About";
import About1 from "./sections/about/About1";

import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Background3d from "@/components/ui/bg";

export default function Home() {
  return (
    <div
      id="scroll-container"
      className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth"
    >
 
      <section id="hero" className="snap-start"><Hero /></section>
      <section id="about" className="snap-start"><About /></section>
      <section id="about-1" className="snap-start"><About1 /></section>
      <section id="about-2" className="snap-start"><Projects /></section>
      <section id="contact" className="snap-start"><Contact /></section>
      <section className="snap-start"><Footer /></section>

    </div>

  )
}
