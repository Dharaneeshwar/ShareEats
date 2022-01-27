import React, { useEffect, useState } from "react";
import Base from "../Base";
import "./Donor.css";
import "../common/Post";
import Post from "../common/Post";
import SubmitForm from "./SubmitForm";
import { getPosts } from "../helper/postHelper";

export default function Donor() {
    
  const [posts,setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      let allposts = await getPosts();
      setPosts(allposts);
    })();
  }, []);

  return (
    <Base activeNav="donor">
      <div className="container">
        <div className="row gx-5">
          <div className="col-md-8">
            <h2>My posts</h2>
            {posts.map((item, index) => {
              return <Post page="donor" index={index} item={item}></Post>;
            })}
          </div>
          <div className="col-md-4 form-box">
            <SubmitForm/>
          </div>
        </div>
      </div>
    </Base>
  );
}
