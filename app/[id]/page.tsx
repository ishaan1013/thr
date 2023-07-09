import { Globe, Instagram, Menu } from "lucide-react";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";

export default async function ProfilePage() {
  const user = await currentUser();

  if (!user) return null;

  const getUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    include: {
      followedBy: true,
      posts: {
        include: {
          children: {
            include: {
              author: true,
            },
          },
          parent: true,
          likes: true,
        },
      },
    },
  });

  return (
    <>
      <div className="px-3 relative flex w-full items-center justify-between mt-8 mb-6">
        <Globe className="w-5 h-5" />
        <div className="flex items-center space-x-3">
          <Instagram className="w-5 h-5" />
          <Menu className="w-5 h-5" />
        </div>
      </div>
      <div className="flex w-full justify-between items-start">
        <div className="text-2xl font-semibold"></div>
      </div>
    </>
  );
}
