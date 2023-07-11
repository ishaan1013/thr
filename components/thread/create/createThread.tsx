"use client";

import { createThread } from "@/lib/actions";
import { Button } from "../../ui/button";
import { useEffect, useState, useTransition } from "react";
import Image from "next/image";

import { usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function Create({
  setOpen,
  create,
}: {
  setOpen: (open: boolean) => void;
  create: {
    id: string;
    name: string;
    image: string;
  };
}) {
  const [thread, setThread] = useState("");
  const [clicked, setClicked] = useState(false);

  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  useEffect(() => {
    if (clicked && !isPending) {
      setThread("");
      setOpen(false);
      setClicked(false);
      toast({
        title: "Thread created",
      });
    }
  }, [isPending]);

  return (
    <div>
      <div className="space-x-2 flex font-light">
        <div className="flex flex-col items-center justify-start">
          <div className="w-8 h-8 rounded-full bg-neutral-600 overflow-hidden">
            <Image
              src={create.image}
              height={32}
              width={32}
              className=""
              alt={create.name + "'s profile image"}
            />
          </div>
          <div className="w-0.5 grow mt-2 rounded-full bg-neutral-800" />
        </div>
        <div className="w-full">
          <div className="font-semibold text-left">Me</div>
          <textarea
            value={thread}
            onChange={(e) => {
              if (e.target.value.length > 200) return;
              setThread(e.target.value);
            }}
            className="mt-1 mini-scrollbar text-base/relaxed resize-none h-16 bg-transparent w-full placeholder:text-neutral-600 pb-1 outline-none focus:border-b border-b-neutral-700"
            placeholder="Start a thread..."
          />
          <div className="mt-1 text-end font-medium text-xs text-neutral-600">
            {thread.length}/200
          </div>
          {/* for adding attachments in the future */}
          {/* <Paperclip className="w-[18px] h-[18px] mt-3" /> */}
        </div>
      </div>
      <Button
        disabled={thread.length === 0 || isPending}
        variant="outline"
        className="w-full mt-4"
        onClick={() => {
          startTransition(() => createThread(thread, create.id, pathname));
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
