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
import { Edit } from "lucide-react";
import { Create } from ".";

export function Modal() {
  return (
    <Dialog>
      <DialogTrigger>
        <Edit className={`w-[22px] h-[22px] text-neutral-600`} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-3">New Thread</DialogTitle>
        </DialogHeader>
        <Create />
      </DialogContent>
    </Dialog>
  );
}
