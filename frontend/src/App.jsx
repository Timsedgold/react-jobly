import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import JoblyApi from "./api";
import Navigation from "./Navigation";
import RoutesList from "./RoutesList";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [token, setToken] = useLocalStorage("jobly-token", null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      if (token) {
        try {
          JoblyApi.token = token;
          const username = localStorage.getItem("jobly-username");
          if (username) {
            const user = await JoblyApi.getCurrentUser(username);
            setCurrentUser(user);
          }
        } catch (err) {
          console.error("Failed to fetch user", err);
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
    }
    fetchUser();
  }, [token]);

  async function login(username, password) {
    const newToken = await JoblyApi.login(username, password);
    setToken(newToken);
    localStorage.setItem("jobly-username", username);
  }

  async function register(data) {
    const newToken = await JoblyApi.register(data);
    setToken(newToken);
    localStorage.setItem("jobly-username", data.username);
  }

  async function updateProfile(userData) {
    try {
      const updatedUser = await JoblyApi.updateProfile(
        currentUser.username,
        userData
      );
      setCurrentUser(updatedUser);
    } catch (err) {
      throw new Error("Could not update profile");
    }
  }

  async function applyToJob(jobId) {
    try {
      if (currentUser) {
        await JoblyApi.applyToJob(currentUser.username, jobId);
        setCurrentUser((prevUser) => ({
          ...prevUser,
          applications: [...prevUser.applications, jobId],
        }));
      }
    } catch (err) {
      console.error("Error applying for job", err);
    }
  }

  function logout() {
    JoblyApi.logout();
    setToken(null);
    localStorage.removeItem("jobly-username");
    setCurrentUser(null);
  }

  return (
    <BrowserRouter>
      <Navigation currentUser={currentUser} logout={logout} />
      <RoutesList
        currentUser={currentUser}
        login={login}
        register={register}
        updateProfile={updateProfile}
        applyToJob={applyToJob}
      />
    </BrowserRouter>
  );
}

export default App;
