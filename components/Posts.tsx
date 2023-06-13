import React from "react";
import Post from "./Post";

const POSTS = [
  {
    id: "123",
    username: "instagrammer1",
    userImg:
      "https://ondairos.github.io/portfolio/assets/IconPhotoPX-ad022387.jpg",
    img: "https://ondairos.github.io/portfolio/assets/IconPhotoPX-ad022387.jpg",
    caption: "PLEASE LIKE AND SUBSCRIBE!!",
  },
  {
    id: "124",
    username: "korok1d2",
    userImg:
      "https://ondairos.github.io/portfolio/assets/IconPhotoPX-ad022387.jpg",
    img: "https://ondairos.github.io/portfolio/assets/IconPhotoPX-ad022387.jpg",
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
    </div>
  );
}
