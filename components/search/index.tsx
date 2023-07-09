"use client";

import { Prisma } from "@prisma/client";
import { Bar } from "./bar";
import { SearchUser } from "./user";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchUI({
  users,
}: {
  users: Prisma.UserGetPayload<{
    include: {
      followedBy: true;
    };
  }>[];
}) {
  const router = useRouter();

  const [search, setSearch] = useState("");

  //query after 0.3s of no input
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        router.push("/search?q=" + search);
        // searchSongs(search, accessToken, setSongResults)
        // console.log("searching for: " + search);
      } else {
        router.push("/search");
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <>
      <div className="px-3 mb-1">
        <div className="text-2xl font-semibold pt-8 pb-5">Search</div>
        <Bar search={search} setSearch={setSearch} />
      </div>
      {users.length === 0 ? (
        <div className="text-neutral-600 mt-4 text-center leading-loose">
          No results
        </div>
      ) : (
        <>
          {users.map((user) => (
            <SearchUser key={user.id} user={user} />
          ))}
        </>
      )}
    </>
  );
}
