"use client";

import Share from "./share";
import { Modal } from "../comment";
import Repost from "./repost";
import { Prisma } from "@prisma/client";
import Like from "./like";

export default function Controls({
  data,
  numPosts,
}: {
  data: Prisma.PostGetPayload<{
    include: {
      author: true;
      children: {
        include: {
          author: true;
        };
      };
      parent: true;
      likes: true;
    };
  }>;
  numPosts?: number;
}) {
  const likes = data.likes.map((like) => like.userId);

  return (
    <div className="flex items-center space-x-3.5 py-2">
      <Like likes={likes} numPosts={numPosts} post={data.id} />
      <Modal data={data} />
      <Repost />
      <Share />
    </div>
  );
}
