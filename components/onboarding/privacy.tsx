"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function PrivacySelectCards() {
  return (
    <>
      <Card className="w-full !border-white border-2 cursor-pointer">
        <CardHeader>
          <CardTitle className="text-lg">Public profile</CardTitle>
          <CardDescription>
            Anyone on or off Threads can see, share and interact with your
            content.
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="opacity-50 cursor-not-allowed">
        <Card className="w-full mt-4">
          <CardHeader>
            <CardTitle className="text-lg">Private profile</CardTitle>
            <CardDescription>
              Only your approved followers can see and interact with your
              content. (coming soon)
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
      <Link href="/">
        <Button variant="secondary" className="w-full mt-6">
          Done
        </Button>
      </Link>
    </>
  );
}
