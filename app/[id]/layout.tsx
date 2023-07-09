import Nav from "@/components/ui/nav";
import { Globe, Instagram, Menu } from "lucide-react";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default async function ProfilePageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const user = await currentUser();

  if (!user) return null;

  const getUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    include: {
      followedBy: true,
    },
  });

  if (!getUser) {
    return null;
  }

  const self = getUser.username === params.id;

  return (
    <>
      <Nav />
      <div className="px-3 relative flex w-full items-center justify-between mt-8 mb-6">
        <Globe className="w-5 h-5" />
        <div className="flex items-center space-x-3">
          <Instagram className="w-5 h-5" />
          <Menu className="w-5 h-5" />
        </div>
      </div>
      <div className="px-3 flex w-full justify-between items-start">
        <div className="grow">
          <div className="text-2xl font-semibold">{getUser?.name}</div>
          <div className="flex items-center mt-1">
            {getUser.username}
            <Badge variant="secondary" className="text-xs ml-2">
              Threads.net
            </Badge>
          </div>
          <div className="py-4 text-neutral-600">
            {getUser.followedBy.length} followers
          </div>
        </div>

        <div className="w-14 h-14 rounded-full overflow-hidden bg-neutral-600">
          <Image
            src={getUser.image}
            alt={getUser.name + "'s profile image"}
            height={56}
            width={56}
          />
        </div>
      </div>

      {self ? (
        <div className="w-full space-x-2 flex">
          <Button variant="outline" className="w-full">
            Edit Profile
          </Button>
          <Button variant="outline" className="w-full">
            Share Profile
          </Button>
        </div>
      ) : (
        <Button className="w-full" variant="outline">
          Follow
        </Button>
      )}
      <div className="w-full mt-4 flex">
        <button className="w-full h-10 py-2 font-semibold border-b border-b-white text-center">
          Threads
        </button>
        <button className="w-full h-10 py-2 font-medium border-b border-neutral-900 duration-200 hover:border-neutral-700 hover:text-neutral-500 text-center text-neutral-600">
          Replies
        </button>
      </div>
      {children}
    </>
  );
}
