import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import { getChatResponse } from '../services/geminiService';

const Assistant: React.FC<{
  chatHistory: ChatMessage[];
  setChatHistory: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}> = ({ chatHistory, setChatHistory }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [chatHistory]);
  
  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = { id: `user-${Date.now()}`, text: input, sender: 'user' };
    setChatHistory(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiText = await getChatResponse([...chatHistory, userMessage], input);
      const aiMessage: ChatMessage = { id: `ai-${Date.now()}`, text: aiText, sender: 'ai' };
      setChatHistory(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: ChatMessage = { id: `ai-error-${Date.now()}`, text: "Sorry, I couldn't connect to the AI assistant. Please try again.", sender: 'ai' };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
        <h1 className="text-3xl font-bold text-brand-text-primary mb-4">AI Assistant</h1>
        <div className="flex-grow overflow-y-auto mb-4 p-4 bg-brand-surface border border-gray-200 rounded-lg space-y-4">
            {chatHistory.map(msg => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-brand-green text-white' : 'bg-brand-surface text-brand-text-primary'}`}>
                        <p>{msg.text}</p>
                    </div>
                </div>
            ))}
             {isLoading && (
                 <div className="flex justify-start">
                    <div className="max-w-xs p-3 rounded-2xl bg-brand-surface text-brand-text-primary">
                        <div className="flex items-center space-x-2">
                           <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                           <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                           <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></div>
                        </div>
                    </div>
                 </div>
            )}
            <div ref={messagesEndRef} />
        </div>
        <div className="flex mt-auto">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask a question..."
                className="flex-grow p-3 bg-brand-surface border border-gray-300 rounded-l-full focus:ring-brand-green focus:border-brand-green"
                disabled={isLoading}
            />
            <button onClick={handleSend} disabled={isLoading} className="px-5 py-3 bg-brand-green text-white font-semibold rounded-r-full hover:bg-brand-green-light disabled:bg-gray-400">
                Send
            </button>
        </div>
    </div>
  );
};

export default Assistant;