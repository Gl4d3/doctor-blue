import React, { useState } from 'react';
import './App.css';
import { ChatBot } from './components/ChatBot';
import { NearbyFacilities } from './components/NearbyFacilities';
import { getFirstAidInfo } from './utils/openai';

function App() {
  const [messages, setMessages] = useState([]);
  const [showNearbyFacilities, setShowNearbyFacilities] = useState(false);

  const handleSendMessage = async (message) => {
    setMessages([...messages, { text: message, sender: 'user' }]);
    
    const response = await getFirstAidInfo(message);
    setMessages((prevMessages) => [...prevMessages, { text: response, sender: 'bot' }]);

    if (response.toLowerCase().includes('seek medical attention') || response.toLowerCase().includes('call emergency services')) {
      setShowNearbyFacilities(true);
    }
  };

  return (
    <div className="App">
      <h1>Blue - First Aid Chatbot</h1>
      <ChatBot messages={messages} onSendMessage={handleSendMessage} />
      {showNearbyFacilities && <NearbyFacilities />}
    </div>
  );
}

export default App;