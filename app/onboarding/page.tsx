import { auth, currentUser } from "@clerk/nextjs";
import prisma from "@/lib/prisma";

import { Screens } from "@/components/onboarding";
import { redirect } from "next/navigation";

export default async function OnboardingLayout() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const getUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  const userData = {
    id: user.id,
    username: getUser ? getUser.username : user.id.slice(5),
    name: getUser ? getUser.name : user.firstName ?? "",
    bio: getUser ? getUser.bio : "",
    image: getUser ? getUser.image : user.imageUrl,
  };

  if (!getUser) {
    await prisma.user.create({
      data: userData,
    });
  }

  return (
    <div className="px-3 pt-8">
      {user ? <Screens userData={userData} /> : null}
    </div>
  );
}
