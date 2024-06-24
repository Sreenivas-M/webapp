
import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import useAuth from './components/API/AuthApi'; 

export const GlobalContext = createContext();

function DataProvider(props) {

  const [token,setToken] = useState(null)

  // to read access token after login
  const initToken = useCallback(() => {
    if(localStorage.getItem('loginToken')){
      axios.get(`/v1/auth/refreshToken`)
    .then(res => {
      setToken(res.data.accessToken)
    }).catch(err => console.error(err.response.data.msg))
      }   
  },[])

  useEffect(() => {
    initToken()
  },[initToken])

  const data = {
    token:[token,setToken],
    authApi: useAuth(token),
  }
  return (
    <GlobalContext.Provider value={data}>
      {props.children}
    </GlobalContext.Provider>
  )
}

export default DataProvider