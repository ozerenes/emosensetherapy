import React, { useState } from "react";
import Avatar from "../components/Avatar"

export default ({ handleRegister }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      handleRegister(email, password);
    };
  
    return (
      <>
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="user-box">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="user-box">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="user-box">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <div className="info-box">
      <Avatar animation={"yoga"} width={350} height={350} />
      Hey person login and expole your self!
      <button className="button-outline">
          SING UP
      </button>
  </div>
  </>
    );
  };