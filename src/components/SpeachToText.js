import React, { useState } from "react";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

 export default () => {
  const [chatbotOutput, setChatbotOutput] = useState([]);

  const intro = ["Hello, I am Summer", "Hi, I am a Summer", "Hello, My name is Summer"];
  const why = ["Because I am sad", "Because I need be alone", "Because, You did me sad"];
  const help = ["How may i assist you?","How can i help you?","What i can do for you?"];
  const greetings = ["i am good you little piece of love", "i am fine, what about you", "don't want to talk", "i am good"];

  let speech = new SpeechSynthesisUtterance();
  speech.lang = "en";
  speech.rate = 1.1;
  speech.pitch = 1.1;

  const showUserMsg = (userMsg) => {
    setChatbotOutput([...chatbotOutput, { message: userMsg, sender: "user" }]);
  };

  const showChatbotMsg = (chatbotMsg) => {
    setChatbotOutput([...chatbotOutput, { message: chatbotMsg, sender: "chatbot" }]);
  };

  const chatbotVoice = (message) => {
    speech.text = "i dont want to talk";
    if (message.includes("Who are you")) {
      let finalResult = intro[Math.floor(Math.random() * intro.length)];
      speech.text = finalResult;
    }
    if (message.includes("Why" || "Why did you say this" || "vay")) {
      let finalResult = why[Math.floor(Math.random() * why.length)];
      speech.text = finalResult;
    }
    if (message.includes("fine")) {
      let finalResult = help[Math.floor(Math.random() * help.length)];
      speech.text = finalResult;
    }
    if (message.includes("How are you" || "How are you doing today")) {
      let finalResult = greetings[Math.floor(Math.random() * greetings.length)];
      speech.text = finalResult;
    }
    window.speechSynthesis.speak(speech);
    showChatbotMsg(speech.text);
  };

  recognition.onresult = (e) => {
    let resultIndex = e.resultIndex;
    let transcript = e.results[resultIndex][0].transcript;
    showUserMsg(transcript);
    chatbotVoice(transcript);
  };

  recognition.onend = () => {
    mic.style.background = "#ff3b3b";
  };

  const handleClick = () => {
    mic.style.background = "#39c81f";
    recognition.start();
    console.log("Activated");
  };

  return (
    <div>
      <div className="chatarea-outer">
        {chatbotOutput.map((output, index) => (
          <div key={index} className={`chatarea-inner ${output.sender}`}>
            {output.message}
          </div>
        ))}
      </div>
      <button id="mic" onClick={handleClick}>
        Click to Speak
      </button>
    </div>
  );
};