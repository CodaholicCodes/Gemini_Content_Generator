import React, { useContext } from 'react';
import { ChatContext } from '../store/ChatContext';
import formatDateTime from '../utils/dateUtil';
import { Link, useNavigate } from 'react-router-dom';

const SideBar = () => {
  const navigate = useNavigate();
  const { chats,deleteChat } = useContext(ChatContext);

  const handleNewChat = () => {
    navigate('/');
    console.log("New Chat");
  };

  const handleDelete=(id)=>{
    
     fetch( `https://geminicontentgenerator-production.up.railway.app//api/conversation/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(()=>{
      deleteChat(id);
      console.log( "After Deleting : ",chats);
      }
      );
    }
  

  return (
    <div className="flex h-screen font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 text-gray-900 font-inter flex-flex-col border-r border-gray-300">
        <div className="px-4 py-6">
          <h1 className="text-2xl font-bold">Codaholic Assistant | Your Code-Companion</h1>
          <button
            className="mt-4 w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition"
            onClick={handleNewChat}
          >
            + New Chat
          </button>
        </div>
        <nav className="px-4 py-4 overflow-y-auto flex-1">
          {chats.length === 0 ? (
            <p className="text-sm text-gray-600">No chats yet</p>
          ) : (
            chats.map(chat => (
              <div key={chat._id}>
              <Link
                to={`/conversation/${chat._id}`}
                className="block mb-2 px-3 py-2 rounded-md hover:bg-gray-200 transition"
              >
                <div className="text-base font-medium">{chat.title}</div>
                <div className="text-xs text-gray-600 mt-1">{formatDateTime(chat.startTime)}</div>
              </Link>
              <button className='text-red-600 font-semibold' onClick={()=>handleDelete(chat._id)}>Delete</button>
              </div>
            ))
          )}
        </nav>
      </aside>

      {/* Main content area */}
      <main className="flex-1 bg-white p-6">
        {/* Insert here your main content / outlet */}
      </main>
    </div>
  );
};

export default SideBar;
