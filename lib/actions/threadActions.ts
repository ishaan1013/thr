"use server";

import { revalidatePath } from "next/cache";
import prisma from "../prisma";

export async function createThread(
  text: string,
  authorId: string,
  path: string
) {
  await prisma.post.create({
    data: {
      text,
      author: {
        connect: {
          id: authorId,
        },
      },
    },
  });

  if (path === "/" || path.startsWith("/@")) {
    revalidatePath(path);
  }
}

export async function commentOnThread(
  text: string,
  authorId: string,
  threadId: string,
  path: string
) {
  await prisma.post.create({
    data: {
      text,
      author: {
        connect: {
          id: authorId,
        },
      },
      parent: {
        connect: {
          id: threadId,
        },
      },
    },
  });

  revalidatePath(path);
}

export async function repostThread(
  id: string,
  reposterId: string,
  path: string
) {
  await prisma.repost.create({
    data: {
      post: {
        connect: {
          id,
        },
      },
      reposter: {
        connect: {
          id: reposterId,
        },
      },
    },
  });

  revalidatePath(path);
}

export async function deleteThread(id: string, path: string) {
  // ! navigate back to home if on dedicated page for this thread & its deleted

  await prisma.post.delete({
    where: {
      id,
    },
  });

  revalidatePath(path);
}

export async function likeThread(id: string, userId: string, path: string) {
  await prisma.post.update({
    where: {
      id,
    },
    data: {
      likes: {
        connect: {
          postId_userId: {
            postId: id,
            userId,
          },
        },
      },
    },
  });

  revalidatePath(path);
}

export async function unlikeThread(id: string, userId: string, path: string) {
  await prisma.post.update({
    where: {
      id,
    },
    data: {
      likes: {
        disconnect: {
          postId_userId: {
            postId: id,
            userId,
          },
        },
      },
    },
  });

  revalidatePath(path);
}
