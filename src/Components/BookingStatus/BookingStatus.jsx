import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BookingStatus.css'; // Import your CSS file

const BookingStatus = ({ userId }) => {
    const [bookings, setBookings] = useState([
        { id: 1, serviceType: 'Repair', status: 'Pending' },
        { id: 2, serviceType: 'Installation', status: 'In Progress' }
    ]);
    

    useEffect(() => {
        axios.get(`/api/bookings/${userId}`)
            .then(response => {
                if (response.data) {
                    setBookings(response.data);
                } else {
                    console.warn('No bookings found');
                }
            })
            .catch(error => console.error('Error fetching bookings:', error));
    }, [userId]);
    

    const handleStatusChange = (bookingId, newStatus) => {
        axios.put(`/api/bookings/${bookingId}`, newStatus, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            // Update the status locally
            setBookings(prevBookings => prevBookings.map(booking => 
                booking.id === bookingId ? { ...booking, status: newStatus } : booking
            ));
        })
        .catch(error => console.error('Error updating booking status:', error));
    };

    return (
        <div className="booking-status-container">
            <h2>Your Bookings</h2>
            <ul className="booking-list">
                {bookings.map(booking => (
                    <li key={booking.id}>
                        <p>Service: {booking.serviceType}</p>
                        <p>Status: {booking.status}</p>
                        <select 
                            value={booking.status} 
                            onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                        >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookingStatus;
