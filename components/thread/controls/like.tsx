"use client";

import { likeThread, unlikeThread } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export default function Like({
  post,
  numPosts,
  likes,
}: {
  post: string;
  numPosts?: number;
  likes: string[];
}) {
  const [liked, setLiked] = useState(false);

  const { isLoaded, isSignedIn, user } = useUser();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (user) {
      if (likes.includes(user.id)) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    }
  }, [user, numPosts]);

  const handleLike = () => {
    const wasLiked = liked;
    setLiked(!liked);
    if (user) {
      if (!wasLiked) {
        startTransition(() => likeThread(post, user.id, pathname));
      } else {
        startTransition(() => unlikeThread(post, user.id, pathname));
      }
    }
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleLike();
      }}
      className={`w-5 duration-200 h-5 ${liked ? "text-red-600" : ""}`}
    >
      <Heart fill={liked ? "#dc2626" : "#0a0a0a"} className="w-5 h-5" />
    </button>
  );
}
