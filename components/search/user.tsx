import { Prisma, User } from "@prisma/client";
import { Button } from "../ui/button";
import Image from "next/image";

export function SearchUser({
  user,
}: {
  user: Prisma.UserGetPayload<{
    include: {
      followedBy: true;
    };
  }>;
}) {
  const nFormatter = (num: number, digits: number) => {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup
      .slice()
      .reverse()
      .find(function (item) {
        return num >= item.value;
      });
    return item
      ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
      : "0";
  };

  return (
    <div className="pl-3 pt-4 flex font-light">
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
            {nFormatter(user.followedBy.length, 1)} Followers
          </div>
        </div>
        <Button variant="outline" size="sm">
          Follow
        </Button>
      </div>
    </div>
  );
}
