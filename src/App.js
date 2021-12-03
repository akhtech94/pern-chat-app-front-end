import React, { useState, useRef } from 'react';
import { io } from 'socket.io-client';

import './App.css';

const socket = io("http://localhost:8000");

function App() {
  const [messageInput, setMessageInput] = useState("");
  const [messageList, setMessageList] = useState([]);
  const socketRef = useRef(socket);

    socketRef.current.on('connect', () => {
      console.log(socketRef.current.id);
    })
    socketRef.current.on('message', message => {
      console.log(messageList);
      setMessageList([...messageList, message]);
      console.log(messageList);
    })

  const handleSubmit = async event => {
    event.preventDefault();
    socketRef.current.emit('message', messageInput);
    setMessageList([...messageList, messageInput]);
    console.log(messageList);
    setMessageInput("");
  }

  const handleChange = event => {
    setMessageInput(event.target.value);
  }

  return (
    <div className="App">
      <div className="messages">
        {messageList.map((message, index) => <p key={index}>{message}</p>)}
      </div>
      <form onSubmit={handleSubmit}>
        <input id="MessageInput" type="text" value={messageInput} name="MessageInput" onChange={handleChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
