import SearchUI from "@/components/search";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Nav from "@/components/ui/nav";

export const revalidate = 0;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const getUser = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });

  if (!getUser?.onboarded) {
    redirect("/onboarding");
  }

  if (searchParams?.q) {
    // if there's a query, return users that match the query
    const users = await prisma.user.findMany({
      include: {
        followedBy: true,
      },
      where: {
        NOT: {
          id: user.id,
        },
        OR: [
          {
            username: {
              contains: searchParams.q as string,
              mode: "insensitive",
            },
          },
          {
            name: {
              contains: searchParams.q as string,
              mode: "insensitive",
            },
          },
        ],
      },
      orderBy: {
        followedBy: {
          _count: "desc",
        },
      },
    });

    return <SearchUI users={users} />;
  }

  // if there's no query, return top followed users
  const users = await prisma.user.findMany({
    include: {
      followedBy: true,
    },
    where: {
      NOT: {
        id: user.id,
      },
    },
    orderBy: {
      followedBy: {
        _count: "desc",
      },
    },
  });

  return (
    <>
      <Nav username={getUser.username} />

      <SearchUI users={users} />
    </>
  );
}
