import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const UserContext = createContext()

export const UserContextProvider = ({ children }) => {

    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const darkStyle = {
      background: 'rgb(31 41 55)',
      color: '#fff',
    };

    const [ user , setUser ] = useState([])
    const [ isAuth, setIsAuth ] = useState(false)
    const [ loading, setLoading ] = useState(true)

    async function registerUser(formdata, navigate, fetchPosts){
      const toastId = toast.loading("Processing...", { style: isDarkMode ? darkStyle : {} });
      try {
        const { data } = await axios.post('/api/auth/register', formdata);

        toast.success(data.msg, { style: isDarkMode ? darkStyle : {}, id: toastId });
        setIsAuth(true);
        setUser(data.user)
        navigate('/')
        fetchPosts()
      } catch (err) {
        toast.error(err.response.data.msg, { style: isDarkMode ? darkStyle : {}, id: toastId })
      }
    };

    async function loginUser(email, password, navigate, fetchPosts){
      const toastId = toast.loading("Processing...", { style: isDarkMode ? darkStyle : {} });
      try {
        const { data } = await axios.post('/api/auth/login', {email, password});

        toast.success(data.msg, { style: isDarkMode ? darkStyle : {}, id: toastId });
        setIsAuth(true);
        setUser(data.user)
        navigate('/')
        fetchPosts()
      } catch (err) {
        toast.error(err.response.data.msg, { style: isDarkMode ? darkStyle : {}, id: toastId })
      }
    };

    async function fatchUser() {
      try {
        const { data } = await axios.get('/api/user/me')

        setUser(data)
        setIsAuth(true)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setIsAuth(false)
        setLoading(false)
      }
    };

    async function logoutUser(navigate){
      const toastId = toast.loading("Processing...", { style: isDarkMode ? darkStyle : {} });
      try {
        const { data } = await axios.get('/api/auth/logout')

        if(data.msg){
          toast.success(data.msg, { style: isDarkMode ? darkStyle : {}, id: toastId });
          setUser([])
          setIsAuth(false)
          navigate('/login')
        }
      } catch (error) {
        toast.error(err.response.data.msg, { style: isDarkMode ? darkStyle : {}, id: toastId })
      }
    }

    async function followUser(id, fetchUser){
      const toastId = toast.loading("Processing...", { style: isDarkMode ? darkStyle : {} });
      try {
        const { data } = await axios.post('/api/user/follow/' + id)
        toast.success(data.msg, { style: isDarkMode ? darkStyle : {}, id: toastId });
        fetchUser()
      } catch (err) {
        toast.error(err.response.data.msg, { style: isDarkMode ? darkStyle : {}, id: toastId })
      }
    }

    async function updateProfilePicture(id, formdata) {
       const toastId = toast.loading("Processing...", { style: isDarkMode ? darkStyle : {} });
      try {
        const { data } = await axios.put('/api/user/' + id, formdata)

        toast.success(data.msg, { style: isDarkMode ? darkStyle : {}, id: toastId });
        fetchUser()
      } catch (err) {
        toast.error(err.response.data.msg, { style: isDarkMode ? darkStyle : {}, id: toastId })
      }
    }

    async function updateProfileName(id, name, setName) {
       const toastId = toast.loading("Processing...", { style: isDarkMode ? darkStyle : {} });
      try {
        const { data } = await axios.put('/api/user/' + id, {name})

        toast.success(data.msg, { style: isDarkMode ? darkStyle : {}, id: toastId });
        fetchUser()
        setName('')
      } catch (err) {
        toast.error(err.response.data.msg, { style: isDarkMode ? darkStyle : {}, id: toastId })
      }
    }

    useEffect(() => {
      fatchUser()
    }, [])

    return (
      <UserContext.Provider value={{ loginUser, isAuth, setIsAuth, user, setUser, loading, logoutUser, registerUser, followUser, updateProfilePicture, updateProfileName }}>
        {children}
        <Toaster/>
      </UserContext.Provider>
    );
};

export const UserData = () => useContext(UserContext)