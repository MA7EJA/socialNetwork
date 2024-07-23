import axios from "axios";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const ChatContext = createContext()

export const ChatContextProvider = ({ children }) => {

    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const darkStyle = {
      background: 'rgb(31 41 55)',
      color: '#fff',
    };

    const [chats, setChats] = useState([])
    const [selectedChat, setSelectedChat] = useState(null)

    async function createChat(id){
        const toastId = toast.loading("Processing...", { style: isDarkMode ? darkStyle : {} });
        try {
            const { data } = await axios.post('/api/message', {
                reciverId: id,
                message: "hii"
            })
            
            toast.success(data.msg, { style: isDarkMode ? darkStyle : {}, id: toastId });

        } catch (err) {
            toast.error(err.response.data.msg, { style: isDarkMode ? darkStyle : {}, id: toastId })
        }
    }

    return <ChatContext.Provider value={{ createChat, selectedChat, setSelectedChat, chats, setChats }}>{children}</ChatContext.Provider>
}

export const ChatData = () => useContext(ChatContext)