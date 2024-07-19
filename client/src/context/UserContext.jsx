import axios from "axios";
import { createContext, useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const UserContext = createContext()

export const UserContextProvider = ({ children }) => {

    const [ user , setUser ] = useState([])
    const [ isAuth, setIsAuth ] = useState(false)
    const [ loading, setLoading ] = useState(true)

    async function loginUser(email, password, navigate){
      try {
        const { data } = await axios.post('/api/auth/login', {email, password});

        toast.success(data.msg, {style: {
          background: 'rgb(31 41 55)',
          color: '#fff',
        },});
        setIsAuth(true);
        setUser(data.user)
        navigate('/')
      } catch (err) {
        toast.error(err.response.data.msg, {style: {
          background: 'rgb(31 41 55)',
          color: '#fff',
        },})
      }
    };

    return (
      <UserContext.Provider value={{ loginUser }}>
        {children}
        <Toaster/>
      </UserContext.Provider>
    );
};

export const UserData = () => useContext(UserContext)