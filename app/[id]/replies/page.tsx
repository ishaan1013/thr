import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import Item from "@/components/thread";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import Image from "next/image";

export default async function RepliesPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await currentUser();

  if (!user) return null;

  const getUser = await prisma.user.findUnique({
    where: {
      username: params.id,
    },
  });

  const posts = await prisma.post.findMany({
    // where parent is not null
    where: {
      authorId: getUser?.id,
      NOT: {
        parent: null,
      },
    },
    include: {
      author: true,
      children: {
        include: {
          author: true,
        },
      },
      parent: {
        include: {
          author: true,
          children: {
            include: {
              author: true,
            },
          },
          parent: {
            include: {
              author: true,
            },
          },
          likes: true,
        },
      },
      likes: true,
    },
  });

  return (
    <>
      <div className="w-full mt-4 flex">
        <Link
          href={`/${params.id}`}
          className="w-full h-10 py-2 font-medium border-b border-neutral-900 duration-200 hover:border-neutral-700 hover:text-neutral-500 text-center text-neutral-600"
        >
          Threads
        </Link>
        <button className="w-full h-10 py-2 font-semibold border-b border-b-white text-center">
          Replies
        </button>
      </div>
      {posts.length === 0 ? (
        <div className="text-neutral-600 mt-4 text-center leading-loose">
          No replies posted yet.
        </div>
      ) : (
        posts.map((post) => (
          <>
            {post.parent && post.parent.parent ? (
              <Link href={"/t/" + post.parent.parentId}>
                <Button
                  size="sm"
                  variant="ghost"
                  className="flex pl-2 text-neutral-600"
                >
                  <ArrowUp className="w-4 h-4 mr-2" />
                  <div className="overflow-hidden rounded-full h-4 w-4 mr-2 bg-neutral-600">
                    <Image
                      src={post.parent.parent.author.image}
                      alt={post.parent.parent.author.name + "'s avatar"}
                      width={16}
                      height={16}
                    />
                  </div>
                  See earlier reply
                </Button>
              </Link>
            ) : null}
            {post.parent ? (
              <Item key={post.parent.id} parent data={post.parent} />
            ) : null}
            <Item data={post} key={post.id} />
          </>
        ))
      )}
    </>
  );
}
