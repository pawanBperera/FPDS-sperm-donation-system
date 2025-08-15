
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaCog,  } from 'react-icons/fa';//FaUser
import './Sidebar.css';

export function AdminSidebar() {


  return (

    <div className="sidebar" style={{ marginTop: "-1px", minHeight: "100vh" }}>

    <aside className="sidebar">
      
      <NavLink
        to="/admin/dashboard"
        className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
      > 
      
      <br></br> <br></br>


      <FaHome className="icon" /> Dashboard
      </NavLink>

      <br></br>

      <NavLink
        to="/admin/change-password"
        className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
      > <br></br>
        <FaCog className="icon" /> Account Settings
      </NavLink>

      <br></br>
      
      
    </aside>
    </div>
  );
}
