"use client";

import { timeSince } from "@/lib/utils";

export default function Timestamp({ time }: { time: Date }) {
  return <div className="text-neutral-600">{timeSince(time)}</div>;
}
