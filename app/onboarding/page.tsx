import { Screens } from "@/components/onboarding";
import { auth } from "@clerk/nextjs";

export default function OnboardingLayout() {
  const { userId } = auth();

  return (
    <div className="px-3 pt-8">
      {userId ? <Screens userId={userId} /> : null}
    </div>
  );
}
