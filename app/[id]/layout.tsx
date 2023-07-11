import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

import Nav from "@/components/ui/nav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";

import logo from "@/assets/threads.svg";
import { InfoModal } from "@/components/profile/info";
import SelfShare from "@/components/profile/selfShare";
import { nFormatter } from "@/lib/utils";
import SignOut from "@/components/profile/signOut";
import { EditModal } from "@/components/profile/edit";
import FollowButton from "@/components/profile/follow";

export default async function ProfilePageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const user = await currentUser();

  if (!user) return null;

  const getSelf = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!getSelf?.onboarded) {
    redirect("/onboarding");
  }

  const getUser = await prisma.user.findUnique({
    where: {
      username: params.id,
    },
    include: {
      followedBy: true,
    },
  });

  if (!getUser) {
    return (
      <>
        <Nav
          create={{
            id: "",
            name: "",
            image: "",
          }}
          username={null}
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
        <div className="font-semibold text-center mt-24">
          Sorry, this page isn&apos;t available
        </div>
        <div className="text-center text-neutral-600 mt-4">
          The link you followed may be broken, or the page may have been
          removed.
        </div>
      </>
    );
  }

  const self = getSelf.username === params.id;

  const isFollowing = self
    ? false
    : getUser.followedBy.some((follow) => follow.id === getSelf.id);

  return (
    <>
      <Nav
        create={{
          id: getSelf.id,
          name: getSelf.name,
          image: getSelf.image,
        }}
        username={getSelf.username}
      />
      <div className="px-3 relative flex w-full items-center justify-end mt-8 mb-6">
        {/* <Globe className="w-5 h-5" /> */}
        <div className="flex items-center space-x-3">
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
            <Instagram className="w-5 h-5" />
          </a>
          <InfoModal />
          <SignOut />
        </div>
      </div>
      <div className="px-3 flex w-full justify-between items-start">
        <div className="grow">
          <div className="text-2xl font-semibold">{getUser?.name}</div>
          <div className="flex items-center mt-1">
            {getUser.username}
            <Badge variant="secondary" className="text-xs ml-2">
              threads.net
            </Badge>
          </div>
          {getUser.bio ? (
            <div className="pt-4 leading-relaxed">{getUser.bio}</div>
          ) : null}
          <div className="py-4 text-neutral-600">
            {nFormatter(getUser.followedBy.length, 1)}{" "}
            {getUser.followedBy.length === 1 ? "follower" : "followers"}
          </div>
        </div>

        <div className="w-14 h-14 rounded-full overflow-hidden bg-neutral-600">
          <Image
            src={getUser.image}
            alt={getUser.name + "'s profile image"}
            height={56}
            width={56}
          />
        </div>
      </div>

      {self ? (
        <div className="w-full space-x-2 flex px-3">
          <EditModal data={getUser} />
          <SelfShare name={getUser.name} username={getUser.username} />
        </div>
      ) : (
        <div className="w-full px-3">
          <FollowButton
            id={getSelf.id}
            followingId={getUser.id}
            name={getUser.name}
            isFollowing={isFollowing}
          />
        </div>
      )}

      {children}
    </>
  );
}
