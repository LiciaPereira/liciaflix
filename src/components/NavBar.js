import React, { useEffect, useState } from "react";
import "../styles/Nav.css";
import logo from "../assets/liciaflix-10-18-2024.png";
import avatar from "../assets/profile-avatar.jpg";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  //transition the navbar when scrolling
  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  //add scrolling listener to the window to transition the navbar
  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);

  return (
    //if the navbar is shown, add the black class
    <div className={`nav ${show && "nav__black"}`}>
      <div className="nav__contents">
        <img
          className="nav__logo"
          src={logo}
          alt="Liciaflix logo"
          onClick={() => navigate("/")}
        />

        <img
          className="nav__avatar"
          src={avatar}
          alt="avatar img"
          onClick={() => navigate("/profile")}
        />
      </div>
    </div>
  );
}

export default NavBar;
