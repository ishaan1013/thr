"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import Share from "./share";
import CommentModal from "../comment/commentModal";
import Repost from "./repost";

export default function Controls() {
  const [liked, setLiked] = useState(false);

  return (
    <div className="flex items-center space-x-3.5 py-2">
      <button
        onClick={() => setLiked(!liked)}
        className={`w-5 duration-200 h-5 ${liked ? "text-red-600" : ""}`}
      >
        <Heart fill={liked ? "#dc2626" : ""} className="w-5 h-5" />
      </button>
      <CommentModal />
      <Repost />
      <Share />
    </div>
  );
}
