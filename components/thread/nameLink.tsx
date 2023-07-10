"use client";

import { useRouter } from "next/navigation";

export default function NameLink({
  name,
  username,
}: {
  name: string;
  username: string;
}) {
  const router = useRouter();

  return (
    <div
      className="font-semibold"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        router.push(`/${username}`);
      }}
    >
      {name}
    </div>
  );
}
