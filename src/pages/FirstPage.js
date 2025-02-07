import React from 'react'
import { useNavigate } from 'react-router-dom'
import './FirstPage.css'  

const FirstPage = () => {
  let navigate = useNavigate()

  return (
    <div className='bodys'>
<div className="intro-container">
      <h1>HRMS</h1>
      <div>
        <button onClick={() => navigate("/admin")}>HR LOGIN</button>
        <button onClick={() => navigate("/login")}>EMPLOYEE</button>
      </div>
    </div>
    </div>
    
  )
}

export default FirstPage
