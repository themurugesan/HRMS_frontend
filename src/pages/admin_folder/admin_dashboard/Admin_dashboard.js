import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './Admin_dashboard.css';  
import Headers from '../../header/adminHeader';
import { Usercontext } from '../../../App';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa'; // Import Font Awesome eye icon

const Admin_dashboard = () => {
    const { setTitle } = useContext(Usercontext);  
    const navigate = useNavigate();
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_SERVER ? process.env.REACT_APP_SERVER : window.location.origin}/api/images`,{
                headers: {
                    Authorization: localStorage.token
                }
            });
            
            setImages(data);
        } catch (error) {
            if (error.response.data.code === 401) {
                alert("Unauthorized");
                navigate("/admin");
                localStorage.clear();
            }
            console.error('Error fetching images:', error);
        }
    };

    const handleDelete = async (id) => {
        // Display a confirmation popup
        const userConfirmed = window.confirm('Are you sure you want to delete this image? Click OK to proceed.');
      
        if (userConfirmed) {
          try {
            await axios.delete(`${process.env.REACT_APP_SERVER ? process.env.REACT_APP_SERVER : window.location.origin}/api/images/${id}`);
            fetchImages();  
          } catch (error) {
            console.error('Error deleting image:', error);
          }
        } else {
          console.log('Image deletion was canceled by the user.');
        }
    };

    const handleEdit = (image) => {
        setTitle(image);  
        navigate("/adminproduct");  
    };

    const handleView = (image) => {
        setTitle(image);  
        navigate("/admin/details");
     };

    const handleAddEmployee = () => {
        navigate("/adminproduct");  
    };

    return (
        <>
            <Headers />
            <div className="app-container">
                <h1 className="heading">Employee List</h1>
                <button className="add-employee-btn" onClick={handleAddEmployee}>
                    Add Employee
                </button>

                <table className="image-table">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Employee Name</th>
                            <th>Department</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {images.map((image, index) => (
                            <tr key={image._id}>
                                <td>{index + 1}</td>
                                <td>{image.title}</td>
                                <td>{image.department}</td>
                                <td>
                                    <button 
                                        className="view-btn" 
                                        onClick={() => handleView(image)}
                                    >
                                        <FaEye />
                                    </button>
                                    <button 
                                        className="edit-btn" 
                                        onClick={() => handleEdit(image)}
                                    >
                                        <FaEdit />
                                    </button>
                                    <button 
                                        className="delete-btn" 
                                        onClick={() => handleDelete(image._id)}
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
