import React, { useState, useRef } from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import { Switch } from 'react-router-dom';

import "./App.css";

const App = () => {
  // State for registration form
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // State for chatbot
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const chatBodyRef = useRef();

  // Handle form submission for registration
  const handleFormSubmit = (event) => {
    event.preventDefault();
    setSuccessMessage(`Hello, ${name}. You have registered successfully.`);
    // Clear input fields
    setName("");
    setPassword("");
  };

  // Handle input change for registration form
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "name") setName(value);
    if (name === "password") setPassword(value);
  };

  // Handle form submission for chatbot
  const handleSendClick = () => {
    if (inputValue.trim() !== "") {
      const userMessage = { text: inputValue, type: "user" };
      const chatbotMessage = { text: getChatbotResponse(inputValue), type: "chatbot" };
      setMessages([...messages, userMessage, chatbotMessage]);
      setInputValue("");
      setScrollPosition();
    }
  };

  // Handle key press for chatbot
  const handleKeyPress = (event) => event.key === "Enter" && handleSendClick();

  // Render chat messages
  const renderMessages = () =>
    messages.map((message, index) => (
      <div key={index} className={message.type === "user" ? "user-message" : "chatbot-message"}>
        {message.text}
      </div>
    ));

  // Scroll to bottom of chat
  const setScrollPosition = () => {
    if (chatBodyRef.current) chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
  };

  // Get chatbot response
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
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/">
            {successMessage === "" ? (
              <div className="registration-container">
                <h1>Registration Form</h1>
                <form onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <button type="submit">Login</button>
                </form>
              </div>
            ) : (
              <div className="success-message">
                <p>{successMessage}</p>
              </div>
            )}
          </Route>
          <Route path="/about">
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
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                </div>
                <div className="send" onClick={handleSendClick}>
                  <img src="images/send1.jpg" alt="send" />
                </div>
              </div>
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
