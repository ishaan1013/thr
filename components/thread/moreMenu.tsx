import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Flag, MoreHorizontal, UserX2 } from "lucide-react";

export default function MoreMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {" "}
        <MoreHorizontal className="w-5 h-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <UserX2 className="w-4 h-4 mr-2" />
          Block
        </DropdownMenuItem>
        <DropdownMenuItem className="!text-red-500">
          {" "}
          <Flag className="w-4 h-4 mr-2" />
          Report
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
