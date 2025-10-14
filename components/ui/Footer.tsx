// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-20">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        <p>&copy; {new Date().getFullYear()} GudCo Technologies. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link href="mailto:info@gud-co.com" className="hover:text-white">Email</Link>
          <Link href="https://linkedin.com/in/ajaymalah" target="_blank" className="hover:text-white">LinkedIn</Link>
          <Link href="https://github.com/ajaymalah" target="_blank" className="hover:text-white">GitHub</Link>
        </div>
      </div>
    </footer>
  );
}
