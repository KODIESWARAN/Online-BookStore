import axios from 'axios'
import { createContext, useEffect, useState } from 'react'


const AuthContext = createContext(null);


  export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)


    axios.defaults.withCredentials = true;


    useEffect(() => {
        const fetchUser = async () =>{
             try {
                const res = await  axios.get('http://localhost:8000/api/auth/check')
                setUser(res.data.user)
             } catch (err) {
                console.log(err)
                setUser(null)
             }finally {
                setLoading(false)
             }
        }
        fetchUser()
    },[])



    const signup = async(formData) => {
        const res = await axios.post('http://localhost:8000/api/auth/signup', formData);
        setUser(res.data.user)
    
    }
    
    const login = async(formData) => {
        const res = await axios.post('http://localhost:8000/api/auth/login' , formData)
        setUser(res.data.user)
    }
    
    const logout = async() => {
        await axios.post('http://localhost:8000/api/auth/logout')
        setUser(null)
    }
    
    return (
        <AuthContext.Provider value={{user , setUser, signup ,login ,logout , loading}}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContext;