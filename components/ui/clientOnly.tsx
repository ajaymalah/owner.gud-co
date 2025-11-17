"use client";
import { useEffect, useState } from "react";

export default function ClientOnly({ children }:{children:any}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;   // ⛔ Prevents hydration flicker

  return children;
}
