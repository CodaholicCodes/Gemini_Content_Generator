import React, { createContext, useState,useEffect } from 'react'

export const ChatContext=createContext();

export const ChatProvider= ({children}) => {

const [chats,setChats]=useState([]);
const [loading,setLoading]=useState(false);
const [error,setError]=useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:3001/api/conversation')
      .then(res => res.json())
      .then(chats => {
        console.log(chats);
        setChats(chats);
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

const addChat=(chat)=>{
setChats([...chats,chat]);
}
 

const deleteChat=(id)=>{
  console.log("Delete Chat function called");
setChats(chats.filter(chat=>chat._id!==id));
}

const updateChat=(updatedChat)=>{
setChats(chats.map(chat=>chat._id===updatedChat._id ? updatedChat : chat));
}




  return (
  <ChatContext.Provider value={{chats , addChat,deleteChat,updateChat}}>
    {children}
     </ChatContext.Provider>
  )
}

