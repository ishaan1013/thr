import { Categories, Follow } from "@/components/activity";
import { Button } from "@/components/ui/button";

export default function ActivityPage() {
  return (
    <>
      <div className="px-3 mb-1">
        <div className="text-2xl font-semibold pt-8 pb-5">Activity</div>
        <Categories />
      </div>
      <Follow />
      <Follow />
    </>
  );
}
