import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChatContext } from '../store/ChatContext';
import formatDateTime from '../utils/dateUtil';
import ReactMarkdown from 'react-markdown';

const Chat = () => {
  const { id } = useParams();
  const [chat, setChat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { chats, addChat, updateChat } = useContext(ChatContext);

  const messagesEndRef = useRef(null);
  const promptRef = useRef(null);
  const modelRef = useRef(null);
  const navigate=useNavigate();

  useEffect(() => {
    if (id) {
      const found = chats.find((c) => c._id === id);
      setChat(found || null);
    } else {
      setChat(null);
    }
  }, [id, chats]);

  useEffect(() => {
    // scroll to bottom when chat updates
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat?.messages]);

  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (!promptRef.current.value) return;
    setLoading(true);
    setError(null);

    const url = id
      ? `http://localhost:3001/api/conversation/${id}`
      : `http://localhost:3001/api/conversation`;

    try {
      const res = await fetch(url, {
        method: id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: promptRef.current.value,
          model: modelRef.current.value,
        }),
      });
      const chatResponse = await res.json();
      setChat(chatResponse);
      if (id) {
        updateChat(chatResponse);
       navigate(`/conversation/${id}`);  
    } else {
        addChat(chatResponse);
    }
      promptRef.current.value = '';
      
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white font-sans">
      <header className="px-4 py-3 border-b border-gray-300">
        <h2 className="text-xl font-bold text-gray-900">
          {chat ? chat.title : 'New Conversation'}
         
        </h2>
         <span className='font-bold text-gray-500'>
         {chat ? chat.model : ''}
          </span>
        {chat && (
          <div className="text-xs text-gray-500">
            Started: {formatDateTime(chat.startTime)}
          </div>
        )}
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 bg-gray-50">
        {chat && chat.messages.length > 0 ? (
          chat.messages.map((msg) => (
            <div
              key={msg._id}
              className={`max-w-3/4 p-3 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-blue-100 text-blue-900 self-end'
                  : 'bg-gray-200 text-gray-900 self-start'
              }`}
            >
              <div><ReactMarkdown>{msg.content}</ReactMarkdown></div>
              <div className="text-xs text-gray-500 mt-1">
                {formatDateTime(Date.now())}
              </div>
            </div>
          ))
        ) : (
          <div className="text-sm text-gray-500">
            {loading ? 'Thinking...' : 'Send a message to start the conversation.'}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSendMessage}
        className="px-4 py-3 border-t border-gray-300 bg-white flex items-center space-x-2"
      >
        <select
          ref={modelRef}
          className="px-3 py-2 border border-gray-300 rounded bg-white text-gray-700"
          defaultValue="gemini-2.5-flash"
        >
          <option value="gemini-2.5-pro">Gemini 2.5 Pro</option>
          <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
          <option value="gemini-2.5-flash-lite">Gemini 2.5 Flash Lite</option>
        </select>
        <input
          ref={promptRef}
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none"
          disabled={loading}
        />
        <button
          type="submit"
          className={`px-4 py-2 bg-blue-600 text-white rounded ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
          }`}
          disabled={loading}
        >
          {loading ? 'Sending…' : 'Send'}
        </button>
      </form>

      {error && (
        <div className="px-4 py-2 text-sm text-red-600">{error}</div>
      )}
    </div>
  );
};

export default Chat;
