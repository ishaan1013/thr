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

export function Modal({
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
  return (
    <Dialog>
      <DialogTrigger>
        <MessageCircle className="w-5 h-5" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-3">Reply</DialogTitle>
        </DialogHeader>
        <Item data={data} comment />
        <Create />
      </DialogContent>
    </Dialog>
  );
}
