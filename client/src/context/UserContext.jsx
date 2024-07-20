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

    async function loginUser(email, password, navigate){
      try {
        const { data } = await axios.post('/api/auth/login', {email, password});

        toast.success(data.msg, { style: isDarkMode ? darkStyle : {} });
        setIsAuth(true);
        setUser(data.user)
        navigate('/')
      } catch (err) {
        toast.error(err.response.data.msg, { style: isDarkMode ? darkStyle : {} })
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
    }

    useEffect(() => {
      fatchUser()
    }, [])

    return (
      <UserContext.Provider value={{ loginUser, isAuth, setIsAuth, user, setUser, loading }}>
        {children}
        <Toaster/>
      </UserContext.Provider>
    );
};

export const UserData = () => useContext(UserContext)