import Link from "next/link";
import {useEffect, useState} from "react";

export default () => {
    const [hamburger, setHamburger] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        setLoggedIn(localStorage.getItem("token") !== null);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/Login";
    }

    return (
        <nav className="header">
            <Link href="/" className="logo"></Link>
            <button
                className={"hamburger-menu"}
                onClick={() => setHamburger(!hamburger)}
            >
                {hamburger ? (
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
                            d="M6 18L18 6M6 6l12 12"
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
                            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                        />
                    </svg>
                )}
            </button>
            <div className={`home ${hamburger ? "active" : ""}`}>
                <Link href="/">Home</Link>
                <Link href="/ChatAi">Talk</Link>
                {loggedIn ? (
                    <a onClick={handleLogout}>Logout</a>
                ) : (
                    <Link href="/Login">Login</Link>
                )}
            </div>
        </nav>
    );
};
