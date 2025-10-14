// components/Navbar.tsx
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-6 bg-white shadow-md">
      <Link href="/" className="text-2xl font-bold">GudCo</Link>
      <div className="space-x-6">
        <Link href="/about" className="hover:text-blue-600">About</Link>
        <Link href="/projects" className="hover:text-blue-600">Projects</Link>
        <Link href="/skills" className="hover:text-blue-600">Skills</Link>
        <Link href="/contact" className="hover:text-blue-600">Contact</Link>
      </div>
    </nav>
  );
}
