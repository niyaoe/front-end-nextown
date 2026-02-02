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

  const [profilePhoto, setProfilePhoto] = useState(
  userData.userData.profilePhoto || profileImg
);


  console.log("userData from Profilepage :", userData);

  let Name = userData.userData.Name;

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
          Authorization: `Bearer ${userData._token}`,
          "Content-Type": "multipart/form-data",
        },
      },
    );

    console.log("profilePic ; ", profilePic.data.user.profilePhoto);
  };

  return (
    <div className="xp-wrapper">
      {/* ===== PROFILE HEADER ROW (INSTAGRAM STYLE) ===== */}
      <div className="container xp-profile-header d-flex align-items-center">
        {/* Profile Image */}
        <img src={profileImg} alt="Profile" className="xp-profile-photo" />

        {/* Name + Username */}
        <div className="ms-3">
          <h4 className="xp-name">{Name}</h4>
          <p className="xp-username">@{Name}</p>
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
