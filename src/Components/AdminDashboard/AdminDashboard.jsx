import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';
import axios from 'axios';

const AdminDashboard = () => {
    const [serviceRequests, setServiceRequests] = useState([]);
    const [activeSection, setActiveSection] = useState('overview');
    const [technicians, setTechnicians] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [servicemen, setServicemen] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userSearchTerm, setUserSearchTerm] = useState('');
    const [servicemanSearchTerm, setServicemanSearchTerm] = useState('');
    const [bookingSearchTerm, setBookingSearchTerm] = useState('');
    const [editingServicemanId, setEditingServicemanId] = useState(null);
    const [editingServicemanData, setEditingServicemanData] = useState({ name: '', serviceType: '', status: '' });
    const [editingBookingId, setEditingBookingId] = useState(null);
    const [editingBookingData, setEditingBookingData] = useState({ service: '', status: '' });
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        address: ''
    });

    useEffect(() => {
        axios.get('/api/service-requests/all')
            .then(response => setServiceRequests(response.data))
            .catch(error => console.error('Error fetching service requests:', error));
    }, []);

    useEffect(() => {
        const dummyUsers = [
            // Dummy data if necessary
        ];

        const dummyServicemen = [
            { id: 1, name: 'Mike Johnson', serviceType: 'Electrician', status: 'Available' },
            { id: 2, name: 'Emily Davis', serviceType: 'Plumber', status: 'Busy' }
        ];

        const dummyBookings = [
            { id: 1, user: { name: 'John Doe' }, service: 'Electrical Repair', status: 'Pending', assignedServiceman: null },
            { id: 2, user: { name: 'Jane Smith' }, service: 'Plumbing Service', status: 'Pending', assignedServiceman: null }
        ];

        setTimeout(() => {
            setUsers(dummyUsers);
            setServicemen(dummyServicemen);
            setBookings(dummyBookings);
            setLoading(false);
        }, 1000); 
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersRes, servicemenRes, bookingsRes, techniciansRes] = await Promise.all([
                    fetch('/api/users'),
                    fetch('/api/servicemen'),
                    fetch('/api/bookings'),
                    fetch('/api/technicians')
                ]);

                if (usersRes.ok && servicemenRes.ok && bookingsRes.ok && techniciansRes.ok) {
                    const [usersData, servicemenData, bookingsData, techniciansData] = await Promise.all([
                        usersRes.json(),
                        servicemenRes.json(),
                        bookingsRes.json(),
                        techniciansRes.json()
                    ]);

                    setUsers(usersData);
                    setServicemen(servicemenData);
                    setBookings(bookingsData);
                    setTechnicians(techniciansData);
                    setLoading(false);
                } else {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/technicians', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to add technician');
            }

            const techniciansRes = await fetch('/api/technicians');
            if (techniciansRes.ok) {
                const techniciansData = await techniciansRes.json();
                setTechnicians(techniciansData);
            } else {
                throw new Error('Failed to fetch updated technicians');
            }

            setFormData({
                name: '',
                phoneNumber: '',
                email: '',
                address: ''
            });
        } catch (error) {
            console.error('Error adding technician:', error);
        }
    };

    const handleDeleteUser = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    const handleDeleteServiceman = (id) => {
        setServicemen(servicemen.filter(serviceman => serviceman.id !== id));
    };

    const handleDeleteTechnician = (id) => {
        setTechnicians(technicians.filter(technician => technician.id !== id));
    };

    const handleAssignServiceman = (bookingId, servicemanId) => {
        setBookings(bookings.map(booking =>
            booking.id === bookingId ? { ...booking, assignedServiceman: servicemanId } : booking
        ));
    };

    const handleEditServiceman = (id) => {
        const servicemanToEdit = servicemen.find(serviceman => serviceman.id === id);
        setEditingServicemanId(id);
        setEditingServicemanData({ ...servicemanToEdit });
    };

    const handleSaveServiceman = () => {
        setServicemen(servicemen.map(serviceman =>
            serviceman.id === editingServicemanId ? { ...editingServicemanData, id: editingServicemanId } : serviceman
        ));
        setEditingServicemanId(null);
        setEditingServicemanData({ name: '', serviceType: '', status: '' });
    };

    const handleEditBooking = (id) => {
        const bookingToEdit = bookings.find(booking => booking.id === id);
        setEditingBookingId(id);
        setEditingBookingData({ service: bookingToEdit.service, status: bookingToEdit.status });
    };

    const handleSaveBooking = () => {
        setBookings(bookings.map(booking =>
            booking.id === editingBookingId ? { ...booking, ...editingBookingData } : booking
        ));
        setEditingBookingId(null);
        setEditingBookingData({ service: '', status: '' });
    };

    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(userSearchTerm.toLowerCase()));
    const filteredServicemen = servicemen.filter(serviceman => serviceman.name.toLowerCase().includes(servicemanSearchTerm.toLowerCase()));
    const filteredBookings = bookings.filter(booking => booking.user.name.toLowerCase().includes(bookingSearchTerm.toLowerCase()));

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="admin-dashboard">
            <div className="sidebars">
                <h2>Admin Dashboard</h2>
                <div className="dropdown">
                    <button className="dropbtn">Dashboard</button>
                    <div className="dropdown-content">
                        <a href="/dashboard" onClick={() => setActiveSection('overview')}>Admin Dashboard</a>
                        <a href="#" onClick={() => setActiveSection('users')}>User Details</a>
                        <a href="#" onClick={() => setActiveSection('userRecords')}>User Records</a>
                        <a href="#" onClick={() => setActiveSection('technicians')}>Technician Details</a>
                        <a href="#" onClick={() => setActiveSection('technicianRecords')}>Technician Records</a>
                        <a href="#" onClick={() => setActiveSection('bookings')}>Booking Management</a>
                    </div>
                </div>
            </div>
            <div className="main-content">
                {activeSection === 'users' && (
                    <div>
                        <h2 className="h2">User Service Records</h2>
                        <input
                            type="text"
                            placeholder="Search Users..."
                            value={userSearchTerm}
                            onChange={(e) => setUserSearchTerm(e.target.value)}
                            className="search-input"
                        />
                        <table>
                            <thead>
                                <tr>
                                <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Service Type</th>
                        <th>Date & Time</th>
                        <th>Technician ID</th>
                                </tr>
                            </thead>
                            <tbody>
                            {serviceRequests.map(request => (
                        <tr key={request.id}>
                            <td>{request.id}</td>
                            <td>{request.name}</td>
                            <td>{request.email}</td>
                            <td>{request.phone}</td>
                            <td>{request.serviceType}</td>
                            <td>{request.dateTime}</td>
                            <td>{request.technicianId}</td>
                        </tr>
                    ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeSection === 'userRecords' && (
                    <div>
                        <h2>User Records</h2>
                        {/* User records table */}
                    </div>
                )}

                {activeSection === 'technicians' && (
                    <div>
                        <h2>Technician Details</h2>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Phone Number:</label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Address:</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit">Add Technician</button>
                        </form>
                    </div>
                )}

                {activeSection === 'technicianRecords' && (
                    <div>
                        <h2>Technician Records</h2>
                        {/* Technician records table */}
                    </div>
                )}

                {activeSection === 'bookings' && (
                    <div>
                        <h2>Booking Management</h2>
                        <input
                            type="text"
                            placeholder="Search Bookings..."
                            value={bookingSearchTerm}
                            onChange={(e) => setBookingSearchTerm(e.target.value)}
                            className="search-input"
                        />
                        <table>
                            <thead>
                                <tr>
                                    <th>Booking ID</th>
                                    <th>User Name</th>
                                    <th>Service</th>
                                    <th>Status</th>
                                    <th>Assigned Serviceman</th>
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
                                        <td>{booking.assignedServiceman ? booking.assignedServiceman : 'Unassigned'}</td>
                                        <td>
                                            <button onClick={() => handleAssignServiceman(booking.id, /* Assign serviceman logic */)}>Assign</button>
                                            <button onClick={() => handleEditBooking(booking.id)}>Edit</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
