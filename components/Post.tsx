/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
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
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  setDoc,
  serverTimestamp,
  query,
  doc,
  QueryDocumentSnapshot,
  DocumentData,
  deleteDoc,
} from "@firebase/firestore";
import { db } from "../firebase";
import Moment from "react-moment";

type Props = {
  id: string;
  username: string;
  userImg: string;
  img: string;
  caption: string;
};

export default function Post({ id, username, userImg, img, caption }: Props) {
  const { data: session } = useSession<boolean>();
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState<boolean>(false);

  // comments state
  const [comments, setComments] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([]);
  const [comment, setComment] = useState<string>("");

  // useffect for comment display
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db]
  );

  // listen to likes
  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );

  // useEffect for has liked-depended on likes array
  useEffect(() => {
    setHasLiked(
      likes.findIndex((element) => element.id === session?.user?.uid) !== -1
    );
  }, [likes]);

  // like post function
  const likePost = async () => {
    if (hasLiked) {
      // delete the like
      await deleteDoc(doc(db, "posts", id, "likes", session?.user?.uid));
    } else {
      // like post
      await setDoc(doc(db, "posts", id, "likes", session?.user?.uid), {
        username: session?.user?.username,
      });
    }
  };

  const commentSetFunc = (event: React.ChangeEvent<HTMLInputElement>) =>
    setComment(event.target.value);

  // comment send to FIREBASE
  const sendComment = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      // @ts-ignore
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
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="button text-red-600"
              />
            ) : (
              <HeartIcon onClick={likePost} className="button" />
            )}
            <ChatIcon className="button" />
            <PaperAirplaneIcon className="button" />
          </div>
          <BookmarkIcon className="button" />
        </div>
      )}

      {/* caption */}
      <p className="p-5 truncate">
        {likes.length > 0 && (
          <p className="font-bold mb-1">{likes.length} likes</p>
        )}
        <span className="font-bold mr-1">{username} </span>
        {caption}
      </p>

      {/* comments */}
      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((element) => (
            <div key={element.id} className="flex items-center space-x-2 mb-3">
              <img
                className="h-7 rounded-full"
                src={element.data().userImage}
                alt="comment_image"
              />
              <p className="text-sm flex-1">
                <span className="font-bold mr-1">
                  {element.data().username}
                </span>
                {element.data().comment}
              </p>
              {/* 3 hours ago,15 minutes ago etc... */}
              <Moment className="pr-5 text-xs" fromNow>
                {element.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

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
