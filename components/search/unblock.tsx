"use client";

import { useTransition, useState } from "react";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { unblockUser } from "@/lib/actions";
import { Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function UnblockButton({
  id,
  blockedId,
  name,
}: {
  id: string;
  blockedId: string;
  name: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const pathname = usePathname();

  return (
    <AlertDialog onOpenChange={setIsOpen} open={isOpen}>
      <AlertDialogTrigger>
        <Button
          variant="outline"
          size="sm"
          className="w-24 text-neutral-500"
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}
          disabled={isPending}
        >
          Unblock
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>Unblock {name}?</AlertDialogTitle>
          <AlertDialogDescription>
            {name} and other accounts they may have or create will now be able
            to see your posts, follow and message you on Instagram. They won&apos;t
            be notofied that you unblocked them.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              startTransition(() => {
                unblockUser(id, blockedId, pathname);
              });
              toast({
                title: name + " is unblocked",
              });
              setIsOpen(false);
            }}
            disabled={isPending}
          >
            {isPending && <Loader2 className="animate-spin w-4 h-4 mr-2" />}
            Unblock
          </AlertDialogAction>
          <AlertDialogCancel
            onClick={() => {
              setIsOpen(false);
            }}
            disabled={isPending}
          >
            Cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
