"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import Share from "./share";
import { Modal } from "../comment";
import Repost from "./repost";
import { Prisma } from "@prisma/client";

export default function Controls({
  data,
}: {
  data: Prisma.PostGetPayload<{
    include: {
      author: true;
      children: true;
      parent: true;
      likes: true;
    };
  }>;
}) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="flex items-center space-x-3.5 py-2">
      <button
        onClick={() => setLiked(!liked)}
        className={`w-5 duration-200 h-5 ${liked ? "text-red-600" : ""}`}
      >
        <Heart fill={liked ? "#dc2626" : "#0a0a0a"} className="w-5 h-5" />
      </button>
      <Modal data={data} />
      <Repost />
      <Share />
    </div>
  );
}
