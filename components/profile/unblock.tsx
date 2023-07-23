"use client";

import { useTransition, useState } from "react";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { unblockUser } from "@/lib/actions";
import { Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";

export default function UnblockButton({
  id,
  blockedId,
  name,
}: {
  id: string;
  blockedId: string;
  name: string;
}) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const pathname = usePathname();

  return (
    <Button
      variant="outline"
      size="sm"
      className="w-full text-neutral-500"
      onClick={(e) => {
        e.preventDefault();
        startTransition(() => {
          unblockUser(id, blockedId, pathname);
        });
        toast({
          title: name + " is unblocked",
        });
      }}
      disabled={isPending}
    >
      Unblock
    </Button>
  );
}
