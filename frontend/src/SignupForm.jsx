import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupForm({ signup }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: ""
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await signup(formData);
      navigate("/");
    } catch (err) {
      console.error("Signup failed:", err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Username:</label>
      <input name="username" value={formData.username} onChange={handleChange} required />

      <label>Password:</label>
      <input name="password" type="password" value={formData.password} onChange={handleChange} required />

      <label>First Name:</label>
      <input name="firstName" value={formData.firstName} onChange={handleChange} required />

      <label>Last Name:</label>
      <input name="lastName" value={formData.lastName} onChange={handleChange} required />

      <label>Email:</label>
      <input name="email" type="email" value={formData.email} onChange={handleChange} required />

      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignupForm;
