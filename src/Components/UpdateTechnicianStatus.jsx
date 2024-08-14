import axios from 'axios';
import React, { useState } from 'react';
import './UpdateTechnicianStatus.css';
const UpdateTechnicianStatus = ({ technicianId }) => {
    const [status, setStatus] = useState('');
    const [notes, setNotes] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const statusUpdate = { technicianId, status, notes };

        axios.post('/api/status/update', statusUpdate)
            .then(response => alert('Status updated successfully!'))
            .catch(error => console.error('Error updating status:', error));
    };

    return (
        <form className="update-technician-status" onSubmit={handleSubmit}>
    <h3>Update Technician Status</h3>
    <label>
        Status:
        <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} required />
    </label>
    <label>
        Notes:
        <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} />
    </label>
    <button type="submit">Update Status</button>
</form>

    );
};

export default UpdateTechnicianStatus;
