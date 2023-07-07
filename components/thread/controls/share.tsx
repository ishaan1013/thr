import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, Send, Share } from "lucide-react";

export default function ShareButton() {
  const shareData = {
    title: "Threads",
    text: "Threads Clone Link",
    url: "http://localhost:3000/",
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {" "}
        <Send className="w-[18px] h-[18px]" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem>
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
