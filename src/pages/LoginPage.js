import React, { useState } from "react";
import "../styles/LoginPage.css";
import logo from "../assets/liciaflix-10-18-2024.png";
import SignUpPage from "./SignUpPage";

function LoginPage() {
  const [signIn, setSignIn] = useState(false);

  return (
    <div className="loginScreen">
      <div className="loginScreen__background">
        <img className="loginScreen__logo" alt="Liciaflix logo" src={logo} />
        <button onClick={() => setSignIn(true)} className="loginScreen__button">
          Sign In
        </button>
        <div className="loginScreen__gradient"></div>
      </div>
      <div className="loginScreen__body">
        {/* if the user is signed in, show the sign up page */}
        {signIn ? (
          <SignUpPage />
        ) : (
          //if the user is not signed in, show the login page
          <>
            <h1>Unlimited films, TV shows and more.</h1>
            <h2>Watch anywhere. Cancel any time.</h2>
            <h3>
              This is not actually a streamer, just a project for Licia's
              portfolio ツ
            </h3>
            <div className="loginScreen__input">
              <form>
                <input type="email" placeholder="Email Address" />
                <button
                  onClick={() => setSignIn(true)}
                  className="loginScreen__getStarted"
                >
                  GET STARTED
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
