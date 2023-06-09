import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li className="sign-in" key="sign-in">
      <Link to="/user-sessions/new">Sign In</Link>
    </li>,
    <li className="sign-up" key="sign-up">
      <Link to="/users/new">
        Sign Up
      </Link>
    </li>,
  ];

  const authenticatedListItems = [
    <li className="sign-in" key="sign-out">
      <SignOutButton />
    </li>,
  ];

  const selectPlaylist = (
  <li className="playlist-selection-link">
    <Link to="/playlistSelection">{user ? `Select a Playlist` : ``}</Link>
  </li>
  )

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          {user ? selectPlaylist : <li></li>}
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
      </div>
    </div>
  );
};

export default TopBar;
