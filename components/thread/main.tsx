import Image from "next/image";

import MoreMenu from "./moreMenu";
import Controls from "./controls";
import { Post, Prisma } from "@prisma/client";
import { timeSince } from "@/lib/utils";
import Timestamp from "./timestamp";
import NameLink from "./nameLink";

// import relativeTime from "dayjs/plugin/relativeTime";
// import dayjs from "dayjs";
// import updateLocale from "dayjs/plugin/updateLocale";

export default function MainItem({
  data,
  comment = false,
  posts,
}: {
  data: Prisma.PostGetPayload<{
    include: {
      author: true;
      children: {
        include: {
          author: true;
          children: true;
          parent: true;
          likes: true;
        };
      };
      parent: true;
      likes: true;
    };
  }>;
  comment?: boolean;
  posts?: Prisma.PostGetPayload<{
    include: {
      author: true;
      children: true;
      parent: true;
      likes: true;
    };
  }>[];
}) {
  // dayjs.extend(relativeTime);
  // const ago = dayjs(data.createdAt).fromNow();

  // dayjs.extend(updateLocale);

  // dayjs.updateLocale("en", {
  //   relativeTime: {
  //     future: "in %s",
  //     past: "%s",
  //     s: "now",
  //     m: "1m",
  //     mm: "%dm",
  //     h: "1h",
  //     hh: "%dh",
  //     d: "1d",
  //     dd: "%dd",
  //     M: "1m",
  //     MM: "%dm",
  //     y: "1y",
  //     yy: "%dy",
  //   },
  // });

  return (
    <div className="px-3 py-4 space-y-3 flex flex-col border-b font-light border-neutral-900">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-neutral-600 overflow-hidden">
            <Image
              src={data.author.image}
              height={32}
              width={32}
              className=""
              alt={data.author.name + "'s profile image"}
            />
          </div>
          <NameLink username={data.author.username} name={data.author.name} />
        </div>
        <div className="flex items-center space-x-2">
          {/* <Timestamp time={data.createdAt} /> */}
          <MoreMenu
            name={data.author.name}
            id={data.id}
            author={data.author.id}
          />
        </div>
      </div>
      <div className="w-full">
        <div className="text-base/relaxed text-left mb-1">{data.text}</div>
        <Controls numPosts={posts ? posts.length : -1} data={data} />
        <div className="flex text-neutral-600 items-center space-x-2">
          {data.children.length > 0 ? (
            <div>
              {data.children.length}{" "}
              {data.children.length === 1 ? "reply" : "replies"}
            </div>
          ) : null}
          {data.children.length > 0 && data.likes.length > 0 ? (
            <div className="w-1 h-1 rounded-full bg-neutral-600" />
          ) : null}
          {data.likes.length > 0 ? (
            <div>
              {data.likes.length} {data.likes.length === 1 ? "like" : "likes"}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
