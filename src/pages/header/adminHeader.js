import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./adminHeader.css";

const AdminHeader = () => {
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
        <div className="nav-links">
          {token ? (
            <>
              <Link to="/admindashboard" className="nav-link">Employee List</Link>
              <Link to="/leavepolicy" className="nav-link">Leave Policy</Link>
              <Link to="/" className="nav-link" onClick={handleLogout}>Logout</Link>
            </>
          ) : (
            <>
              <Link to="/admin" className="nav-link">Admin Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AdminHeader;
