"use client";

import { Edit, Heart, Home, Search, User2 } from "lucide-react";
import Link from "next/link";

export default function Nav() {
  return (
    <div className="w-full max-w-[500px] bg-black z-50 fixed bottom-0 flex items-center justify-around p-3 pb-4">
      <Link href="/">
        <Home className="w-6 h-6" />
      </Link>
      <Link href="/search">
        <Search className="w-6 h-6 text-neutral-600" />
      </Link>
      <button>
        <Edit className="w-[22px] h-[22px] text-neutral-600" />
      </button>
      <Link href="/activity">
        <Heart className="w-6 h-6 text-neutral-600" />
      </Link>
      <Link href="/profile">
        <User2 className="w-6 h-6 text-neutral-600" />
      </Link>
    </div>
  );
}
