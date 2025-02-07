import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import "./PolicyDash.css"
import Headers from '../../header/adminHeader';
import { Usercontext } from '../../../App';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import Font Awesome icons

const Admin_dashboard = () => {
    const { setTitle } = useContext(Usercontext);  
    const navigate = useNavigate();
    const [policies, setPolicies] = useState([]);

    useEffect(() => {
        fetchPolicies();
    }, []);

    const fetchPolicies = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_SERVER ? process.env.REACT_APP_SERVER : window.location.origin}/api/policies`,{
                headers: {
                    Authorization: localStorage.token
                }
            });
            setPolicies(data);
        } catch (error) {
            if (error.response.data.code === 401) {
                alert("Unauthorized");
                navigate("/admin");
                localStorage.clear();
            }
            console.error('Error fetching policies:', error);
        }
    };

    const handleDelete = async (id) => {
        // Display a confirmation popup
        const userConfirmed = window.confirm('Are you sure you want to delete this policy? Click OK to proceed.');
      
        if (userConfirmed) {
          try {
            await axios.delete(`${process.env.REACT_APP_SERVER ? process.env.REACT_APP_SERVER : window.location.origin}/api/policies/${id}`);
            fetchPolicies();  
          } catch (error) {
            console.error('Error deleting policy:', error);
          }
        } else {
          console.log('Policy deletion was canceled by the user.');
        }
    };

    const handleEdit = (policy) => {
        setTitle(policy);  
        navigate("/leaveadd");  
    };

    const handleAddPolicy = () => {
        navigate("/leaveadd");  
    };

    return (
        <>
            <Headers />
            <div className="app-container">
                <h1 className="heading">Policy List</h1>
                <button className="add-policy-btn" onClick={handleAddPolicy}>
                    Add Policy
                </button>

                <table className="policy-table">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Policy Type</th>
                            <th>Duration Days</th>
                            <th>Duration</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {policies.map((policy, index) => (
                            <tr key={policy._id}>
                                <td>{index + 1}</td>
                                <td>{policy.policyType}</td>
                                <td>{policy.durationDays}</td>
                                <td>{policy.duration}</td>
                                <td>
                                    <button 
                                        className="edit-btn" 
                                        onClick={() => handleEdit(policy)}
                                    >
                                        <FaEdit />
                                    </button>
                                    <button 
                                        className="delete-btn" 
                                        onClick={() => handleDelete(policy._id)}
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Admin_dashboard;
