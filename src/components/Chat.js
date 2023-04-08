import { useState } from "react";
import styles from '@/styles/Home.module.css'
import Writer from "./Writer";

export default () => {
    const [message, setMessage] = useState(null);
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const handleSubmit = async () => {
        // register
        // const registerResult = await fetch('/api/user/register', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         name: 'test',
        //         email: 'test@mail.com',
        //         password: 'test'
        //     }),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // });

        // login
        const loginResult = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({
                email: 'test@mail.com',
                password: 'test'
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const loginData = await loginResult.json();

        const formData = new FormData();
        formData.append('file', file);
        formData.append("prompt", 'I am very sad'); // USER PROMPT'U

        const response = await fetch('/api/process', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${loginData.accessToken}`
            }
        });
        const data = await response.json();

        if (response.status === 200) {
            setMessage(data.gpt.response);
        } else {
            alert(data.message);
        }
    };

    return (
        <main className={styles.main}>
            <div className="chat-area">
                <div className="chat-body">
                    <div className="chat-answer">
                        <div className="gray-area">denemeeeeee test lorem dolor setIndex</div>
                    </div>
                    <div className="chat-result">
                        <div className="gray-area">
                            <Writer text={message ?? 'test denemeeeeee'} color={"#fff"} />
                        </div>
                    </div>
                </div>
                <div className="chat-footer">
                    <input className="custom-input" type="text"/>
                    <div>
                        <input type="file" onChange={handleFileChange} />
                        <button onClick={handleSubmit}>Gönder</button>
                    </div>
                </div>
            </div>

                
                
            </main>
    )
}