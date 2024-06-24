import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
function useAuth(token) {
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [callback, setCallback] = useState(false);


   // readAll users
   const readAllUsers = async (token) => {
    const useList = await axios.post(`/v1/auth/allUsers`,{}, {
      headers: { Authorization: token },
    }).then((res)=>{
      setAllUsers(res.data.users);
    }).catch((err)=>console.log(err.msg))    
  };

  const readAllPosts = async (token) => {
    const useList = await axios.post(`/v1/auth/allPosts`,{}, {
      headers: { Authorization: token },
    }).then((res)=>{
      setAllPosts(res.data);
      console.log("11111", res.data)
    }).catch((err)=>console.log(err.msg))    
  };

  useEffect(() => {
    if (token) {
      const getData = async () => {
        const res = await axios.get(`/v1/auth/user`, {
          headers: { Authorization: token },
        }).then((res)=>{
          setUser(res.data.user);
          setIsLogged(true);
          if (res.data.user.role === "admin") {
            setIsAdmin(true);
            readAllUsers(token);
            readAllPosts(token)
          }
          if (res.data.user.role === "user") {
            setIsUser(true);
          }
        }).catch((err)=>console.log(err.msg))
       
        
      };
      getData();
    }
  }, [token]);
 
  return {
    userData: [user, setUser],
    isLogged: [isLogged, setIsLogged],
    isUser: [isUser, setIsUser],
    isAdmin: [isAdmin, setIsAdmin],
    allUsers: [allUsers, setAllUsers],
    allPosts: [allPosts, setAllPosts],
    callback: [callback, setCallback],
  };
}

export default useAuth;
