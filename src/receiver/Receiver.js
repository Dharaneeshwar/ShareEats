import React, { useEffect, useState } from "react";
import Base from "../Base";
import Post from "../common/Post";
import { getPosts, getExtendedPosts } from "../helper/postHelper";
import "./Receiver.css";

export default function Receiver() { 

  const [posts,setPosts] = useState([]);
  const [extendedPosts,setExtendedPosts] = useState([]);

  useEffect(() => {
    (async () => {
      let allposts = await getPosts("receive");
      console.log("hey before",allposts);
      // let morePosts = await getExtendedPosts();
      setPosts(allposts.reverse());
      // setExtendedPosts(morePosts);
      console.log("hey",allposts);
    })();
  }, []);

  return (
    <Base activeNav="receiver">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h2 className="text-center">Food Available</h2>
            {posts.map((item, index) => {
              return <Post page="receive" key={index} item={item}></Post>;
            })}
            <h3 className="mt-5 text-center">More Food</h3>
            {posts.map((item, index) => {
              return <Post page="receive" key={index} item={item}></Post>;
            })}
          </div>
        </div>
      </div>
    </Base>
  );
}
