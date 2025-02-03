import React from "react";
import { NavLink } from "react-router-dom";


function Navigation({ currentUser, logout }) {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      {currentUser ? (
        <>
          <NavLink to="/companies">Companies</NavLink>
          <NavLink to="/jobs">Jobs</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
        </>
      )}
    </nav>
  );
}

export default Navigation;
