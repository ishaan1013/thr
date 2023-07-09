import Others from "./others";
import MoreMenu from "./moreMenu";
import Controls from "./controls";
import { Post, Prisma } from "@prisma/client";
import Image from "next/image";

export default function Item({
  data,
  comment = false,
}: {
  data: Prisma.PostGetPayload<{
    include: {
      author: true;
      children: true;
      parent: true;
      likes: true;
    };
  }>;
  comment?: boolean;
}) {
  const mainClass = comment
    ? "space-x-2 flex font-light"
    : "px-3 py-4 space-x-2 flex border-b font-light border-neutral-900";

  return (
    <div className={mainClass}>
      <div className="flex flex-col items-center justify-between">
        <div className="w-8 h-8 mt-1 rounded-full bg-neutral-600 overflow-hidden">
          <Image
            src={data.author.image}
            height={32}
            width={32}
            className=""
            alt={data.author.name + "'s profile image"}
          />
        </div>
        <div className="w-0.5 grow mt-2 rounded-full bg-neutral-700" />
        <Others others={data.children} />
      </div>
      <div className="w-full space-y-1">
        <div className="w-full flex items-center justify-between">
          <div className="font-semibold">{data.author.name}</div>
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
          {data.text}
        </div>

        {comment ? null : (
          <>
            <Controls />

            <div className="flex text-neutral-600 items-center space-x-2">
              {data.children.length > 0 ? (
                <div>
                  {data.children.length}{" "}
                  {data.children.length === 1 ? "reply" : "replies"}
                </div>
              ) : null}
              {data.children.length > 0 || data.likes.length > 0 ? (
                <div className="w-1 h-1 rounded-full bg-neutral-600" />
              ) : null}
              {data.likes.length > 0 ? (
                <div>
                  {data.likes.length}{" "}
                  {data.likes.length === 1 ? "like" : "likes"}
                </div>
              ) : null}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
