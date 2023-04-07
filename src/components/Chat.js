import { useState } from "react";
import styles from "@/styles/Home.module.css";
import Writer from "./Writer";

export default () => {
    const [message, setMessage] = useState(null);
    const [file, setFile] = useState(null);

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
        <main className={styles.main}>
            <div className="chat-area">
                <div className="chat-body">
                    <div className="chat-answer">
                        <div className="gray-area">
                            denemeeeeee test lorem dolor setIndex
                        </div>
                    </div>
                    <div className="chat-result">
                        <div className="gray-area">
                            <Writer
                                text={message ?? "test denemeeeeee"}
                                color={"#fff"}
                            />
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
                    </div>
                </div>
            </div>
        </main>
    );
};
