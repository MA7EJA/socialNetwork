import React from 'react'
import { UserData } from '../../context/UserContext';
import { BsSendCheckFill } from "react-icons/bs";

const Chat = ({ chat, setSelectedChat }) => {
    const { user: loggedInUser } = UserData()
    let user;
    if(chat) user = chat.users[0]
  return (
    <div>
        {user && (
            <li className='my-4'>
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="flex-shrink-0">
                    <div className="relative">
                        <img className="w-10 h-10 rounded-full" src={user.profilePicture.url} alt={user.name}/>
                        <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                    </div>
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {user.name}
                    </p>
                    <p className="text-sm inline-flex items-center text-gray-500 truncate dark:text-gray-400">
                        {loggedInUser._id === chat.latestMessage.sender ? <BsSendCheckFill className='mr-1 text-xs'/> : ''}
                        {chat.latestMessage.text.slice(0, 16)}...
                    </p>
                </div>
                <div className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                    Chat
                </div>
            </div>
            </li>
        )}
    </div>
  )
}

export default Chat