import React from "react";
import Post from "./Post";

const POSTS = [
  {
    id: "123",
    username: "instagrammer1",
    userImg: "https://links.papareact.com/3ke",
    img: "https://links.papareact.com/3ke",
    caption: "PLEASE LIKE AND SUBSCRIBE!!",
  },
  {
    id: "123",
    username: "instagrammer1",
    userImg: "https://links.papareact.com/3ke",
    img: "https://links.papareact.com/3ke",
    caption: "PLEASE LIKE AND SUBSCRIBE!!",
  },
];

export default function Posts() {
  return (
    <div>
      {/* Post */}
      {POSTS.map((element: Posts) => (
        <Post
          key={element.id}
          id={element.id}
          username={element.username}
          userImg={element.userImg}
          img={element.img}
          caption={element.caption}
        />
      ))}
      <p></p>
    </div>
  );
}
