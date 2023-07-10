"use client";

import { Loader2, Paperclip } from "lucide-react";
import { Button } from "../../ui/button";
import { useEffect, useState, useTransition } from "react";
import { Prisma } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { replyToThread } from "@/lib/actions";
import { useToast } from "@/components/ui/use-toast";

export function Create({
  itemData,
  setOpen,
}: {
  itemData: Prisma.PostGetPayload<{
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
  setOpen: (open: boolean) => void;
}) {
  const [comment, setComment] = useState("");
  const [clicked, setClicked] = useState(false);

  const { toast } = useToast();
  const { isSignedIn, isLoaded, user } = useUser();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  useEffect(() => {
    if (clicked && !isPending) {
      setComment("");
      setOpen(false);
      setClicked(false);
      toast({
        title: "Replied to thread",
      });
    }
  }, [isPending]);

  if (!isLoaded || !isSignedIn) return null;

  return (
    <div>
      <div className="space-x-2 flex font-light">
        <div className="flex flex-col items-center justify-start">
          <div className="w-8 h-8 rounded-full bg-neutral-600 overflow-hidden">
            <Image
              src={user.imageUrl}
              height={32}
              width={32}
              className=""
              alt={user.fullName + "'s profile image"}
            />
          </div>
          <div className="w-0.5 grow mt-2 rounded-full bg-neutral-800" />
        </div>
        <div className="w-full">
          <div className="font-semibold text-left">Me</div>
          <textarea
            value={comment}
            onChange={(e) => {
              if (e.target.value.length > 200) return;
              setComment(e.target.value);
            }}
            className="mt-1 mini-scrollbar text-base/relaxed resize-none h-16 bg-transparent w-full placeholder:text-neutral-600 pb-1 outline-none focus:border-b border-b-neutral-700"
            placeholder={`Reply to ${itemData.author.name}...`}
          />
          <div className="mt-1 text-end font-medium text-xs text-neutral-600">
            {comment.length}/200
          </div>
          {/* for adding attachments in the future */}
          {/* <Paperclip className="w-[18px] h-[18px] mt-3" /> */}
        </div>
      </div>
      <Button
        disabled={comment.length === 0}
        variant="outline"
        className="w-full mt-4"
        onClick={() => {
          startTransition(() =>
            replyToThread(comment, user.id, itemData.id, pathname)
          );
          setClicked(true);
        }}
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin text-neutral-600" />
        ) : (
          "Post"
        )}
      </Button>
      {/* <div className="flex justify"></div> */}
    </div>
  );
}
