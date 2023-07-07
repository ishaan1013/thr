import Others from "./others";
import MoreMenu from "./moreMenu";
import Controls from "./controls";

export default function Item({
  comment = false,
  others,
}: {
  comment?: boolean;
  others: string[];
}) {
  const mainClass = comment
    ? "space-x-2 flex font-light"
    : "px-3 py-4 space-x-2 flex border-b font-light border-neutral-900";

  return (
    <div className={mainClass}>
      <div className="flex flex-col items-center justify-between">
        <div className="w-8 h-8 mt-1 rounded-full bg-orange-700"></div>
        <div className="w-0.5 grow mt-2 rounded-full bg-neutral-700" />
        <Others others={others} />
      </div>
      <div className="w-full space-y-1">
        <div className="w-full flex items-center justify-between">
          <div className="font-semibold">User Author</div>
          {comment ? null : (
            <div className="flex items-center space-x-2">
              <div className="text-neutral-600">23m</div>
              <MoreMenu />
            </div>
          )}
        </div>

        <div
          className={
            comment
              ? "text-base/relaxed pb-3 text-left"
              : "text-base/relaxed text-left"
          }
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
          ipsam incidunt necessitatibus at. Deserunt tempora totam quaerat
          perferendis ut optio blanditiis eligendi quos ipsam voluptatum
          reiciendis corporis, officiis modi non?
        </div>

        {comment ? null : (
          <>
            <Controls />

            <div className="flex text-neutral-600 items-center space-x-2">
              <div>20 replies</div>
              <div className="w-1 h-1 rounded-full bg-neutral-600" />
              <div>47 likes</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
