import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, Send, Share } from "lucide-react";

export default function ShareButton({
  post,
  name,
}: {
  post: string;
  name: string;
}) {
  const shareData = {
    title: "Threads",
    text: "Link to " + name + "'s post on Threads",
    url: "http://localhost:3000/t/" + post,
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {" "}
        <Send className="w-[18px] h-[18px]" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          {" "}
          <Link className="mr-2 h-4 w-4" />
          Copy Link
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
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
