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
import Comment from "./createComment";

export default function CommentModal() {
  return (
    <Dialog>
      <DialogTrigger>
        <MessageCircle className="w-5 h-5" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-3">Reply</DialogTitle>
          <Item comment others={[]} />
          <Comment />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
