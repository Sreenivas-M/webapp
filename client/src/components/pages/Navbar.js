import React, { useState, useContext } from "react";
import { GlobalContext } from "../../GlobalContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, NavLink } from "react-router-dom";

function Navbar() {
  const context = useContext(GlobalContext);
  const navigate = useNavigate();
  const data = useContext(GlobalContext);
  const [user] = data.authApi.userData;

  const [isLogged, setIsLogged] = context.authApi.isLogged;
  const [isAdmin, setIsAdmin] = context.authApi.isAdmin;
  const [isUser, setIsUser] = context.authApi.isUser;

  const logoutUser = async () => {
    if (window.confirm(`Are u sure to logout`)) {
      await axios.post("/v1/auth/logout");
      localStorage.clear();
      if (isAdmin) {
        setIsAdmin(false);
      }
      if (isUser) {
        setIsUser(false);
      }
      setIsLogged(false);
      toast.success("logout success");
      navigate("/login");
      window.location.reload();
    } else {
      toast.warning("logout terminated");
    }
  };
  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container ">
          <NavLink to="/" class="navbar-brand" style={{textDecoration:'none'}}>
            <h2>{isAdmin ? "Admin logged" : "Costmor Logged"}</h2>
          </NavLink>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* Other nav items can go here */}
            </ul>
            <ul class="navbar-nav me-end mb-2 mb-lg-0">
              {isAdmin && (
                <li class="nav-item">
                  <NavLink to="/posts" className="nav-link" aria-current="page">
                    Get All Posts
                  </NavLink>
                </li>
              )}
               {isAdmin && (
                <li class="nav-item">
                  <NavLink to="/Users" className="nav-link" aria-current="page">
                    Get All Users
                  </NavLink>
                </li>
               )}
              {!isLogged && (
                <>
                  <li class="nav-item">
                    <NavLink
                      to="/register"
                      className="nav-link"
                      aria-current="page"
                    >
                      Register
                    </NavLink>
                  </li>
                  <li class="nav-item">
                    <NavLink
                      to="/login"
                      className="nav-link"
                      aria-current="page"
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              )}
              {isLogged && (
                <li class="nav-item" onClick={logoutUser}>
                  <p
                    className="nav-link"
                    aria-current="page"
                    style={{ cursor: "pointer" }}
                  >
                    Logout
                  </p>
                </li>
               )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
