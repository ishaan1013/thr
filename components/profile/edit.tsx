"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useEffect, useState, useTransition } from "react";
import { Prisma } from "@prisma/client";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { AlertCircle, Loader2 } from "lucide-react";
import { editProfile } from "@/lib/actions";
import { usePathname } from "next/navigation";
import { useToast } from "../ui/use-toast";

export function EditModal({
  data,
}: {
  data: Prisma.UserGetPayload<{
    include: {
      followedBy: true;
    };
  }>;
}) {
  const [open, setOpen] = useState(false);

  const [username, setUsername] = useState(data.username);
  const [name, setName] = useState(data.name);
  const [bio, setBio] = useState(data.bio);

  const [clicked, setClicked] = useState(false);

  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const pathname = usePathname();

  useEffect(() => {
    if (clicked && !isPending) {
      setOpen(false);
      setClicked(false);
      toast({
        title: "Updated user data",
      });
    }
  }, [isPending]);

  return (
    <>
      <Button
        onClick={() => setOpen((prev) => !prev)}
        variant="outline"
        className="w-full"
      >
        Edit Profile
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>

          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  value={username}
                  disabled
                  id="username"
                  placeholder="Your unique username"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  placeholder="Name displayed on your profile"
                />
                {name.length === 0 ? (
                  <div className="text-red-500 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" /> Your name cannot be
                    empty.
                  </div>
                ) : name.length > 16 ? (
                  <div className="text-red-500 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" /> Your name is too
                    long.
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="bio">Bio</Label>
                <Input
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  id="bio"
                  placeholder="+ Write bio"
                />
                {name.length > 100 ? (
                  <div className="text-red-500 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" /> Your bio is too
                    long.
                  </div>
                ) : null}
              </div>
            </div>
          </form>
          <Button
            onClick={() => {
              startTransition(() => editProfile(name, bio, data.id, pathname));
              setClicked(true);
            }}
            variant="secondary"
            className="w-full mt-6"
            disabled={name.length === 0 || name.length > 16 || bio.length > 100}
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin text-neutral-600" />
            ) : (
              "Update"
            )}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
