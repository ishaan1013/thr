import { Bar, User } from "@/components/search";
import { Button } from "@/components/ui/button";

export default function SearchPage() {
  return (
    <>
      <div className="px-3 mb-1">
        <div className="text-2xl font-semibold pt-8 pb-5">Search</div>
        <Bar />
      </div>
      <User />
      <User />
      <User />
      <User />
      <User />
    </>
  );
}
