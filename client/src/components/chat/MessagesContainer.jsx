import React, { useEffect, useState } from 'react'
import { UserData } from '../../context/UserContext'
import axios from 'axios'
import { Loading } from '../Loading'
import Message from './Message'
import MessageInput from './MessageInput'
import { SocketData } from '../../context/SocketContext'

const MessagesContainer = ({ selectedChat, setChats}) => {

    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)

    const { socket } = SocketData()
    const {user} = UserData()

    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (message) => {
            if (selectedChat?._id === message.chatId) {
                setMessages((prev) => [...prev, message]);
            }
        };

        socket.on('newMessage', handleNewMessage);

        return () => {
            socket.off('newMessage', handleNewMessage);
        };
    }, [socket, selectedChat?._id]);

    async function fetchMessage(){
        setLoading(true)
        try {
            const { data } = await axios.get('/api/message/' + selectedChat.users[0]._id)
            setMessages(data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user && selectedChat) {
            fetchMessage();
        }
    }, [selectedChat, user]);

    useEffect(() => {
    console.log("Messages:", messages);
}, [messages]); 

  return (
    <div className='py-3'>{ selectedChat && (
        <>
            <div className="flex items-center">
                <div className="flex-1 min-w-0 ms-4 justify-end text-right">
                    <p className="text-md font-medium text-gray-900 truncate dark:text-white">
                        {selectedChat.users[0].name}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {selectedChat.users[0].email}
                    </p>
                </div>
                <div className="flex-shrink-0 ml-4">
                    <img className="w-10 h-10 rounded-full" src={selectedChat.users[0].profilePicture.url} alt={selectedChat.users[0].profilePicture.url}/>
                </div>
            </div>
            <hr className="w-full h-px mt-4 bg-gray-200 border-0 dark:bg-gray-700"/>
            <div className='my-4 pr-2 flex justify-center min-h-[60vh] max-h-[60vh] overflow-hidden overflow-y-auto'>
                {loading ? <Loading/> : <>
                    <div className='justify-center'>
                        { messages && messages.map((e) => (
                            <Message key={e._id} message={e.text} ownMessage={e.sender && e.sender._id === user._id || e.sender === user._id} sender={e.sender} timestamp={e.createdAt}/>
                        ))}
                    </div>
                </>}
            </div>
            <MessageInput setMessages={setMessages} selectedChat={selectedChat}/>
        </>
    )}
    </div>
  )
}

export default MessagesContainer