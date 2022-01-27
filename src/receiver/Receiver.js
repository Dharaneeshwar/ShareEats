import React, { useEffect, useState } from "react";
import Base from "../Base";
import Post from "../common/Post";
import { getPosts } from "../helper/postHelper";
import "./Receiver.css";

export default function Receiver() { 

  const [posts,setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      let allposts = await getPosts();
    setPosts(allposts);
    })();
  }, []);

  // let items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];
  return (
    <Base activeNav="receiver">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h2 className="text-center">Food Available</h2>
            {posts.map((item, index) => {
              return <Post page="receive" index={index} item={item}></Post>;
            })}
          </div>
        </div>
      </div>
    </Base>
  );
}
