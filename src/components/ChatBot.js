import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const ChatContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 500px;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: #f0f0f0;
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 10px 15px;
  border-radius: 18px;
  margin-bottom: 10px;
  font-size: 16px;
  line-height: 1.4;
  ${props => props.sender === 'user' ? `
    background-color: #0084ff;
    color: white;
    align-self: flex-end;
    margin-left: auto;
  ` : `
    background-color: #e4e6eb;
    color: black;
    align-self: flex-start;
  `}
`;

const InputContainer = styled.form`
  display: flex;
  padding: 10px;
  background-color: white;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 20px;
  outline: none;
`;

const SendButton = styled.button`
  background-color: #0084ff;
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 20px;
  margin-left: 10px;
  cursor: pointer;
  &:hover {
    background-color: #0073e6;
  }
`;

export function ChatBot({ messages, onSendMessage }) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <ChatContainer>
      <MessagesContainer>
        {messages.map((message, index) => (
          <MessageBubble key={index} sender={message.sender}>
            {message.text}
          </MessageBubble>
        ))}
        <div ref={messagesEndRef} />
      </MessagesContainer>
      <InputContainer onSubmit={handleSubmit}>
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <SendButton type="submit">Send</SendButton>
      </InputContainer>
    </ChatContainer>
  );
}