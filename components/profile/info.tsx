"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Github, HelpCircle } from "lucide-react";
import { Button } from "../ui/button";

export function InfoModal() {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <HelpCircle className="w-5 h-5" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>About This Project</DialogTitle>
          </DialogHeader>

          <div className="text-neutral-600 leading-relaxed">
            A threads clone made by{" "}
            <a
              href="https://twitter.com/ishaandey_"
              target="_blank"
              rel="noreferrer"
            >
              <Button
                variant="link"
                className="px-[3px] text-base w-auto py-0 h-auto"
              >
                Ishaan
              </Button>
            </a>{" "}
            with Next.js server components, Vercel Postgres, shadcn UI, Clerk,
            and Prisma.
          </div>
          <div className="text-neutral-600 leading-relaxed">
            It&apos;s mostly complete & working, with a few small bugs/missing
            features (see GitHub issues for details).
          </div>
          <DialogFooter>
            <a
              href="https://www.github.com/ishaan1013/threads"
              target="_blank"
              rel="noreferrer"
              className="w-full mt-2"
            >
              <Button className="w-full" variant="outline">
                <Github className="w-5 h-5 mr-2" /> GitHub
              </Button>
            </a>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
