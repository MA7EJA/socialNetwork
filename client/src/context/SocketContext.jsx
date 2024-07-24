import { createContext, useContext, useEffect, useState } from "react";
import io from 'socket.io-client'

const EndPoint = 'http://localhost:5000'

const SocketContext = createContext()

export const SocketContextProvider = ({ children }) => {

    const [socket, setSocket] = useState(null)

    useEffect(() => {
        const socket = io(EndPoint)
        setSocket(socket)
    }, [])

    return <SocketContext.Provider value={{}}>{ children }</SocketContext.Provider>
}

export const SocketData = () => useContext(SocketContext) 