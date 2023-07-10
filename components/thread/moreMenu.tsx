"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@clerk/nextjs";
import { Flag, Loader2, MoreHorizontal, Trash, UserX2 } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { deleteThread } from "@/lib/actions";

export default function MoreMenu({
  author,
  name,
  mainPage = false,
  id,
}: {
  author: string;
  name: string;
  mainPage?: boolean;
  id: string;
}) {
  const { user } = useUser();
  const { toast } = useToast();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [deleted, setDeleted] = useState(false);
  const [open, setOpen] = useState(false);

  const self = user?.id === author;

  useEffect(() => {
    if (deleted && !isPending) {
      toast({
        title: "Thread deleted",
      });
      setOpen(false);
      if (pathname.startsWith("/t")) {
        router.push("/");
      }
    }
  }, [deleted, isPending]);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setOpen((prev) => !prev);
        }}
      >
        {" "}
        <MoreHorizontal className="w-5 h-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {self ? (
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              startTransition(() => deleteThread(id, pathname));
              setDeleted(true);
            }}
            disabled={deleted}
            className="!text-red-500"
          >
            {" "}
            {deleted ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Trash className="w-4 h-4 mr-2" />
            )}
            Delete
          </DropdownMenuItem>
        ) : (
          <>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                toast({
                  title: name + " has been blocked",
                });
                setOpen(false);
              }}
            >
              <UserX2 className="w-4 h-4 mr-2" />
              Block
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                toast({
                  title: name + " has been reported",
                });
                setOpen(false);
              }}
              className="!text-red-500"
            >
              {" "}
              <Flag className="w-4 h-4 mr-2" />
              Report
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
