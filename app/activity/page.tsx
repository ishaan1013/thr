import { Categories, Follow } from "@/components/activity";
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
      <Nav />

      <div className="px-3 mb-1">
        <div className="text-2xl font-semibold pt-8 pb-5">Activity</div>
        <Categories />
      </div>
      <Follow />
      <Follow />
    </>
  );
}
