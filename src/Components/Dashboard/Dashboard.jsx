<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
=======
import axios from 'axios';
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { FaMinus, FaMoon, FaPlus, FaSun } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Settings from '../Settings/Settings';

import './Dashboard.css';
>>>>>>> e84ea8e (Initial commit of my React Project)

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const Dashboard = () => {
<<<<<<< HEAD
  const [darkTheme, setDarkTheme] = useState(false);
=======
  const [editingCell, setEditingCell] = useState({ rowId: null, field: null });
  const [recentRequests, setRecentRequests] = useState([]);
  const [requests, setRequests] = useState([]);
  const [darkTheme, setDarkTheme] = useState(false);
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [serviceRequests, setServiceRequests] = useState([]);
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [technicians, setTechnicians] = useState([]);
  const [showTechnicianForm, setShowTechnicianForm] = useState(false);
  const [newTechnician, setNewTechnician] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    address: '',
    expertise: '',
    availability: ''
  });

  const renderSection = () => {
    switch (activeSection) {
      
      case 'Settings':
        return <Settings />; // Render the Settings page
      default:
        return <Dashboard />;
    }
  };
  

  const handleInputChange = (e, rowId, field) => {
    const updatedRequests = requests.map(request =>
      request.id === rowId ? { ...request, [field]: e.target.value } : request
    );
    setRequests(updatedRequests);
  };

  const handleCellClick = (rowId, field) => {
    if (field === 'status') {
      setEditingCell({ rowId, field });
    }
  };
  
  const handleInputBlur = () => {
    setEditingCell({ rowId: null, field: null });
  };
  

  const handleTechnicianInputChange = (e) => {
    const { name, value } = e.target;
    setNewTechnician(prev => ({ ...prev, [name]: value }));
  };

  const handleTechnicianFormSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/technicians', newTechnician)
      .then(response => {
        console.log('Technician added:', response.data);
        setTechnicians(prev => [...prev, response.data]);
        setShowTechnicianForm(false);
        setNewTechnician({
          name: '',
          phoneNumber: '',
          email: '',
          address: '',
          expertise: '',
          availability: ''
        });
      })
      .catch(error => console.error('Error adding technician:', error));
  };
>>>>>>> e84ea8e (Initial commit of my React Project)

  useEffect(() => {
    document.body.classList.toggle('dark-theme', darkTheme);
  }, [darkTheme]);

<<<<<<< HEAD
=======
  useEffect(() => {
    if (activeSection === 'User Service Records') {
      axios.get('/api/service-requests/all')
        .then(response => {
          console.log('Fetched Service Requests:', response.data);
          setServiceRequests(response.data);
        })
        .catch(error => console.error('Error fetching service requests:', error));
    } else if (activeSection === 'Technicians') {
      axios.get('/api/technicians')
        .then(response => {
          console.log('Fetched Technicians:', response.data);
          setTechnicians(response.data);
        })
        .catch(error => console.error('Error fetching technicians:', error));
    }
  }, [activeSection]);


>>>>>>> e84ea8e (Initial commit of my React Project)
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: darkTheme ? '#ecf0f1' : '#2c3e50',
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.parsed.y}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: darkTheme ? '#34495e' : '#bdc3c7',
        },
        ticks: {
          color: darkTheme ? '#ecf0f1' : '#2c3e50',
        },
      },
      y: {
        grid: {
          color: darkTheme ? '#34495e' : '#bdc3c7',
        },
        ticks: {
          color: darkTheme ? '#ecf0f1' : '#2c3e50',
        },
      },
    },
  };

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Service Requests',
        data: [30, 45, 60, 55, 70, 90, 85],
        fill: false,
        backgroundColor: darkTheme ? 'rgba(46, 204, 113, 0.2)' : 'rgba(52, 152, 219, 0.2)',
        borderColor: darkTheme ? 'rgba(46, 204, 113, 1)' : 'rgba(52, 152, 219, 1)',
        borderWidth: 1,
      },
    ],
  };

<<<<<<< HEAD
=======
  const filteredServiceRequests = serviceRequests.filter(request =>
    (request.client || '').toLowerCase().includes(userSearchTerm.toLowerCase())
  );

  // Function to handle editing status of a specific row and field
const handleEditClick = (rowId, field) => {
  setEditingCell({ rowId, field }); // Set the editing cell to the clicked row and field
};

// Function to handle status change and immediately update the status
const handleStatusChange = (id, newStatus) => {
  axios.put(`/api/service-requests/${id}`, { status: newStatus })
    .then(response => {
      console.log('Status updated:', response.data);
      setServiceRequests(prevRequests =>
        prevRequests.map(request =>
          request.id === id ? { ...request, status: newStatus } : request
        )
      );
      setEditingCell({ rowId: null, field: null }); // Clear editing state after updating
    })
    .catch(error => console.error('Error updating status:', error));
};
 
  const handleDeleteClick = (rowId) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      fetch(`/api/delete-service-record/${rowId}`, { method: 'DELETE' })
        .then(response => {
          if (response.ok) {
            // Remove the record from the frontend state
            setServiceRequests(serviceRequests.filter(request => request.id !== rowId));
          } else {
            alert('Failed to delete the record.');
          }
        })
        .catch(error => {
          alert('An error occurred while deleting the record.');
          console.error('Error:', error);
        });
    }
  };
  
  const handleBooking = async (bookingData) => {
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });
      const newBooking = await response.json();
      updateRecentRequests(newBooking);
    } catch (error) {
      console.error('Error booking service:', error);
    }
  };
  
  const updateRecentRequests = (newBooking) => {
    setRecentRequests((prevRequests) => [newBooking, ...prevRequests]);
  };

>>>>>>> e84ea8e (Initial commit of my React Project)
  return (
    <div className={`dashboard-container ${darkTheme ? 'dark-theme' : 'light-theme'}`}>
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Menu</h2>
        <ul>
<<<<<<< HEAD
          <li>Dashboard</li>
          <li>User Service Records</li>
          <li>Technicians</li>
          <li>Service Requests</li>
          <li>Reports</li>
          <li>Settings</li>
=======
          <li onClick={() => setActiveSection('Dashboard')}>Dashboard</li>
          <li onClick={() => setActiveSection('User Service Records')}>User Service Records</li>
          <li onClick={() => setActiveSection('Technicians')}>Technicians</li>
          
        
          <li onClick={() => setActiveSection('Settings')}><Link to="/settings" className="link-settings">Settings</Link></li>
         
          
         
>>>>>>> e84ea8e (Initial commit of my React Project)
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
<<<<<<< HEAD
        <div className="header">
          <div className="quick-add">
            <button className="add-button">Quick Add</button>
          </div>
          <div className="quick-access">
            <input type="text" placeholder="Search..." className="search-input" />
            <button className="notification-button">Notifications</button>
            <button className="theme-toggle" onClick={() => setDarkTheme(!darkTheme)}>
              {darkTheme ? 'Light Theme' : 'Dark Theme'}
            </button>
          </div>
        </div>

        <div className="dashboard-panels">
          <div className="panel">
            <h3>Service Requests</h3>
            <div className="panel-data">50</div>
            <div className="panel-info">New: 12</div>
            <div className="panel-info">In Progress: 30</div>
            <div className="panel-info">Resolved: 8</div>
          </div>
          <div className="panel">
            <h3>Technicians</h3>
            <div className="panel-data">20</div>
            <div className="panel-info">Available: 15</div>
            <div className="panel-info">On Leave: 3</div>
            <div className="panel-info">Busy: 2</div>
          </div>
          <div className="panel">
            <h3>Clients</h3>
            <div className="panel-data">100</div>
            <div className="panel-info">New: 20</div>
            <div className="panel-info">Active: 80</div>
            <div className="panel-info">Inactive: 10</div>
          </div>
          <div className="panel">
            <h3>Open Requests</h3>
            <div className="panel-data">15</div>
            <div className="panel-info">High Priority: 5</div>
            <div className="panel-info">Medium Priority: 7</div>
            <div className="panel-info">Low Priority: 3</div>
          </div>
        </div>

        <div className={`data-visualization ${darkTheme ? 'dark-theme' : ''}`}>
          <h3>Service Requests Over Time</h3>
          <Line data={data} options={chartOptions} />
        </div>

        <div className={`data-table ${darkTheme ? 'dark-theme' : ''}`}>
          <h3>Recent Requests</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Client</th>
                <th>Technician</th>
                <th>Status</th>
                <th>Date</th>
                <th>Priority</th>
                <th>Service Type</th>
                <th>Estimated Time</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>001</td>
                <td>John Doe</td>
                <td>Mike Ross</td>
                <td className="status-pending">Pending</td>
                <td>2024-08-09</td>
                <td>High</td>
                <td>Repair</td>
                <td>2 hours</td>
                <td>Urgent repair needed</td>
=======
     
        <div className="header2">
          <div className="header-title">Dashboard Overview</div>
          <div className="quick-access">
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
              value={userSearchTerm}
              onChange={(e) => setUserSearchTerm(e.target.value)}
              style={{ display: activeSection === 'User Service Records' ? 'inline-block' : 'none' }}
            />
            <button className="theme-toggle" onClick={() => setDarkTheme(!darkTheme)}>
              {darkTheme ? <FaSun /> : <FaMoon />} {/* Toggle between sun and moon icons */}
            </button>
            {activeSection === 'Technicians' && (
              <button className="add-button" onClick={() => setShowTechnicianForm(!showTechnicianForm)}>
               {showTechnicianForm ? <FaMinus /> : <FaPlus />}
              </button>
            )}
          </div>
        </div>

        {activeSection === 'Dashboard' && (
          <>
            <div className="dashboard-panels">
              <div className="panel">
                <h3>Service Requests</h3>
                <div className="panel-data">50</div>
                <div className="panel-info">New: 12</div>
                <div className="panel-info">In Progress: 30</div>
                <div className="panel-info">Resolved: 8</div>
              </div>
              <div className="panel">
                <h3>Technicians</h3>
                <div className="panel-data">20</div>
                <div className="panel-info">Available: 15</div>
                <div className="panel-info">On Leave: 3</div>
                <div className="panel-info">Busy: 2</div>
              </div>
              <div className="panel">
                <h3>Clients</h3>
                <div className="panel-data">100</div>
                <div className="panel-info">New: 20</div>
                <div className="panel-info">Active: 80</div>
                <div className="panel-info">Inactive: 10</div>
              </div>
              <div className="panel">
                <h3>Open Requests</h3>
                <div className="panel-data">15</div>
                <div className="panel-info">High Priority: 5</div>
                <div className="panel-info">Medium Priority: 7</div>
                <div className="panel-info">Low Priority: 3</div>
              </div>
            </div>

            <div className={`data-visualization ${darkTheme ? 'dark-theme' : ''}`}>
              <h3>Service Requests Over Time</h3>
              <Line data={data} options={chartOptions} />
            </div>

            <div className={`data-table ${darkTheme ? 'dark-theme' : ''}`}>
              <h3>Recent Requests</h3>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Client</th>
                    <th>Technician</th>
                    <th>Status</th>
                   
                  </tr>
                </thead>
                <tr>
                <td>6</td>
                <td>John Doe</td>
                <td>Mike Ross</td>
                <td>Pending</td>
>>>>>>> e84ea8e (Initial commit of my React Project)
              </tr>
              <tr>
                <td>002</td>
                <td>Jane Smith</td>
                <td>Rachel Zane</td>
<<<<<<< HEAD
                <td className="status-completed">Completed</td>
                <td>2024-08-08</td>
                <td>Medium</td>
                <td>Installation</td>
                <td>1 hour</td>
                <td>Installation of new appliance</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
=======
                <td>Completed</td>
              </tr>
              {/* Add more rows as needed */}
            
                <tbody>
                  {requests.map((request) => (
                    <tr key={request.id}>
                      <td>{request.id}</td>
                      <td>{request.client}</td>
                      <td>{request.technician}</td>
                      <td onClick={() => handleCellClick(request.id, 'status')}>
                        {editingCell.rowId === request.id && editingCell.field === 'status' ? (
                          <input
                            type="text"
                            value={request.status}
                            onChange={(e) => handleInputChange(e, request.id, 'status')}
                            onBlur={handleInputBlur}
                          />
                        ) : (
                          request.status
                        )}
                      </td>
                      <td>{request.date}</td>
                      <td>{request.priority}</td>
                      <td>{request.serviceType}</td>
                      <td>{request.estimatedTime}</td>
                      <td>{request.comments}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeSection === 'User Service Records' && (
          <div className={`data-table ${darkTheme ? 'dark-theme' : ''}`}>
            <h3 className="service-techni">Service Requests</h3>
            <table>
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>User Name</th>
                  <th>Mail ID</th>
                  <th>Phone No</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>ServiceType</th>
                  <th>Request Date</th>
                  <th>Request Date & Time</th>
                  <th>Technician ID</th>
                
                 
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
              {filteredServiceRequests.map((request) => (
                <tr key={request.id}>
                  <td>{request.id}</td>
                  <td>{request.name}</td>
                  <td>{request.email}</td>
                  <td>{request.phone}</td>
                  <td>{request.address}</td>
                  <td>{request.city}</td>
                  <td>{request.serviceType}</td>
                  <td>{request.preferredDateTime ? request.preferredDateTime.toString() : 'N/A'}</td>
                  <td>{request.description}</td>
                  <td>{request.technicianId ? request.technicianId : 'N/A'}</td>
                 
      
        
      
       
    
    
                  <td>
                    <button onClick={() => handleEditClick(request.id)} className="editt-button">Edit</button>
                    <button onClick={() => handleDeleteClick(request.id)} className="del-button">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>

            </table>
          </div>
        )}

        {activeSection === 'Technicians' && (
          <>
            {showTechnicianForm && (
              <div className={`technician-form ${darkTheme ? 'dark-theme' : ''}`}>
                <h3 className="tech-add">Add New Technician</h3>
                <form onSubmit={handleTechnicianFormSubmit}>
                  <label className="tech-form"  style={{ paddingRight: '10px' }}>
                    Name: 
                    <input
                      type="text"
                      name="name"
                      value={newTechnician.name}
                      
                      onChange={handleTechnicianInputChange}
                      required
                    />
                  </label>
                  <label className="tech-form"  style={{ paddingRight: '10px' }}>
                    Phone Number:
                    <input
                      type="text"
                      name="phoneNumber"
                      value={newTechnician.phoneNumber}
                      onChange={handleTechnicianInputChange}
                      required
                    />
                  </label>
                  <label  className="tech-form"  style={{ paddingRight: '10px' }}>
                    Email:
                    <input
                      type="email"
                      name="email"
                      value={newTechnician.email}
                      onChange={handleTechnicianInputChange}
                      required
                    />
                  </label>
                  <label  className="tech-form"  style={{ paddingRight: '10px' }}>
                    Address:
                    <input
                      type="text"
                      name="address"
                      value={newTechnician.address}
                      onChange={handleTechnicianInputChange}
                      required
                    />
                  </label>
                  <label  className="tech-form"  style={{ paddingRight: '10px' }}>
                    Expertise:
                    <input
                      type="text"
                      name="expertise"
                      value={newTechnician.expertise}
                      onChange={handleTechnicianInputChange}
                      required
                    />
                  </label>
                  <label  className="tech-form"  style={{ paddingRight: '10px' }}>
                    Availability:
                    <input
                      type="text"
                      name="availability"
                      value={newTechnician.availability}
                      onChange={handleTechnicianInputChange}
                    />
                  </label>
                  <button type="submit" className="tech-button">Add Technician</button>
                </form>
              </div>
            )}

            <div className={`data-table ${darkTheme ? 'dark-theme' : ''}`}>
              <h3 className="service-techni1">Available Technicians</h3>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Expertise</th>
                    <th>Availability</th>
                  </tr>
                </thead>
                <tbody>
                  {technicians.map((technician) => (
                    <tr key={technician.id}>
                      <td>{technician.id}</td>
                      <td>{technician.name}</td>
                      <td>{technician.phoneNumber}</td>
                      <td>{technician.email}</td>
                      <td>{technician.address}</td>
                      <td>{technician.expertise}</td>
                      <td>{technician.availability ? technician.availability : 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
>>>>>>> e84ea8e (Initial commit of my React Project)
      </div>
    </div>
  );
};

export default Dashboard;
