import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';

const apiUrl = 'https://env-2775219.user.cloudjkt01.com/api/tanya_tradisi_bali';
const typewriterSpeed = 20;

function App() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [context, setContext] = useState('');
  const [isContextProvided, setIsContextProvided] = useState(false);
  const [isWaitingForQuestion, setIsWaitingForQuestion] = useState(false);

  const chatContainerRef = useRef(null);

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      if (!isContextProvided) {
        // If context is not provided, treat input as context
        const userMessage = { text: inputMessage, type: 'user', name: 'User' };
        setContext(inputMessage);
        setIsContextProvided(true);

        setInputMessage('');
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        // Ask for a question right away
        const botMessage = { text: 'Masukkan pertanyaan', type: 'bot', name: 'Tradisi Bali Bot' };
        setIsWaitingForQuestion(true);
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } else if (isWaitingForQuestion) {
        // Bot is waiting for a question
        const userMessage = { text: inputMessage, type: 'user', name: 'User' };
        setInputMessage('');
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        const response = await axios.post(apiUrl, { context, question: inputMessage });
        const responseData = response.data;

        const botMessage = { text: `Jawaban: ${responseData.data.bert_answer}`, type: 'bot', name: 'Tradisi Bali Bot' };

        // Reset context and question flags
        setIsContextProvided(false);
        setIsWaitingForQuestion(false);

        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } else {
        // If context is provided, treat input as a question
        const userMessage = { text: inputMessage, type: 'user', name: 'User' };
        setInputMessage('');
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        // Ask for a context
        const botMessage = { text: 'Masukkan konteks', type: 'bot', name: 'Tradisi Bali Bot' };
        setIsContextProvided(true);
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="App">
      <div className="center-container">
        <h1>QA Tradisi Bali</h1>
        <div className="chat-container" ref={chatContainerRef}>
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.type}`}>
                <div className={`profile-icon ${msg.type}-icon`}>{msg.type === 'user' ? '👤' : '🤖'}</div>
                <div className={`message-content ${msg.type}`}>
                  <div className={`name name-${msg.type}`}>{msg.name}</div>
                  {msg.type === 'bot' && <TypewriterEffect text={msg.text} />}
                  {msg.type === 'user' && msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder={isContextProvided ? 'Type your question...' : 'Type the context...'}
              value={inputMessage}
              onChange={handleInputChange}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const TypewriterEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    if (text) {
      let index = 0;

      const intervalId = setInterval(() => {
        setDisplayText((prevText) => prevText + text[index]);
        index++;

        if (index === text.length) {
          clearInterval(intervalId);
          setDisplayText(text);
        }
      }, typewriterSpeed);

      return () => clearInterval(intervalId);
    }
  }, [text]);

  return <>{displayText}</>;
};

export default App;