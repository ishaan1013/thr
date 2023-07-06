import {
  Heart,
  MessageCircle,
  MoreHorizontal,
  Repeat2,
  Send,
} from "lucide-react";
import Others from "./others";
import MoreMenu from "./moreMenu";

export default function Item() {
  return (
    <div className="px-3 py-4 space-x-2 flex border-b font-light border-neutral-800">
      <div className="flex flex-col items-center justify-between">
        <div className="w-8 h-8 rounded-full bg-orange-700"></div>
        <div className="w-0.5 grow my-2 rounded-full bg-neutral-700" />
        <Others others={["1", "2", "3"]} />
      </div>
      <div className="w-full space-y-1">
        <div className="w-full flex items-center justify-between">
          <div className="font-semibold">User Author</div>
          <div className="flex items-center space-x-2">
            <div className="text-neutral-600">23m</div>
            <MoreMenu />
          </div>
        </div>

        <div className="text-base/relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
          ipsam incidunt necessitatibus at. Deserunt tempora totam quaerat
          perferendis ut optio blanditiis eligendi quos ipsam voluptatum
          reiciendis corporis, officiis modi non?
        </div>

        <div className="flex items-center space-x-3.5 py-2">
          <Heart className="w-5 h-5" />
          <MessageCircle className="w-5 h-5" />
          <Repeat2 className="w-5 h-5" />
          <Send className="w-5 h-5" />
        </div>

        <div className="flex text-neutral-600 items-center space-x-2">
          <div>20 replies</div>
          <div className="w-1 h-1 rounded-full bg-neutral-600" />
          <div>47 likes</div>
        </div>
      </div>
    </div>
  );
}
