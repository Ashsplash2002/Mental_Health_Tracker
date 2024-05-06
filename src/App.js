import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from './UserContext'; // Import the UserProvider component

import CustomNavbar from './components/navbar';
import Login from './components/login';
import SignUp from './components/signup';
import ForgotPassword from './components/forgot_password';
import CreateDisorder from './components/add_disorder';
import ChangeDisorder from './components/change_disorder';
import Dashboard from './components/dashboard';
import Intensity from './components/intensity';
import DisorderList from './components/disorder_list';
import UpdateDisorder from './components/update_disorder'; // Import UpdateDisorder component
import DeleteDisorder from './components/delete_disorder'; // Import DeleteDisorder component

// Custom component to conditionally render the navbar
function RenderNavbar() {
  // Custom hook to get the current location
  const location = useLocation();
  
  // Check if the current location is '/'
  const isRoot = location.pathname === '/';

  // Render the navbar only if the current location is not '/'
  return !isRoot ? <CustomNavbar /> : null;
}

function App() {
  return (
    <UserProvider> {/* Wrap the entire application with UserProvider */}
      <Router>
        <div className="container">
          <RenderNavbar /> {/* Render the navbar conditionally */}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/edit/:id" element={<ChangeDisorder />} />
            <Route path="/create" element={<CreateDisorder />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/intensity" element={<Intensity />} />
            <Route path="/disorder-list" element={<DisorderList />} />
            <Route path="/update/:id" element={<UpdateDisorder />} /> {/* Route for updating disorder */}
            <Route path="/delete/:id" element={<DeleteDisorder />} /> {/* Route for deleting disorder */}
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
