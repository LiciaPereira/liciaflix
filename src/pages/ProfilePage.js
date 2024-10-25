import React from "react";
import avatar from "../assets/profile-avatar.jpg";
import "../styles/ProfileScreen.css";
import NavBar from "../components/NavBar";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { auth } from "../firebase";
import PlansPage from "./PlansPage";

function ProfilePage() {
  const user = useSelector(selectUser);
  return (
    <div className="profilePage">
      <NavBar />
      <div className="profilePage__body">
        <h1>Edit Profile</h1>

        <div className="profilePage__info">
          <img src={avatar} alt="profile avatar"></img>
          <div className="profilePage__details">
            <h2>{user.email}</h2>
            <div className="profilePage__plans">
              <h3>Plans (Current Plan: Premium)</h3>
              <PlansPage />
              <button
                onClick={() => {
                  auth.signOut();
                }}
                className="profilePage__signOut"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
