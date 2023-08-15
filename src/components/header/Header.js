import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

export default function Header() {
    return (
      <div className="header">
        <img className="logo" src="./Images/logo.svg" alt="logo" />
        <nav>
          <Link className="menu_schedule" to="/">
            <img className="scheduleImg" src="./Images/schedule.png" alt="schedule"/>Schedule</Link>
          <Link className="menu_leaderboard" to="/leaderboard">
            <img className="scheduleImg" src="./Images/leaderboard.png" alt="leaderboard"/>Leaderboard</Link>
        </nav>
      </div>
    );
}