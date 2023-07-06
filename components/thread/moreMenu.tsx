import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export default function MoreMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {" "}
        <MoreHorizontal className="w-5 h-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Block</DropdownMenuItem>
        <DropdownMenuItem className="!text-red-500">Report</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
