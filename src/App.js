import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/auth/login/Login";
import Signup from "./pages/auth/singup/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import Admin from "./pages/admin_folder/admin/admin";
import Admindashboard from "./pages/admin_folder/admin_dashboard/Admin_dashboard";
import AdminProduct from "./pages/admin_folder/admin_dashboard/AdminProduct";
import CartPage from "./pages/cart/CardPage";
import { createContext, useState } from "react";
import FirstPage from "./pages/FirstPage";
import AdminSignup from "./pages/auth/adminsingup/adminsingup";
import Notify, { LeavePliocy } from "./pages/LeavePolicy";
import Policy_dashboard from "./pages/admin_folder/Policy/Policy_dashboard";
import PolicyAdd from "./pages/admin_folder/Policy/policy_add";
import AdminProductDetails from "./pages/admin_folder/admin_dashboard/AdminProductDetails";
import Attendance from "./pages/attence/attence";

export const Usercontext = createContext();

function App() {
  const [title, setTitle] = useState("");

  return (
    <div className="App">
      <Usercontext.Provider value={{ title, setTitle }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<FirstPage />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admindashboard" element={<Admindashboard />} />
            <Route path="/leavepolicy" element={<Policy_dashboard/>}/>
            <Route path="/leaveadd" element={<PolicyAdd />} />
            <Route path="/adminproduct" element={<AdminProduct />} />
            <Route path="/admin/details"element={<AdminProductDetails/>} />
            <Route path="/attendance" element={<Attendance/>} />

            <Route path="/adminsignup" element={<AdminSignup />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/userpolicy" element={<LeavePliocy/>} />

            {/* Catch-all route for 404 pages */}
            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          </Routes>
        </BrowserRouter>
      </Usercontext.Provider>
    </div>
  );
}

export default App;
