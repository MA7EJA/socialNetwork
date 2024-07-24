import React, { useEffect, useState } from 'react'
import { ChatData } from '../context/ChatContext'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Chat from '../components/chat/Chat'
import MessagesContainer from '../components/chat/MessagesContainer'
import { SocketData } from '../context/SocketContext'

const ChatPage = ({ user }) => {

    const { createChat, selectedChat, setSelectedChat, chats, setChats } = ChatData()

    const [users, setUsers] = useState([])
    const [query, setQuery] = useState('')
    const [search, setSearch] = useState(false)

    const [showSide, setShowSide] = useState(false)
    const [loading, setLoading] = useState(false)

    async function fetchAllUsers(){
        setLoading(true)
        try {
            const { data } = await axios.get('/api/user/all?search=' + query)

            setUsers(data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const getAllChats = async () =>{
        try {
            const { data } = await axios.get('/api/message/chats')

            setChats(data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSearch = (e) => {
        e.preventDefault()
        fetchAllUsers()
    }

    useEffect(() => {
        getAllChats()
    }, [])

    async function createNewChat(id){
        await createChat(id)
        setSearch(false)
        getAllChats();
        setShowSide(!showSide)
    }

    const { onlineUsers, socket } = SocketData()

  return (
    <>
        <div className='ml-64'>
            <div className='w-full max-w-lg mx-auto'>
            
        <button onClick={() => setShowSide(!showSide)} data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="fixed -ml-[244px] lg:-ml-0 inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
        </button>

        <div onClick={() => setShowSide(!showSide)} className={`bg-black opacity-50 z-[998] top-0 left-0 p-0 m-0 overflow-hidden absolute w-full min-h-screen lg:-left-0 ${showSide ? '' : 'hidden'}`}></div>
        <aside id="default-sidebar" className={`fixed top-0 left-0 z-[999] w-64 h-screen transition-transform ${showSide ? "" : "-translate-x-full"}`} aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <ul className="space-y-2 font-medium">
                    <li>
                        <div className="mb-4 mx-auto w-full max-w-lg">
                            <form onSubmit={handleSearch} className="max-w-lg mx-auto mb-6">   
                                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                        </svg>
                                    </div>
                                    <input value={query} onChange={e => setQuery(e.target.value)} type="search" id="default-search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search User..." required />
                                    { loading ? (
                                        <button disabled type="button" className="text-white absolute end-[3px] bottom-[3px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                        </svg>
                                        Loading...
                                        </button>
                                    ) : (
                                        <button type="submit" className="text-white absolute end-[3px] bottom-[3px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </li>
                    {users && users.length > 0 ? (
                        <ul>
                            {users.map((e) => (
                            <li key={e._id} className="pb-3 sm:pb-4">
                                <div onClick={() => createNewChat(e._id)}>
                                <div className="flex items-center space-x-4 rtl:space-x-reverse cursor-pointer">
                                    <div className="flex-shrink-0">
                                    <img className="w-8 h-8 rounded-full" src={e.profilePicture.url} alt={e.name} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        {e.name}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        {e.email}
                                    </p>
                                    </div>
                                    <div className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                                    Chat
                                    </div>
                                </div>
                                </div>
                            </li>
                            ))}
                        </ul>
                        ) : (
                        <p>There is no user with that name.</p>
                    )}
                    <hr className="h-px my-8 bg-gray-400 border-0 dark:bg-gray-500"/>
                    {chats.map((e) => (
                        <Chat key={e._id} chat={e} setSelectedChat={setSelectedChat} onClick={() => setShowSide(false)} isOnline={onlineUsers.includes(e.users[0]._id)} />
                    ))}
                </ul>
            </div>
            </aside>
            <div className='-ml-64 lg:ml-0 px-4'>
                {selectedChat === null ?(
                    <div className='flex justify-center items-center flex-col text-center min-h-screen'>
                        <h1 className="text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-4xl dark:text-white mb-8">Welcome <span className='text-blue-700 dark:text-blue-500'>{user.name}</span> to Your Messages</h1>
                        <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-24 dark:text-gray-400">Dive into your conversations! Select a chat from the list to start messaging with your friends and contacts. </p>
                    </div>
                ): (
                    <div>
                        <MessagesContainer selectedChat={selectedChat} setChats={setChats}/>
                    </div>
                )}
            </div>
        </div>
        </div>
    </>
  )
}

export default ChatPage