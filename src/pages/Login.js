import Link from "next/link";
import React, { useState } from "react";
import Avatar from "../components/Avatar";
import axios from "axios";
import yoga from "../assets/yoga";

export default () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [active, setActive] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordType, setPasswordType] = useState("password");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!active) handleLogin(email, password);
        else handleRegister(email, password, confirmPassword);
    };

    const handleLogin = async (email, password) => {
        const response = await axios.post("/api/user/login", {
            email: email,
            password: password,
        });
        localStorage.setItem("token", response.data.accessToken);
        window.location.href = "/ChatAi";
    };

    const handleRegister = async (email, password, confirmPassword) => {
        if (password !== confirmPassword)
            return alert("Passwords do not match");

        const response = await axios.post("/api/user/register", {
            name: email,
            email: email,
            password: password,
        });
        localStorage.setItem("token", response.data.accessToken);
        window.location.href = "/ChatAi";
    };

    return (
        <div className={`flex-row ${active ? "reverse" : ""}`}>
            {!active ? (
                <form
                    className={`login-box ${active ? "active" : ""}`}
                    onSubmit={handleSubmit}
                >
                    <h2>Login</h2>
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
                            type={passwordType}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div
                            className="show-password"
                            onClick={() =>
                                setPasswordType(
                                    passwordType === "password"
                                        ? "text"
                                        : "password"
                                )
                            }
                        >
                            {passwordType === "password" ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                    />
                                </svg>
                            )}
                        </div>
                    </div>
                    <div className="gap-center">
                        <Link className="custom-link" href={"/forgot"}>
                            Forgot your password?
                        </Link>

                        <button className="custom-button" type="submit">
                            Login
                        </button>
                    </div>

                    <div className="line mt-3 mb-3"></div>
                    <div className="gap-center">
                        <button className="custom-button">G+</button>
                        <button className="custom-button">f</button>
                        <button className="custom-button">in</button>
                    </div>
                </form>
            ) : (
                <form
                    className={`login-box ${active ? "active" : ""}`}
                    onSubmit={handleSubmit}
                >
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
                        <label htmlFor="confirmPassword">
                            Confirm Password:
                        </label>
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
            )}
            <div className={`info-box ${active ? "active" : ""}`}>
                <Avatar animation={yoga} width={350} height={350} />
                <button
                    onClick={() => setActive(!active)}
                    className="button-outline"
                >
                    {active ? "SING IN" : "SIGN UP"}
                </button>
            </div>
        </div>
    );
};
