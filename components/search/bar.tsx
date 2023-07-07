"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";

export function Bar() {
  const [search, setSearch] = useState("");

  return (
    <div className="relative">
      <Search className="w-4 h-4 absolute top-3 left-2.5 z-10" />
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="pl-8"
      />
    </div>
  );
}
