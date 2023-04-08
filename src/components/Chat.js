import { useState } from "react";
import Writer from "./Writer";
import Speacher from "./Speacher";

export default () => {
    const [message, setMessage] = useState(null);
    const [file, setFile] = useState(null);
    const [avatarStatus, setAvatarStatus] = useState(false);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("file", file);

        // USER PROMPT'U
        formData.append("prompt", "I am very sad");

        const response = await fetch("/api/process", {
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        setMessage(data.gpt.response);
    };

    return (
        <>
            <div className="chat-area">
                <div className="chat-body">
                    <div className="chat-answer gap-align">
                        <div className="icon-s">
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
                                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                        </div>
                        <div className="gray-area">
                            denemeeeeee test lorem dolor setIndex
                        </div>
                    </div>
                    <div className="chat-result">
                        <div className="gray-area gap-align">
                            <Writer
                                text={message ?? "test denemeeeeee"}
                                color={"#fff"}
                            />
                            <div className="icon-xs">
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
                                        d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="chat-footer">
                    <div className="input-container">
                        <input type="file" onChange={handleFileChange} />
                        <input
                            className="custom-input"
                            type="text"
                            placeholder="Text here"
                        />

                        <button onClick={handleSubmit}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-2 h-2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                                />
                            </svg>
                        </button>
                        <Speacher />
                        <button
                            className={`${avatarStatus ? "animation" : ""}`}
                            onClick={() => setAvatarStatus(!avatarStatus)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6"
                            >
                                <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
                                <path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
