import Image from "next/image";

import { Edit, Heart, Home, Search, User } from "lucide-react";
import Item from "@/components/thread";
import logo from "@/assets/threads.svg";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <main className="w-screen flex justify-center bg-black">
      <div className="w-full max-w-[500px] bg-black z-50 fixed bottom-0 flex items-center justify-around p-3 pb-4">
        <Home className="w-6 h-6" />
        <Search className="w-6 h-6 text-neutral-600" />
        <Edit className="w-6 h-6 text-neutral-600" />
        <Heart className="w-6 h-6 text-neutral-600" />
        <User className="w-6 h-6 text-neutral-600" />
      </div>
      <div className="min-h-screen text-base w-full max-w-[500px] bg-black relative pb-14">
        <div className="flex items-center justify-center w-full py-5">
          <div className="h-9 w-9 bg-cover">
            <Image
              src={logo}
              alt="Threads logo"
              className="min-h-full invert min-w-full object-cover"
            />
          </div>
        </div>
        <Item others={[]} />
        <Item others={["1", "2", "3"]} />
        <Item others={["1"]} />
        <div className="w-full py-4 flex justify-center">
          <Button variant="outline">Load More</Button>
        </div>
      </div>
    </main>
  );
}
