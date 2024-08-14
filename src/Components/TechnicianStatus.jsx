import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './TechnicianStatus.css';
const TechnicianStatus = ({ technicianId }) => {
    const [status, setStatus] = useState(null);

    useEffect(() => {
        axios.get(`/api/status/${technicianId}`)
            .then(response => setStatus(response.data))
            .catch(error => console.error("Error fetching status:", error));
    }, [technicianId]);

    if (!status) {
        return <div>Loading status...</div>;
    }

    return (
        <div className="technician-status">
    <h3>Technician Status</h3>
    <p>Status: {status.status}</p>
    {status.notes && <p>Notes: {status.notes}</p>}
</div>

    );
};

export default TechnicianStatus;
