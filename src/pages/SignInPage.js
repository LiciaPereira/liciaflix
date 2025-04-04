import React, { useRef, useState } from "react";
import "../styles/SignInPage.css";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

function SignInPage({ email }) {
  const [newUser, setNewUser] = useState(false);
  const [email2, setEmail2] = useState(email || "");
  const passwordRef = useRef(null);
  const password2Ref = useRef(null);

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

    if (passwordRef.current.value !== password2Ref.current.value) {
      showErrorAlert("Passwords don't match.");
    } else {
      createUserWithEmailAndPassword(auth, email2, passwordRef.current.value)
        .then((userCredential) => {})
        .catch((error) => {
          if (error.code === "auth/invalid-email") {
            showErrorAlert("Invalid email.");
          } else if (error.code === "auth/weak-password") {
            showErrorAlert(
              //format error message
              error.message
                .replace("Firebase: ", "")
                .replace(/\(auth.*\)\.?/, "")
            );
          } else {
            showErrorAlert("Something went wrong.");
            console.log(error);
          }
        });
    }
  };

  const signIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email2, passwordRef.current.value)
      .then((userCredential) => {
        console.log(
          //hehe
          "Oh, you're checking the console, huh? You're logged in! ツ"
        );
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          showErrorAlert("Invalid email.");
        } else {
          showErrorAlert("Invalid email or password.");
        }
      });
  };

  return (
    <>
      {newUser ? ( //toggle between sign up and sign up form
        <div className="credentials">
          <form>
            <h1>Sign Up</h1>
            <input
              type="email"
              placeholder="Email Address"
              value={email2}
              onChange={(e) => setEmail2(e.target.value)}
            />
            <input ref={passwordRef} type="password" placeholder="Password" />
            <input
              ref={password2Ref}
              type="password"
              placeholder="Confirm Password"
            />
            <button type="submit" onClick={register}>
              Sign Up
            </button>
          </form>
          <h4>
            <span className="credentials__gray">Already have an account? </span>
            <span
              className="credentials__link"
              onClick={(e) => setNewUser(!newUser)}
            >
              Sign in now.
            </span>
          </h4>
        </div>
      ) : (
        <div className="credentials">
          <form>
            <h1>Sign In</h1>
            <input
              type="email"
              placeholder="Email Address"
              value={email2}
              onChange={(e) => setEmail2(e.target.value)}
            />
            <input ref={passwordRef} type="password" placeholder="Password" />
            <button type="submit" onClick={signIn}>
              Sign In
            </button>
          </form>
          <h4>
            <span className="credentials__gray">Don't have an account? </span>
            <span
              className="credentials__link"
              onClick={(e) => setNewUser(!newUser)}
            >
              Sign up now.
            </span>
          </h4>
        </div>
      )}
    </>
  );
}

export default SignInPage;
