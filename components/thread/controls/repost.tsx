"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MessageSquareDashed, Repeat2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function Repost() {
  const { toast } = useToast();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {" "}
        <Repeat2 className="w-5 h-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem
          // onClick={(e) => {
          //   e.preventDefault();
          //   e.stopPropagation();
          //   toast({
          //     title: "Reposted",
          //   });
          // }}
          disabled
        >
          {" "}
          <Repeat2 className="mr-2 h-4 w-4" />
          Repost
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          {" "}
          <MessageSquareDashed className="mr-2 h-4 w-4" />
          Quote
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
