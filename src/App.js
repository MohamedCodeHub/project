import React, { useState, useRef } from "react";
import "./App.css";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const chatBodyRef = useRef();

  const handleInputChange = (event) => setInputValue(event.target.value);

  const handleSendClick = () => {
    if (inputValue.trim() !== "") {
      const userMessage = { text: inputValue, type: "user" };
      const chatbotMessage = { text: getChatbotResponse(inputValue), type: "chatbot" };
      setMessages([...messages, userMessage, chatbotMessage]);
      setInputValue("");
      setScrollPosition();
    }
  };

  const handleKeyPress = (event) => event.key === "Enter" && handleSendClick();

  const renderMessages = () => messages.map((message, index) => (
    <div key={index} className={message.type === "user" ? "user-message" : "chatbot-message"}>
      {message.text}
    </div>
  ));

  const setScrollPosition = () => {
    if (chatBodyRef.current) chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
  };

  const getChatbotResponse = (userInput) => {
    const userInputLowerCase = userInput.toLowerCase();
    const responseObj = {
      hello: "Hey! How are you doing?",
      hey: "Hey! What's up?",
      bye: "Great! If you need anything, just ping me.",
      date: new Date().toDateString(),
      time: new Date().toLocaleTimeString(),
    };
    return responseObj[userInputLowerCase] || "I'm sorry, I didn't understand that.";
  };

  return (
    <div className="App">
      <div className="container">
        <div className="chat-header">
          <div className="logo">
            <img src="images/cwt.jpg" alt="cwt" />
          </div>
          <div className="title">Let's Chat</div>
        </div>
        <div className="chat-body" ref={chatBodyRef}>
          {renderMessages()}
        </div>
        <div className="chat-input">
          <div className="input-sec">
            <input
              type="text"
              id="txtInput"
              placeholder="type here"
              autoFocus
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
          </div>
          <div className="send" onClick={handleSendClick}>
            <img src="./images/send1.jpg" alt="send" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
