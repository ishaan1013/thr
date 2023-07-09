import { auth, currentUser } from "@clerk/nextjs";
import prisma from "@/lib/prisma";

import { Screens } from "@/components/onboarding";
import { redirect } from "next/navigation";

export const revalidate = 0;

export default async function OnboardingLayout() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-up");
  }

  const getUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (getUser?.onboarded) {
    redirect("/");
  }

  const userData = {
    id: user.id,
    username: getUser ? getUser.username : user.id.slice(5),
    name: getUser ? getUser.name : user.firstName ?? "",
    bio: getUser ? getUser.bio : "",
    image: getUser ? getUser.image : user.imageUrl,
  };

  const allUsernames = await prisma.user.findMany({
    select: {
      username: true,
    },
  });

  return (
    <div className="px-3 pt-8">
      {user ? (
        <Screens allUsernames={allUsernames} userData={userData} />
      ) : null}
    </div>
  );
}
