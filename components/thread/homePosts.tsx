"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { Prisma } from "@prisma/client";

import Item from ".";
import { Button } from "../ui/button";

export default function HomePosts({
  posts,
}: {
  posts: Prisma.PostGetPayload<{
    include: {
      author: true;
      children: {
        include: {
          author: true;
        };
      };
      parent: true;
      likes: true;
    };
  }>[];
}) {
  const [items, setItems] = useState(posts);
  const [hideButton, setHideButton] = useState(false);

  const loadMore = async () => {
    const morePosts = await fetch(
      `/api/loadMore?cursor=${items[items.length - 1].id}`,
      {
        method: "GET",
      }
    ).then((res) => res.json());

    if (morePosts.data.length === 0) {
      setHideButton(true);
    }

    setItems([...items, ...morePosts.data]);
  };

  return (
    <>
      {items.map((item) => {
        return <Item key={item.id} posts={items} data={item} />;
      })}
      <div className="w-full py-4 flex justify-center">
        {items.length === 0 ? (
          <div className="text-neutral-600 mt-4 text-center leading-loose">
            There are no threads... <br />
            Try making one!
          </div>
        ) : null}

        {hideButton ? null : (
          <Button
            variant="outline"
            onClick={() => {
              loadMore();
            }}
          >
            Load More
          </Button>
        )}
      </div>
    </>
  );
}
