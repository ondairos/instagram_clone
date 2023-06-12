/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";

import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";

type Props = {
  id: string;
  username: string;
  userImg: string;
  img: string;
  caption: string;
};

export default function Post({ id, username, userImg, img, caption }: Props) {
  return (
    <div>
      <div>
        <img src="" alt="" />
        <p>{username}</p>
      </div>

      {/* header */}

      {/* img */}

      {/* buttons */}

      {/* caption */}

      {/* comments */}

      {/* input box */}
    </div>
  );
}
