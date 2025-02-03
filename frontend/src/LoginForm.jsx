import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm({ login }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await login(formData.username, formData.password);
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Username:</label>
      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
        required
      />

      <label>Password:</label>
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
