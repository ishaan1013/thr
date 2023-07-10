"use client";

import { SignOutButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignOut() {
  const router = useRouter();

  return (
    <SignOutButton
      signOutCallback={() => {
        router.push("/");
      }}
    >
      <LogOut className="w-5 h-5 cursor-pointer" />
    </SignOutButton>
  );
}
