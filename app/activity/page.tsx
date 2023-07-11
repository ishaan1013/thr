import { Categories, Follow } from "@/components/activity";
import { Button } from "@/components/ui/button";
import Nav from "@/components/ui/nav";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function ActivityPage() {
  const user = await currentUser();

  const getUser = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });

  if (!getUser?.onboarded) {
    redirect("/onboarding");
  }

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

      <div className="px-3 mb-1">
        <div className="text-2xl font-semibold pt-8 pb-5">Activity</div>
        <Categories />
      </div>
      <div className="text-neutral-600 mt-4 text-center leading-loose">
        Coming soon 😃 Help contribute on{" "}
        <a href="https://www.github.com/ishaan1013/threads">
          <Button variant="link" className="pl-[3px] pr-0 text-base w-auto">
            GitHub
          </Button>
        </a>
        !
      </div>
      {/* <Follow />
      <Follow /> */}
    </>
  );
}
