import React, { useEffect, useState } from "react";
import Post from "./Post";
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { db } from "../firebase";

// const POSTS = [
//   {
//     id: "123",
//     username: "instagrammer1",
//     userImg:
//       "https://ondairos.github.io/portfolio/assets/IconPhotoPX-ad022387.jpg",
//     img: "https://ondairos.github.io/portfolio/assets/IconPhotoPX-ad022387.jpg",
//     caption: "PLEASE LIKE AND SUBSCRIBE!!",
//   },
//   {
//     id: "124",
//     username: "korok1d2",
//     userImg:
//       "https://ondairos.github.io/portfolio/assets/IconPhotoPX-ad022387.jpg",
//     img: "https://ondairos.github.io/portfolio/assets/IconPhotoPX-ad022387.jpg",
//     caption: "PLEASE LIKE AND SUBSCRIBE!!",
//   },
// ];

export default function Posts() {
  // state for posts
  const [posts, setPosts] = useState([]);

  useEffect(
    () =>
      // snapshot listener from firebase v9
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  );

  return (
    <div>
      {/* Post */}
      {posts.map((element: Posts) => (
        <Post
          key={element.id}
          id={element.id}
          username={element.data().username}
          userImg={element.data().profileImg}
          img={element.data().image}
          caption={element.data().caption}
        />
      ))}
    </div>
  );
}
