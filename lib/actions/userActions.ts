"use server";

import { revalidatePath } from "next/cache";
import prisma from "../prisma";
import { cleanup } from "../utils";

export async function changeUsername(
  username: string,
  userId: string,
  path: string
) {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      username: username.toLowerCase(),
    },
  });

  revalidatePath(path);
}

export async function editProfile(
  name: string,
  bio: string,
  userId: string,
  path: string
) {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name: cleanup(name),
      bio: cleanup(bio),
    },
  });

  revalidatePath(path);
}

// update all 3 in a function called "onboardData"

export async function onboardData(
  username: string,
  name: string,
  bio: string,
  image: string,
  userId: string
) {
  await prisma.user.create({
    data: {
      id: userId,
      username: username.toLowerCase(),
      name: cleanup(name),
      bio: cleanup(bio),
      image,
      onboarded: true,
    },
  });
}

export async function followUser(
  userId: string,
  followingId: string,
  path: string
) {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      following: {
        connect: {
          id: followingId,
        },
      },
    },
  });

  revalidatePath(path);
}

export async function unfollowUser(
  userId: string,
  followingId: string,
  path: string
) {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      following: {
        disconnect: {
          id: followingId,
        },
      },
    },
  });

  revalidatePath(path);
}
