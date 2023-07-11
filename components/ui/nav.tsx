"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { Heart, Home, Search, User2 } from "lucide-react";
import { Modal } from "../thread/create";

export default function Nav({
  username,
  create,
}: {
  username: string | null;
  create: {
    id: string;
    name: string;
    image: string;
  };
}) {
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
      <Modal create={create} />
      <Link href="/activity">
        <Heart
          className={`w-6 h-6 ${
            path === "/activity" ? "" : "text-neutral-600"
          }`}
        />
      </Link>
      <Link href={`/${username}`}>
        {/* <SignOutButton> */}
        {username === null ? (
          <User2 className="w-6 h-6 text-neutral-600" />
        ) : (
          <User2
            className={`w-6 h-6 ${
              path === `/${username}` ? "" : "text-neutral-600"
            }`}
          />
        )}
        {/* </SignOutButton> */}
      </Link>
    </div>
  );
}
