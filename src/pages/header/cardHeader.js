import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./adminHeader.css";

const CardHeader = () => {  
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className={`navbar ${token ? "navbar-primary" : "navbar-dark"}`}>
      <div className="container">
        <div className="navbar-brand">
          <Link to="">
            <strong>{token ? "Logged-In" : "Not-LoggedIn"}</strong>
          </Link>
        </div>
        <div className="nav-links ml-auto">
          {token ? (
            <>
              <Link to="/dashboard" className="nav-link">Myinfo</Link>
              <Link to="/userpolicy" className="nav-link">
                  Leave Policy
              </Link>
              <Link to="/" className="nav-link" onClick={handleLogout}>Logout</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default CardHeader;
