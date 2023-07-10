"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { onboardData } from "@/lib/actions";
import { useState, useTransition } from "react";
import { useToast } from "../ui/use-toast";
import { AlertCircle } from "lucide-react";

import Filter from "bad-words";
import { validateUsername } from "@/lib/utils";

export function OnboardingProfileCard({
  userData,
  next,
  allUsernames,
}: {
  userData: {
    id: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  next: () => void;
  allUsernames: string[];
}) {
  const [isPending, startTransition] = useTransition();

  const filter = new Filter();

  const [username, setUsername] = useState(userData.username);
  const [name, setName] = useState(userData.name);
  const [bio, setBio] = useState(userData.bio);

  const { toast } = useToast();

  return (
    <>
      <Card className="w-full pt-6">
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  id="username"
                  placeholder="Your unique username"
                />
                {allUsernames.includes(username) ? (
                  <div className="text-red-500 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" /> Username is taken.
                  </div>
                ) : null}
                {filter.isProfane(username) ? (
                  <div className="text-red-500 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" /> Choose an
                    appropriate username.
                  </div>
                ) : null}
                {!validateUsername(username) ? (
                  <div className="text-red-500 text-sm flex items-center leading-snug">
                    <AlertCircle className="min-w-[16px] min-h-[16px] mr-1" />{" "}
                    Only use lowercase letters, numbers, underscores, & dots
                    (cannot start/end with last 2).
                  </div>
                ) : null}
                {username.length === 0 ? (
                  <div className="text-red-500 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" /> Username cannot be
                    empty.
                  </div>
                ) : username.length > 16 ? (
                  <div className="text-red-500 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" /> Username is too
                    long.
                  </div>
                ) : null}
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
        </CardContent>
      </Card>
      <Button
        onClick={() => {
          startTransition(() =>
            onboardData(username, name, bio, userData.image, userData.id)
          );
          toast({
            title: "Updated user data",
          });
          next();
        }}
        variant="secondary"
        className="w-full mt-6"
        disabled={
          name.length === 0 ||
          name.length > 16 ||
          username.length === 0 ||
          username.length > 16 ||
          bio.length > 100 ||
          allUsernames.includes(username) ||
          !validateUsername(username) ||
          filter.isProfane(username)
        }
      >
        Continue
      </Button>
    </>
  );
}
