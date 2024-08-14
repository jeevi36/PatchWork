import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Signup from './Components/Signup/Signup';
import About from './Components/About/About';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import AdminLogin from './Components/AdminLogin/AdminLogin';
import Navbar from './Components/Navbar/Navbar';
import Service from './Components/Service/Service';
import Footer from './Components/Footer/Footer';
import Contact from './Components/Contact/Contact';
import Blog from './Components/Blog/Blog';
import Continue from './Components/Continue';
import Continue1 from './Components/Continue1';
import Continue2 from './Components/Continue2';
import BookingManagement from './Components/BookingManagement/BookingManagement';
import Payment from './Components/Payment/Payment';
import Readmore from './Components/Readmore';
import Readmore1 from './Components/Readmore1';
import Readmore2 from './Components/Readmore2';
import Technician from './Components/Technician/Technician';
<<<<<<< HEAD
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';

=======
>>>>>>> e84ea8e (Initial commit of my React Project)
import BookingCalendar from './Components/BookingCalendar/BookingCalendar';
import TimeSelection from './Components/TimeSelection/TimeSelection';
import './App.css';
import Dashboard from './Components/Dashboard/Dashboard';
<<<<<<< HEAD
=======
import Settings from './Components/Settings/Settings';
import TaskDashboard from './Components/TaskDashboard/TaskDashboard';



>>>>>>> e84ea8e (Initial commit of my React Project)

const AppContent = () => {
  const location = useLocation();
  
  // List of paths where the footer should not be displayed
<<<<<<< HEAD
  const hideFooterPaths = ['/login', '/signup', '/admindashboard', '/dashboard'];
=======

  
  const hideFooterPaths = ['/login', '/signup', '/admindashboard', '/dashboard', 'adminlogin', 'settings','bookingstatus','bookingdetails'];
>>>>>>> e84ea8e (Initial commit of my React Project)

  // Determine whether to show the footer
  const shouldShowFooter = !hideFooterPaths.includes(location.pathname);

<<<<<<< HEAD
=======
   // Define paths where the navbar should be hidden
   const hideNavbarPaths = [
    '/login',
    '/signup',
    '/admindashboard',
    '/dashboard',
    '/adminlogin',
    '/settings'
  ];

    // Determine whether to show the navbar
    const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

>>>>>>> e84ea8e (Initial commit of my React Project)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Routes>
<<<<<<< HEAD
=======
       
>>>>>>> e84ea8e (Initial commit of my React Project)
          <Route exact path='/' element={<Home />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/adminlogin' element={<AdminLogin />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/service' element={<Service />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route exact path='/blog' element={<Blog />} />
          <Route exact path='/continue' element={<Continue />} />
          <Route exact path='/continue1' element={<Continue1 />} />
          <Route exact path='/continue2' element={<Continue2 />} />
          <Route exact path='/payment' element={<Payment />} />
<<<<<<< HEAD
          <Route exact path='/admindashboard' element={<AdminDashboard />} />
=======
          
>>>>>>> e84ea8e (Initial commit of my React Project)
          <Route exact path='/bookingmanagement' element={<BookingManagement />} />
          <Route exact path='/readmore' element={<Readmore />} />
          <Route exact path='/readmore1' element={<Readmore1 />} />
          <Route exact path='/readmore2' element={<Readmore2 />} />
          <Route path="/technician" element={<Technician />} />
<<<<<<< HEAD
         
          <Route path="/bookingcalendar" element={<BookingCalendar />} />
          <Route path="/timeselection" element={<TimeSelection />} />
          <Route path="/dashboard" element={<Dashboard />} />
=======
          <Route path="/settings" element={<Settings />} />
          <Route path="/taskdashboard" element={<TaskDashboard />} />
          <Route path="/bookingcalendar" element={<BookingCalendar />} />
          <Route path="/timeselection" element={<TimeSelection />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
>>>>>>> e84ea8e (Initial commit of my React Project)
        </Routes>

        {/* Conditionally render the Footer */}
        {shouldShowFooter && <Footer />}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
