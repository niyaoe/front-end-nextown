import React, { useContext, useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import profileImg from "../assets/dp.png";
import "../styles/ProfilePageXP.css"; // XP THEME CSS
import axios from "axios";

import { newContext } from "../UseContext";

const ProfilePage = () => {
  const userData = useContext(newContext);
  const navigate = useNavigate();

  const [Dp, setDp] = useState(profileImg);
  const [User, setUser] = useState(null);

  let token = localStorage.getItem("token");

  console.log(token);

  //api section single user =======

  useEffect(() => {
    profileFunction();
  }, []);

  const profileFunction = async () => {
    const userDetails = await axios.get("http://localhost:5005/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = userDetails.data.user;
    setUser(user);

    if (user.profilePhoto) {
      setDp(`http://localhost:5005${user.profilePhoto}`);
    }
  };

  //profile pic update =====

  const handleProfileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePhoto", file);

    const profilePic = await axios.post(
      "http://localhost:5005/auth/uploadprofilephoto",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      },
    );
    setDp(`http://localhost:5005${profilePic.data.user.profilePhoto}`);
  };

  return (
    <div className="xp-wrapper">
      {/* ===== PROFILE HEADER ROW (INSTAGRAM STYLE) ===== */}
      <div className="container xp-profile-header d-flex align-items-center">
        {/* Profile Image */}
        <img src={Dp} alt="Profile" className="xp-profile-photo" />

        {/* Name + Username */}
        <div className="ms-3">
          <h4 className="xp-name">{User?.Name}</h4>
          <p className="xp-username">@{User?.Name}</p>
          <input
            type="file"
            id="avatarUpload"
            accept="image/*"
            hidden
            onChange={handleProfileChange}
          />

          <label
            htmlFor="avatarUpload"
            style={{
              cursor: "pointer",
              color: "#2563eb",
              fontWeight: "600",
            }}
          >
            Edit avatar
          </label>
        </div>
      </div>

      {/* ===== XP TABS ===== */}
      <ul className="nav nav-tabs justify-content-center xp-tabs">
        <li className="nav-item">
          <NavLink className="nav-link xp-tab-link" to="/profile" end>
            Posts
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link xp-tab-link" to="/profile/likedpost">
            Likes
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link xp-tab-link" to="/profile/comments">
            Comments
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link xp-tab-link" to="/profile/shares">
            Shares
          </NavLink>
        </li>
      </ul>

      {/* ===== PAGE BODY ===== */}
      <div className="mt-4 container">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfilePage;
