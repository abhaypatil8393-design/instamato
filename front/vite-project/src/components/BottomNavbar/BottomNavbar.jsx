import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./BottomNavbar.css";

const BottomNavbar = () => {
  const location = useLocation();

  return (
    <nav className="bottom-navbar" aria-label="Bottom Navigation">
      <div className="nav-container">
        <Link
          to="/"
          className={`nav-item ${location.pathname === "/" ? "active" : ""}`}
          aria-label="Home Feed"
        >
          <svg
            className="nav-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span className="nav-label">Feed</span>
        </Link>

        <Link
          to="/create-food"
          className={`nav-item ${location.pathname === "/create-food" ? "active" : ""}`}
          aria-label="Upload Food Reel"
        >
          <div className="add-button-outer">
            <svg
              className="nav-icon add-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
          <span className="nav-label">Upload</span>
        </Link>

        <Link
          to="/user/login"
          className={`nav-item ${
            location.pathname.includes("/login") || location.pathname.includes("/register")
              ? "active"
              : ""
          }`}
          aria-label="User Account Portal"
        >
          <svg
            className="nav-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span className="nav-label">Account</span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNavbar;
