"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { Edit, Heart, Home, Search, User2 } from "lucide-react";

export default function Nav() {
  const path = usePathname();

  return (
    <div className="w-full max-w-[500px] bg-neutral-950 z-50 fixed bottom-0 flex items-center justify-around p-3 pb-4">
      <Link href="/">
        <Home className={`w-6 h-6 ${path === "/" ? "" : "text-neutral-600"}`} />
      </Link>
      <Link href="/search">
        <Search
          className={`w-6 h-6 ${path === "/search" ? "" : "text-neutral-600"}`}
        />
      </Link>
      <button>
        <Edit className={`w-[22px] h-[22px] text-neutral-600`} />
      </button>
      <Link href="/activity">
        <Heart
          className={`w-6 h-6 ${
            path === "/activity" ? "" : "text-neutral-600"
          }`}
        />
      </Link>
      <Link href="/profile">
        <User2
          className={`w-6 h-6 ${path === "/profile" ? "" : "text-neutral-600"}`}
        />
      </Link>
    </div>
  );
}
