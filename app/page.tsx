import Image from "next/image";
import Link from "next/link";

import Item from "@/components/thread";
import logo from "@/assets/threads.svg";
import { Button } from "@/components/ui/button";

import { auth } from "@clerk/nextjs";

export default function Page() {
  const { userId } = auth();

  if (!userId)
    return (
      <>
        <div className="h-16 w-16 bg-cover">
          <Image
            src={logo}
            alt="Threads logo"
            className="min-h-full invert min-w-full object-cover"
          />
        </div>
        <div className="gradient mt-4 mb-12 text-4xl font-bold">Threads</div>

        <Link href="/sign-up" className="w-full px-6">
          <Button className="w-full" variant="outline">
            Create Your Account
          </Button>
        </Link>
        <Link href="/sign-in" className="w-full px-6 mt-2">
          <Button className="w-full" variant="ghost">
            Sign In
          </Button>
        </Link>
      </>
    );

  return (
    <>
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
      <Item others={[]} />
      <Item others={["1", "2"]} />
      <Item others={["1"]} />
      <Item others={["1", "2"]} />
      <div className="w-full py-4 flex justify-center">
        <Button variant="outline">Load More</Button>
      </div>
    </>
    // </div>
    // </main>
  );
}
