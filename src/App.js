import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import SignUp from './components/auth/SignUp';
import Signin from './components/auth/Signin';
import AdminDashboard from './components/admin/AdminDashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminWelcome from './components/admin/AdminWelcome';
import UserWelcome from './components/admin/UserWelcome';
import CreateRole from './components/admin/CreateRole';
import CreatePermission from './components/admin/CreatePermission';
import AssignRole from './components/admin/AssignRole';
import AssignPermission from './components/admin/AssignPermission';
import Navbar from './components/Sidebar/Navbar';

const NavbarContainer = () => {
    const location = useLocation();
    const shouldRenderNavbar = !['/', '/signup'].includes(location.pathname);

    return shouldRenderNavbar ? <Navbar /> : null;
};

const App = () => {
    const [isSignUp, setIsSignUp] = useState(false);

    const toggleForm = () => {
        setIsSignUp(!isSignUp);
    };

    return (
        <Router>
            <div className="App flex flex-col h-screen">
                <NavbarContainer />
                <div className="flex justify-center items-center flex-grow bg-gradient-to-b from-blue-200 to-gray-200">
                    <Routes>
                        <Route path="/" element={isSignUp ? <SignUp toggleForm={toggleForm} /> : <Signin toggleForm={toggleForm} />} />
                        <Route path="/dashboard" element={<ProtectedRoute roles={['user']}><UserWelcome /></ProtectedRoute>} />
                        <Route path="/admin" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
                        <Route path="/UserWelcome" element={<ProtectedRoute roles={['user']}><UserWelcome /></ProtectedRoute>} />
                        <Route path="/AdminWelcome" element={<ProtectedRoute roles={['admin']}><AdminWelcome /></ProtectedRoute>} />
                        <Route path="/create-role" element={<ProtectedRoute roles={['admin']}><CreateRole /></ProtectedRoute>} />
                        <Route path="/create-permission" element={<ProtectedRoute roles={['admin']}><CreatePermission /></ProtectedRoute>} />
                        <Route path="/assign-role" element={<ProtectedRoute roles={['admin']}><AssignRole /></ProtectedRoute>} />
                        <Route path="/assign-permission" element={<ProtectedRoute roles={['admin']}><AssignPermission /></ProtectedRoute>} />
                        
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
