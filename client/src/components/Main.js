import React, { useContext,useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { GlobalContext } from "./../GlobalContext";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Post from "./pages/Post";
import Users from "./pages/Users";
import ProtectedRoute from "./utlis/ProtectedRoute";

function Main() {
  const context = useContext(GlobalContext);
  const [isLogged, setIsLogged] = context.authApi.isLogged;
  

  return (
    <Router>
      <Navbar />
      <ToastContainer autoClose={1500} position="top-center" />
      <Routes>
        
          <Route path={"/"} element={<ProtectedRoute auth={isLogged}><Home /> </ProtectedRoute>} />          
          <Route path={"/users"} element={<ProtectedRoute auth={isLogged}><Users /> </ProtectedRoute>} />
          <Route path={"/posts"} element={<ProtectedRoute auth={isLogged}><Post /> </ProtectedRoute>} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/login"} element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        
      </Routes>
    </Router>
  );
}

export default Main;
