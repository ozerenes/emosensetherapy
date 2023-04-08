import Link from "next/link";
import React, { useState } from "react";

export default ({ handleLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(email, password);
    };

    return (
        <form className="login-box" onSubmit={handleSubmit}>
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
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div className="gap-center">
                <button type="submit">Login</button>
                <Link href={"/register"}>Create an account</Link>
            </div>

            <div className="line mt-3 mb-3"></div>
            <div className="gap-center">
                <button>G+</button>
                <button>f</button>
                <button>in</button>
            </div>
        </form>
    );
};
