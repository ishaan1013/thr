import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/threads.svg";
import { Button } from "@/components/ui/button";

import { currentUser } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import Nav from "@/components/ui/nav";
import { redirect } from "next/navigation";
import HomePosts from "@/components/thread/homePosts";

export const revalidate = 0;

export default async function Page() {
  const user = await currentUser();

  if (!user)
    return (
      <>
        <div className="h-16 w-16 bg-cover">
          <Image
            src={logo}
            alt="Threads logo"
            className="min-h-full invert min-w-full object-cover"
          />
        </div>
        <div className="gradient mt-4 mb-12 text-4xl font-bold">Threads</div>

        <Link href="/sign-up" className="w-full px-6">
          <Button className="w-full" variant="outline">
            Create Your Account
          </Button>
        </Link>
        <Link href="/sign-in" className="w-full px-6 mt-2">
          <Button className="w-full" variant="ghost">
            Sign In
          </Button>
        </Link>
      </>
    );

  const getUser = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });

  if (!getUser?.onboarded) {
    redirect("/onboarding");
  }

  const posts = await prisma.post.findMany({
    take: 20,
    orderBy: {
      createdAt: "desc",
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
    where: {
      parent: null,
    },
  });

  return (
    <>
      <Nav
        create={{
          id: getUser.id,
          name: getUser.name,
          image: getUser.image,
        }}
        username={getUser.username}
      />
      <div className="flex items-center justify-center w-full py-5">
        <div className="h-9 w-9 bg-cover">
          <Image
            src={logo}
            alt="Threads logo"
            className="min-h-full invert min-w-full object-cover"
          />
        </div>
      </div>

      {/* <div className="whitespace-pre text-xs">
        {JSON.stringify(posts, null, 2)}
      </div> */}
      <HomePosts posts={posts} />
    </>
    // </div>
    // </main>
  );
}
