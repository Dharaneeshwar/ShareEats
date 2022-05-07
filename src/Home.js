import React, { useEffect } from "react";
import Base from "./Base";
import { Navigate } from "react-router-dom";
import { auth } from "./firebase-config";
import {signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default function Home(props) {
  const [nextRoute, setRoute] = React.useState("donors");
  const [redirect, setRedirect] = React.useState(false);
  useEffect(() => {

  }, []);

  const getNextMove = (data) => {
    console.log(data); 
    localStorage.setItem("uid",data.uid);
    localStorage.setItem('authObj', JSON.stringify(data));
    setRoute('donors');
    setRedirect(true);
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
      <h1 className="text-center" style={{marginTop:'275px'}}>Share Eats</h1>
      <p className="text-center litle-bigger mt-3">Keeping Food-redistribution at our core.</p>
      <button onClick={SignInWithFirebase} style={{marginTop:'100px'}} className="d-block btn btn-darkblue mx-auto pr-2"><i class="fab fa-google mx-1"></i> Sign in with Google</button>
      {redirect && <Navigate to={nextRoute} />}
    </div>
  );
}
