import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../header/adminHeader";
import "./Admin.css"; // Import custom CSS

const Admin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState(""); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.email === "admin@test.com" && formData.password === "admin") {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER ? process.env.REACT_APP_SERVER : window.location.origin}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });

        const result = await response.json();
        
        if (result.token) {
          localStorage.setItem("token", result.token);
          navigate("/admindashboard");
        } else {
          setError("Login failed. Please try again.");
        }
      } catch (error) {
        console.error(error.message);
        setError("Error logging in. Please try again later.");
      } finally {
        setFormData({
          email: "",
          password: ""
        });
      }
    } else {
      setError("Unauthorized access. Invalid email or password.");
      alert("Unauthorized");
      navigate("/admin");
      localStorage.clear();
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="center-form">
        <form onSubmit={handleSubmit} className="login-form">
          <h1>Admin Login</h1>
          
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="form-group">
            <label htmlFor="formBasicEmail">Email address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="formBasicPassword">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-dark w-100">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Admin;
