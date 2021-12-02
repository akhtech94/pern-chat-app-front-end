import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

import './App.css';

function App() {
  const [message, setMessage] = useState("");
  let socket;

  useEffect(() => {
    socket = io("http://localhost:8000");
  },[])

  const handleSubmit = event => {
    event.preventDefault();
    console.log(message);
    axios.post('http://localhost:8000', message);
  }

  const handleChange = event => {
    setMessage(event.target.value);
  }

  return (
    <div className="App">
      <div id="messages"></div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={message} onChange={handleChange}/>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
