import Item from "@/components/thread";
import MainItem from "@/components/thread/main";
import prisma from "@/lib/prisma";

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
          children: true,
          parent: true,
          likes: true,
        },
      },
      parent: true,
      likes: true,
    },
  });

  if (!post) {
    return <div className="text-center text-neutral-600">Post not found.</div>;
  }

  return (
    <>
      <MainItem key={post.id} data={post} />
      {post.children.map((child) => (
        <Item key={child.id} data={child} />
      ))}
    </>
  );
}
