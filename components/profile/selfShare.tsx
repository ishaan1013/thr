"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Link, Share } from "lucide-react";
import { useToast } from "../ui/use-toast";

export default function SelfShare({
  name,
  username,
}: {
  name: string;
  username: string;
}) {
  const { toast } = useToast();

  const shareData = {
    title: "Threads",
    text: "Link to " + name + "'s post on Threads",
    url: "http://localhost:3000/" + username,
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full">
        <Button variant="outline" className="w-full">
          Share Profile
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(shareData.url);
            toast({
              title: "Copied to clipboard",
            });
          }}
        >
          {" "}
          <Link className="mr-2 h-4 w-4" />
          Copy Link
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            navigator.share(shareData);
          }}
        >
          {" "}
          <Share className="mr-2 h-4 w-4" />
          Share Via...
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
