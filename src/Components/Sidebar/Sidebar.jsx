import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin Dashboard</h2>
      <ul>
        <li>Home</li>
        <li>Requests</li>
        <li>Technicians</li>
        <li>Users</li>
        <li>Reports</li>
      </ul>
    </div>
  );
};

export default Sidebar;
