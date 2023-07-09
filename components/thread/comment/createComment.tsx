"use client";

import { Paperclip } from "lucide-react";
import { Button } from "../../ui/button";
import { useState } from "react";

export function Create() {
  const [comment, setComment] = useState("");

  return (
    <div>
      <div className="space-x-2 flex font-light">
        <div className="flex flex-col items-center justify-start">
          <div className="w-8 h-8 rounded-full bg-lime-700"></div>
          <div className="w-0.5 grow mt-2 rounded-full bg-neutral-700" />
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
            placeholder="Reply to ___..."
          />
          <div className="mt-1 text-end font-semibold font-medium text-xs text-neutral-600">
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
      >
        Post
      </Button>
      {/* <div className="flex justify"></div> */}
    </div>
  );
}
