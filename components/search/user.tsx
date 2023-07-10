import { Prisma, User } from "@prisma/client";
import { Button } from "../ui/button";
import Image from "next/image";
import { nFormatter } from "@/lib/utils";
import Link from "next/link";
import FollowButton from "./follow";

export function SearchUser({
  user,
  isFollowing,
  id,
}: {
  user: Prisma.UserGetPayload<{
    include: {
      followedBy: true;
    };
  }>;
  isFollowing: boolean;
  id: string;
}) {
  return (
    <Link href={`/${user.username}`} className="pl-3 pt-4 flex font-light">
      <div className="w-8 h-8 rounded-full bg-neutral-600 mt-1 mr-2 overflow-hidden">
        <Image
          src={user.image}
          height={32}
          width={32}
          className=""
          alt={user.name + "'s profile image"}
        />
      </div>
      <div className="grow flex items-start justify-between pb-4 pr-3 border-b border-neutral-900">
        <div>
          <div className="font-semibold">{user.username}</div>
          <div className="text-neutral-600 -mt-1 font-medium">{user.name}</div>
          <div className="mt-2 text-sm">
            {nFormatter(user.followedBy.length, 1)}{" "}
            {user.followedBy.length === 1 ? "follower" : "followers"}
          </div>
        </div>
        <FollowButton
          isFollowing={isFollowing}
          id={id}
          followingId={user.id}
          name={user.name}
        />
      </div>
    </Link>
  );
}
