"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";

export function Bar() {
  const [search, setSearch] = useState("");

  return (
    <div className="relative">
      <Search className="w-4 h-4 text-neutral-600 absolute top-3 left-2.5 z-10" />
      <Input
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="pl-8"
      />
    </div>
  );
}