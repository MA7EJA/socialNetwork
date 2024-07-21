import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const PostContext = createContext()

export const PostContextProvider = ({ children }) => {

    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const darkStyle = {
      background: 'rgb(31 41 55)',
      color: '#fff',
    };

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

    async function addPost(formdata, setCaption, setFile, setFilePrev, type){
        const toastId = toast.loading("Processing...", { style: isDarkMode ? darkStyle : {} });
        try {
            const { data } = await axios.post('/api/post/new?type=' + type, formdata)

            toast.success(data.msg, { style: isDarkMode ? darkStyle : {}, id: toastId })
            fetchPost();
            setFile('')
            setFilePrev('')
            setCaption('')
        } catch (error) {
            toast.error(error.response.data.msg, { style: isDarkMode ? darkStyle : {}, id: toastId })
        }
    }

    useEffect(() => {
        fetchPost();
    }, [])

    return <PostContext.Provider value={{ posts, reels, addPost }}>
        {children}
    </PostContext.Provider>
}

export const PostData = () => useContext(PostContext)