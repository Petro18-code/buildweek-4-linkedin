import React from 'react';
import './MyNavBar.css';
import { FaSearch, FaHome, FaUserFriends, FaBriefcase, FaCommentDots, FaBell, FaUserCircle, FaLinkedin, FaBuilding } from 'react-icons/fa';

const MyNavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__container">
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
            <FaBuilding className="navbar__icon" />
            <span>Per le aziende</span>
          </div>
          <div className="navbar__optionText">
            <span>Prova Premium</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MyNavBar;
