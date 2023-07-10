"use client";

import { useEffect, useState } from "react";
import { Prisma } from "@prisma/client";

import Item from ".";
import { Button } from "../ui/button";
import { useInView } from "react-intersection-observer";
import { Loader2 } from "lucide-react";

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
  const [noMore, setNoMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !noMore) {
      setLoading(true);
      loadMore();
      console.log("LOADING MORE");
    }
  }, [inView, noMore]);

  useEffect(() => {
    setItems(posts);
  }, [posts]);

  const loadMore = async () => {
    const morePosts = await fetch(
      `/api/loadMore?cursor=${items[items.length - 1].id}`,
      {
        method: "GET",
      }
    ).then((res) => res.json());

    if (morePosts.data.length === 0) {
      setNoMore(true);
    }

    setItems([...items, ...morePosts.data]);
    setLoading(false);
  };

  return (
    <>
      {items.map((item, i) => {
        if (i === items.length - 1)
          return (
            <div key={item.id} ref={ref}>
              <Item posts={items} data={item} />
            </div>
          );
        return <Item key={item.id} posts={items} data={item} />;
      })}
      <div className="w-full py-4 flex justify-center">
        {items.length === 0 ? (
          <div className="text-neutral-600 mt-4 text-center leading-loose">
            There are no threads... <br />
            Try making one!
          </div>
        ) : null}

        {/* {noMore ? null : (
          <Button
            variant="outline"
            onClick={() => {
              loadMore();
            }}
          >
            Load More
          </Button>
        )} */}
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin text-neutral-600" />
        ) : null}
      </div>
    </>
  );
}
