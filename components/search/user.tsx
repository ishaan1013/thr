import { Button } from "../ui/button";

export function User() {
  return (
    <div className="pl-3 pt-4 flex font-light">
      <div className="w-8 h-8 rounded-full bg-orange-700 mt-1 mr-2"></div>
      <div className="grow flex items-start justify-between pb-4 pr-3 border-b border-neutral-900">
        <div>
          <div className="font-semibold">username</div>
          <div className="text-neutral-600 -mt-1 font-medium">name</div>
          <div className="mt-2 text-sm">45.8K Followers</div>
        </div>
        <Button variant="outline" size="sm">
          Follow
        </Button>
      </div>
    </div>
  );
}
