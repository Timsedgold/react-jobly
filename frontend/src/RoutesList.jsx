import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CompaniesList from "./CompaniesList";
import JobsList from "./JobsList";
import ProfileForm from "./ProfileForm";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Homepage from "./Homepage";

function RoutesList({ currentUser, login, register, updateProfile }) {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route
        path="/companies"
        element={currentUser ? <CompaniesList /> : <Navigate to="/login" />}
      />
      <Route
        path="/jobs"
        element={currentUser ? <JobsList /> : <Navigate to="/login" />}
      />
      <Route
        path="/profile"
        element={
          currentUser ? (
            <ProfileForm
              currentUser={currentUser}
              updateProfile={updateProfile}
            />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/login" element={<LoginForm login={login} />} />
      <Route path="/signup" element={<SignupForm register={register} />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default RoutesList;
