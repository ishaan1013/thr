"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function OnboardingProfileCard({
  userId,
  next,
}: {
  userId: string;
  next: () => void;
}) {
  const [username, setUsername] = useState(userId.slice(5));
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

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
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  placeholder="Name displayed on your profile"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="bio">Bio</Label>
                <Input
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  id="bio"
                  placeholder="+ Write bio"
                />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <Button onClick={next} variant="secondary" className="w-full mt-6">
        Continue
      </Button>
    </>
  );
}
