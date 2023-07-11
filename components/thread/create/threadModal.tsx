"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { Create } from ".";
import { useState } from "react";

export function Modal({
  create,
}: {
  create: {
    id: string;
    name: string;
    image: string;
  };
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Edit className={`w-[22px] h-[22px] text-neutral-600`} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-3">New Thread</DialogTitle>
        </DialogHeader>
        <Create create={create} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
