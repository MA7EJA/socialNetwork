import { createContext, useContext } from "react";

const SocketContext = createContext()

export const SocketContextProvider = ({ children }) => {
    return <SocketContext.Provider value={{}}>{ children }</SocketContext.Provider>
}

export const SocketData = () => useContext(SocketContext) 