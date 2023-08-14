import React from "react";
import "./Header.css";


export default function Header() {
    return (
      <div className="header">
        <img className="logo" src="./Images/logo.svg" alt="logo" />
        <nav className="hnav">
          <a className="menu_schedule" href="http://localhost:3000/schedule">
            <img className="scheduleImg" src="./Images/schedule.png" alt="schedule"/>Schedule</a>
          <a className="menu_leaderboard" href="http://localhost:3000/leaderboard">
            <img className="scheduleImg" src="./Images/leaderboard.png" alt="leaderboard"/>Leaderboard</a>
        </nav>
      </div>
    );
}