import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BookingManagement.css'; // Add your styling

const BookingManagement = () => {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [bookingSearchTerm, setBookingSearchTerm] = useState('');
    const [editingBookingId, setEditingBookingId] = useState(null);
    const [editingBookingData, setEditingBookingData] = useState({ service: '', status: '' });

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await axios.get('/api/bookings', {
                params: { search: bookingSearchTerm }
            });
            setBookings(response.data);
            setFilteredBookings(response.data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    const handleSearch = (e) => {
        setBookingSearchTerm(e.target.value);
        fetchBookings();
    };

    const handleEditBooking = async (id) => {
        const booking = bookings.find(b => b.id === id);
        setEditingBookingData({ service: booking.service, status: booking.status });
        setEditingBookingId(id);
    };

    const handleSaveBooking = async () => {
        try {
            await axios.put(`/api/bookings/${editingBookingId}`, editingBookingData);
            fetchBookings();
            setEditingBookingId(null);
        } catch (error) {
            console.error('Error saving booking:', error);
        }
    };

    const handleAssignServiceman = async (bookingId, servicemanId) => {
        try {
            await axios.post(`/api/bookings/${bookingId}/assign`, null, {
                params: { servicemanId }
            });
            fetchBookings();
        } catch (error) {
            console.error('Error assigning serviceman:', error);
        }
    };

    return (
        <div>
            <h2 className='h2'>Booking Requests</h2>
            <input
                type="text"
                placeholder="Search Bookings..."
                value={bookingSearchTerm}
                onChange={handleSearch}
                className="search-input"
            />
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Service</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBookings.map(booking => (
                        <tr key={booking.id}>
                            <td>{booking.id}</td>
                            <td>{booking.user.name}</td>
                            <td>{booking.service}</td>
                            <td>{booking.status}</td>
                            <td>
                                <button className="edit-button" onClick={() => handleEditBooking(booking.id)}>Edit</button>
                                <button className="assign-button" onClick={() => handleAssignServiceman(booking.id, 1)}>Assign Serviceman</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editingBookingId && (
                <div className="edit-form">
                    <h3>Edit Booking</h3>
                    <input
                        type="text"
                        placeholder="Service"
                        name="service"
                        value={editingBookingData.service}
                        onChange={(e) => setEditingBookingData({ ...editingBookingData, service: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Status"
                        name="status"
                        value={editingBookingData.status}
                        onChange={(e) => setEditingBookingData({ ...editingBookingData, status: e.target.value })}
                        required
                    />
                    <button onClick={handleSaveBooking}>Save</button>
                    <button onClick={() => setEditingBookingId(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default BookingManagement;
