import Item from "@/components/thread";
import MainItem from "@/components/thread/main";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { ArrowUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 0;

export default async function ThreadPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
      children: {
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

  if (!post) {
    return <div className="text-center text-neutral-600">Post not found.</div>;
  }

  return (
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
      <MainItem key={post.id} data={post} />
      {post.children.map((child) => (
        <Item key={child.id} data={child} />
      ))}
    </>
  );
}
