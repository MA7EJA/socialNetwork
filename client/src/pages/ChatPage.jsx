import React, { useEffect, useState } from 'react'
import { ChatData } from '../context/ChatContext'
import axios from 'axios'

const ChatPage = () => {

    const { createChat, selectedChat, setSelectedChat, chats, setChats } = ChatData()

    const [users, setUsers] = useState([])
    const [query, setQuery] = useState('')
    const [search, setSearch] = useState(false)

    async function fetchAllUsers(){
        try {
            const { data } = await axios.get('/api/user/all?search=' + query)

            setUsers(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchAllUsers()
    }, [query])

  return (
    <div>ChatPage</div>
  )
}

export default ChatPage