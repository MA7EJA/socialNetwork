import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const PostContext = createContext()

export const PostContextProvider = ({ children }) => {
    const [posts, setPosts] = useState([])
    const [reels, setReels] = useState([])

    async function fetchPost(){
        try {
            const { data } = await axios.get('/api/post/all')

            setPosts(data.posts)
            setReels(data.reels)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPost();
    }, [])

    return <PostContext.Provider value={{ posts, reels}}>
        {children}
    </PostContext.Provider>
}

export const PostData = () => useContext(PostContext)