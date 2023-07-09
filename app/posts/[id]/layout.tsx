import { Button } from "@/components/ui/button";
import Nav from "@/components/ui/nav";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function ThreadPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <div className="px-3 relative mt-8 mb-6">
        <Link href="/">
          <Button className="pl-2.5" variant="ghost">
            <ChevronLeft className="w-4 h-4 mr-1" /> Back
          </Button>
        </Link>
        <div className="text-2xl font-semibold absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
          Thread
        </div>
      </div>

      {children}
    </>
  );
}
