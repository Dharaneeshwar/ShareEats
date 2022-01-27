import React, { useEffect } from "react";
import Base from "./Base";
import { Navigate } from "react-router-dom";
import { auth } from "./firebase-config";
import {signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default function Home(props) {
  const [nextRoute, setRoute] = React.useState("donors");

  useEffect(() => {

  }, []);

  const getNextMove = (data) => {
    console.log(data);
  } 

  const SignInWithFirebase = () => {
    var google_provider = new GoogleAuthProvider();
    signInWithPopup(auth, google_provider).then((result) => {
      getNextMove(result.user);
    }).catch((err) => {
      console.log(err);
    });
  }

  return (
    <div>
      <button onClick={SignInWithFirebase} className="d-block btn btn-darkblue mx-auto mt-5 pr-2"><i class="fab fa-google mx-1"></i> Sign in with Google</button>
      {/* <Navigate to={nextRoute} /> */}
    </div>
  );
}
