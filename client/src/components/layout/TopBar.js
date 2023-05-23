import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <div className="top-bar center-parent center-child">
        <ul className="menu">
          <li>
            <h1>TuneTangle</h1>
          </li>
        </ul>
    </div>
  ];

  const authenticatedListItems = [
    <li key="sign-out">
      <SignOutButton />
    </li>,
  ];

  if (user) {
    return (
      <div className="top-bar">
        <div className="top-bar-left">
          <ul className="menu">
            <li className="menu-text">App</li>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </div>
        <div className="top-bar-right">
          <ul className="menu">{authenticatedListItems}</ul>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        {unauthenticatedListItems}
      </div>
    )
  }
};

export default TopBar;
