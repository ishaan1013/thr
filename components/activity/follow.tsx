import { Button } from "../ui/button";

export function Follow() {
  return (
    <div className="pl-3 pt-4 flex font-light">
      <div className="w-8 h-8 rounded-full bg-orange-700 mt-1 mr-2"></div>
      <div className="grow flex items-center justify-between pb-4 pr-3 border-b border-neutral-900">
        <div>
          <div className="font-semibold">
            username{" "}
            <span className="text-neutral-600 pl-1 font-medium">{23}m</span>
          </div>
          <div className="text-neutral-600 -mt-1 font-medium">Followed you</div>
        </div>
        <Button variant="outline" size="sm">
          Follow
        </Button>
      </div>
    </div>
  );
}
