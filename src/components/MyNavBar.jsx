import React from "react";
import "./MyNavBar.css";
import {
  FaSearch,
  FaHome,
  FaUserFriends,
  FaBriefcase,
  FaCommentDots,
  FaBell,
  FaUserCircle,
  FaLinkedin,
  FaBuilding,
} from "react-icons/fa";

const MyNavBar = () => {
  return (
    <nav className="navbar border-0 mb-3">
      <div className="navbar__container border-bottom">
        <div className="navbar__left">
          <FaLinkedin className="navbar__linkedinIcon" />
          <div className="navbar__search">
            <FaSearch />
            <input type="text" placeholder="Cerca" />
          </div>
        </div>
        <div className="navbar__center">
          <div className="navbar__option">
            <FaHome className="navbar__icon" />
            <span>Home</span>
          </div>
          <div className="navbar__option">
            <FaUserFriends className="navbar__icon" />
            <span>Rete</span>
          </div>
          <div className="navbar__option">
            <FaBriefcase className="navbar__icon" />
            <span>Lavoro</span>
          </div>
          <div className="navbar__option">
            <FaCommentDots className="navbar__icon" />
            <span>Messaggistica</span>
          </div>
          <div className="navbar__option">
            <FaBell className="navbar__icon" />
            <span>Notifiche</span>
          </div>
          <div className="navbar__option">
            <FaUserCircle className="navbar__icon" />
            <span>Tu</span>
          </div>
          <div className="navbar__divider"></div>
        </div>
        <div className="navbar__right">
          <div className="navbar__optionText">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              data-supported-dps="24x24"
              fill="currentColor"
              class="mercado-match"
              width="24"
              height="24"
              focusable="false"
            >
              <path d="M3 3h4v4H3zm7 4h4V3h-4zm7-4v4h4V3zM3 14h4v-4H3zm7 0h4v-4h-4zm7 0h4v-4h-4zM3 21h4v-4H3zm7 0h4v-4h-4zm7 0h4v-4h-4z"></path>
            </svg>
            <span className="navbarSpan">
              Per le aziende{" "}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 6l4 4 4-4H4z" fill="currentColor" />
              </svg>
            </span>
          </div>
          <div className="navbar__optionText">
            <span className="text-decoration-underline text-warning-emphasis navbarSpan">Prova Premium</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MyNavBar;
