/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";

import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import { db } from "../firebase";

type Props = {
  id: string;
  username: string;
  userImg: string;
  img: string;
  caption: string;
};

export default function Post({ id, username, userImg, img, caption }: Props) {
  const { data: session } = useSession();
  // comments state
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState<string>("");

  const commentSetFunc = (event: React.ChangeEvent<HTMLInputElement>) =>
    setComment(event.target.value);

  // comment send to FIREBASE
  const sendComment = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session?.user?.username,
      userImage: session?.user?.image,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="bg-white my-7 border rounded-sm">
      {/* header */}
      <div className="flex items-center p-5">
        <img
          src={userImg}
          className="rounded-full h-12 w-12 object-contain border p-1 mr-3"
          alt=""
        />
        <p className="flex-1 font-bold">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>

      {/* img */}
      <img src={img} className="object-cover w-full" alt="" />

      {/* buttons */}
      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4 ">
            <HeartIcon className="button" />
            <ChatIcon className="button" />
            <PaperAirplaneIcon className="button" />
          </div>
          <BookmarkIcon className="button" />
        </div>
      )}

      {/* caption */}
      <p className="p-5 truncate">
        <span className="font-bold mr-1">{username} </span>
        {caption}
      </p>

      {/* comments */}

      {/* input box */}
      {session && (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="button" />
          <input
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={commentSetFunc}
            className="border-none flex-1 focus:ring-0 outline-none"
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            onClick={sendComment}
            className="font-semibold text-blue-400"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}
