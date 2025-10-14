// components/HeroSection.tsx
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-b from-blue-50 to-white">
      <h1 className="text-6xl font-bold">Ajay Malah</h1>
      <p className="mt-4 text-2xl text-gray-700">
        Full Stack Developer & Tech Innovator
      </p>
      <Link
        href="/projects"
        className="mt-8 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        View My Work
      </Link>
    </section>
  );
}
