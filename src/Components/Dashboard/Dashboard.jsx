import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark-theme', darkTheme);
  }, [darkTheme]);

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

  return (
    <div className={`dashboard-container ${darkTheme ? 'dark-theme' : 'light-theme'}`}>
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Menu</h2>
        <ul>
          <li>Dashboard</li>
          <li>User Service Records</li>
          <li>Technicians</li>
          <li>Service Requests</li>
          <li>Reports</li>
          <li>Settings</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
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
              </tr>
              <tr>
                <td>002</td>
                <td>Jane Smith</td>
                <td>Rachel Zane</td>
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
      </div>
    </div>
  );
};

export default Dashboard;
