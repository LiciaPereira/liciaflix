import React, { useRef } from "react";
import "../styles/SignUpPage.css";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

function SignUpPage() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  //display error alert overlay
  const showErrorAlert = (message) => {
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");

    const alertBox = document.createElement("div");
    alertBox.classList.add("overlay-alert");
    alertBox.innerHTML = message;

    const okButton = document.createElement("button");
    okButton.innerHTML = "OK";
    okButton.addEventListener("click", () => overlay.remove());

    alertBox.appendChild(okButton);
    overlay.appendChild(alertBox);
    document.body.appendChild(overlay);
  };

  const register = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((userCredential) => {})
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          showErrorAlert("Invalid email.");
        } else if (error.code === "auth/invalid-password") {
          showErrorAlert("Invalid password.");
        } else {
          showErrorAlert("Something went wrong.");
        }
      });
  };

  const signIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((userCredential) => {
        console.log(
          //hehe
          "Oh, you're checking the console, huh? You're logged in! ツ"
        );
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          showErrorAlert("Invalid email.");
        } else if (error.code === "auth/invalid-password") {
          showErrorAlert("Invalid password.");
        } else {
          showErrorAlert("Check your credentials.");
        }
      });
  };

  return (
    <div className="signUpPage">
      <form>
        <h1>Sign In</h1>
        <input ref={emailRef} type="email" placeholder="Email" />
        <input ref={passwordRef} type="password" placeholder="Password" />
        <button type="submit" onClick={signIn}>
          Sign In
        </button>
      </form>
      <h4>
        <span className="signUpPage__gray">Don't have an account? </span>
        <span className="signUpPage__link" onClick={register}>
          Sign up now.
        </span>
      </h4>
    </div>
  );
}

export default SignUpPage;
