import { Globe, Instagram, Menu } from "lucide-react";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import Item from "@/components/thread";

export default async function ProfilePage() {
  const user = await currentUser();

  if (!user) return null;

  const posts = await prisma.post.findMany({
    where: {
      authorId: user.id,
    },
    include: {
      author: true,
      children: {
        include: {
          author: true,
        },
      },
      parent: true,
      likes: true,
    },
  });

  return (
    <>
      {posts.length === 0 ? (
        <div className="text-neutral-600 mt-4 text-center leading-loose">
          You haven't posted any threads yet.
        </div>
      ) : (
        posts.map((post) => <Item data={post} key={post.id} />)
      )}
    </>
  );
}
