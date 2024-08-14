import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Settings.css';

const Settings = () => {
  const [formValues, setFormValues] = useState({
    companyName: '',
    adminEmail: '',
    notificationPreferences: 'email',
    password: '',
    confirmPassword: ''
  });

  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // Simulate fetching existing settings from an API or local storage
        const response = await axios.get('/api/settings'); // Replace with actual API call
        setFormValues(response.data);
      } catch (error) {
        console.error('Error fetching settings:', error);
        setSaveStatus('Error fetching settings.');
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formValues.password && formValues.password !== formValues.confirmPassword) {
      setSaveStatus('Passwords do not match');
      return;
    }

    try {
      // Simulate API call to save settings
      await axios.post('/api/settings', formValues); // Replace with actual API call
      setSaveStatus('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      setSaveStatus('Error saving settings. Please try again.');
    }
  };

  return (
    <div className="settings-container">
      <h2>Admin Settings</h2>
      {saveStatus && <div className={`status-message ${saveStatus.includes('Error') ? 'error' : 'success'}`}>{saveStatus}</div>}
      
      <div className="settings-card">
        <h3>Company Details</h3>
        <form onSubmit={handleSubmit} className="settings-form">
          <div className="form-group">
            <label htmlFor="companyName">Company Name</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formValues.companyName}
              onChange={handleChange}
              placeholder="Enter company name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="adminEmail">Admin Email</label>
            <input
              type="email"
              id="adminEmail"
              name="adminEmail"
              value={formValues.adminEmail}
              onChange={handleChange}
              placeholder="Enter admin email"
              required
            />
          </div>
        </form>
      </div>

      <div className="settings-card">
        <h3>Notification Preferences</h3>
        <form onSubmit={handleSubmit} className="settings-form">
          <div className="form-group">
            <label htmlFor="notificationPreferences">Notification Preferences</label>
            <select
              id="notificationPreferences"
              name="notificationPreferences"
              value={formValues.notificationPreferences}
              onChange={handleChange}
            >
              <option value="email">Email</option>
              <option value="sms">SMS</option>
              <option value="none">None</option>
            </select>
          </div>
        </form>
      </div>

      <div className="settings-card">
        <h3>Change Password</h3>
        <form onSubmit={handleSubmit} className="settings-form">
          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              placeholder="Enter new password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formValues.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
            />
          </div>

          <button type="submit" className="submit-button">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
