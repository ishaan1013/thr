"use client";

import { ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { OnboardingProfileCard } from ".";
import { PrivacySelectCards } from "./privacy";
import { Button } from "../ui/button";

export function Screens({
  userData,
  allUsernames,
}: {
  userData: {
    id: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  allUsernames: {
    username: string;
  }[];
}) {
  const [screen, setScreen] = useState(0);

  const nextScreen = () => setScreen((prev) => prev + 1);

  if (screen === 0) {
    return (
      <>
        <div className="w-full flex h-10 items-center justify-end mb-16">
          {/* Skip <ChevronRight className="w-4 h-4 ml-2" /> */}
        </div>

        <div className="mb-12 space-y-1">
          <div className="text-2xl font-semibold text-center">Profile</div>
          <div className="text-neutral-600 text-center">
            Customize your Threads profile.
          </div>
        </div>

        <OnboardingProfileCard
          allUsernames={allUsernames.map((user) => user.username)}
          userData={userData}
          next={nextScreen}
        />
      </>
    );
  }
  return (
    <>
      <Button
        onClick={() => setScreen(0)}
        className="pl-2.5 mb-16"
        variant="ghost"
      >
        <ChevronLeft className="w-4 h-4 mr-1" /> Back
      </Button>

      <div className="mb-12 space-y-1">
        <div className="text-2xl font-semibold text-center">Privacy</div>
        <div className="text-neutral-600 text-center">
          Your privacy on Threads and Instagram can be different.
        </div>
      </div>

      <PrivacySelectCards />
    </>
  );
}
