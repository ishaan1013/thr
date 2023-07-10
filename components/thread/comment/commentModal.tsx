"use client";

import Item from "@/components/thread";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MessageCircle } from "lucide-react";
import { Create } from ".";
import { Prisma } from "@prisma/client";
import { useState } from "react";

export function Modal({
  data,
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
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
      >
        <MessageCircle className="w-5 h-5" />
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-3">Reply</DialogTitle>
          </DialogHeader>
          <Item data={data} noLink comment />
          <Create setOpen={setOpen} itemData={data} />
        </DialogContent>
      </Dialog>
    </>
  );
}
