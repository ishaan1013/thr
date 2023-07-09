"use server";

import { revalidatePath } from "next/cache";
import prisma from "../prisma";

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
      username,
    },
  });

  revalidatePath(path);
}

export async function changeName(name: string, userId: string, path: string) {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name,
    },
  });

  revalidatePath(path);
}

export async function changeBio(bio: string, userId: string, path: string) {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      bio,
    },
  });

  revalidatePath(path);
}

// update all 3 in a function called "onboardData"

export async function onboardData(
  username: string,
  name: string,
  bio: string,
  userId: string
) {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      username,
      name,
      bio,
    },
  });
}
