import React, { useState } from 'react'
import { ChatData } from '../../context/ChatContext'
import toast from 'react-hot-toast'
import axios from 'axios'

const MessageInput = ({ setMessages, selectedChat }) => {

    const [textMsg, setTextMsg] = useState('')
    const {setChats} = ChatData()

    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const darkStyle = {
      background: 'rgb(31 41 55)',
      color: '#fff',
    };

    const handleMessage = async (e) => {
        e.preventDefault()
        const toastId = toast.loading("Processing...", { style: isDarkMode ? darkStyle : {} });
        try {
            const { data } = await axios.post('/api/message/', { message:textMsg, recieverId: selectedChat.users[0]._id})
            
            toast.success(data.msg, { style: isDarkMode ? darkStyle : {}, id: toastId });
            setMessages((message) => [...message, data]);
            setTextMsg('')
            setChats((prev) => {
                const updateChat = prev.map((chat) => {
                    if(chat._id === selectedChat._id){
                        return { ...chat, latestMessage: {
                            text: textMsg,
                            sender: data.sender
                        }}
                    }
                    return chat
                });
                return updateChat;
            })
        } catch (err) {
            console.log(err)
            toast.error(err.response.data.msg, { style: isDarkMode ? darkStyle : {}, id: toastId })
        }
    }

  return (
    <div>
        <form onSubmit={handleMessage}>
            <label htmlFor="chat" className="sr-only">Your message</label>
            <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                <textarea onChange={(e) => setTextMsg(e.target.value)} value={textMsg} required id="chat" rows="1" className="block mr-2 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
                    <button type="submit" className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                    <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                        <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"/>
                    </svg>
                    <span className="sr-only">Send message</span>
                </button>
            </div>
        </form>
    </div>
  )
}

export default MessageInput