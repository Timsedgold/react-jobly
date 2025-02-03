import React, { useState } from "react";
import JoblyApi from "./api";

function ProfileForm({ currentUser, updateProfile }) {
  const [formData, setFormData] = useState({
    username: currentUser.username,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await updateProfile(formData); // Call update function from App.js
      setSuccess(true);
    } catch (err) {
      setError(err.message);
      setSuccess(false);
    }
  }

  return (
    <div>
      <h2>Edit Profile</h2>
      {success && (
        <p style={{ color: "green" }}>Profile updated successfully!</p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default ProfileForm;
