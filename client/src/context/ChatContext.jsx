import axios from "axios";
import { createContext, useContext } from "react";

const ChatContext = createContext()

export const ChatContextProvider = ({ children }) => {
    return <ChatContext.Provider value={{}}>{children}</ChatContext.Provider>
}

export const ChatData = () => useContext(ChatContext)