import { Bot } from 'lucide-react';
import React, { useState } from 'react';

const ChatIcon = ({ onClick }) => (
  <button onClick={onClick} className="text-white p-4 bg-gradient-to-r from-blue-500 to-brand rounded-full shadow-lg hover:text-white hover:from-blue-700 hover:to-dark_brand transition">
    <Bot className='text-3xl'/>
  </button>
);

const ChatWindow = ({ onClose }) => {
  const [messages, setMessages] = useState([{ from: 'bot', text: 'Hi! How can I help you today?' }]);
  const [input, setInput] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { from: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const response = await fetch('http://localhost:8000/api/bot/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      });
      const data = await response.json();
      const botMessage = { from: 'bot', text: data.res };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorMessage = { from: 'bot', text: 'Sorry, I am having trouble connecting.' };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  return (
    <div className="w-96 h-[30rem] bg-white rounded-lg shadow-xl flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-brand text-white p-3 rounded-t-lg flex justify-between items-center">
        <h3 className="font-bold">SeePal's AI assistant</h3>
        <button onClick={onClose} className="text-xl">&times;</button>
      </div>
      
      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div className='flex flex-row items-center'>
          <div key={index} className={`my-2 p-2 rounded-lg max-w-xs ${msg.from === 'bot' ? 'bg-gray-200 self-start' : 'bg-blue-500 text-white self-end ml-auto'}`}>
            {msg.text}
          </div>
          </div>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="p-3 border-t">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Ask something..."
        />
      </form>
    </div>
  );
};


// --- Main Component ---
function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50 overflow-hidden">
      {isOpen ? (
        <ChatWindow onClose={() => setIsOpen(false)} />
      ) : (
        <ChatIcon onClick={() => setIsOpen(true)} />
      )}
    </div>
  );
}

export default Chatbot;