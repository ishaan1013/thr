import { Button } from "../ui/button";

export function Categories() {
  return (
    <div className="mini-horizontal-scroll flex pb-1.5 space-x-2 w-full max-w-full overflow-x-auto">
      <Button className="min-w-[96px]" size="sm">
        All
      </Button>
      <div className="cursor-not-allowed">
        <Button disabled className="min-w-[96px]" size="sm" variant="outline">
          Replies
        </Button>
      </div>
      <div className="cursor-not-allowed">
        <Button disabled className="min-w-[96px]" size="sm" variant="outline">
          Mentions
        </Button>
      </div>
      <div className="cursor-not-allowed">
        <Button disabled className="min-w-[96px]" size="sm" variant="outline">
          Verified
        </Button>
      </div>
    </div>
  );
}
