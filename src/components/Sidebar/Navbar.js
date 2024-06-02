import React, { useState, useEffect } from 'react';
import { FiMenu, FiX, FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Signout from '../auth/Signout';

function Navbar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const roles = JSON.parse(localStorage.getItem('roles'));
            console.log('Roles from localStorage:', roles);
            if (roles && Array.isArray(roles)) {
                setIsAdmin(roles.includes('ADMIN'));
            }
        } catch (error) {
            console.error('Error parsing roles from localStorage:', error);
        }
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleGoBack = () => {
        navigate('/AdminWelcome');
    };

    const handleNavigation = (path) => {
        navigate(path);
        setSidebarOpen(false);
    };

    return (
        <>
            {/* Navbar */}
            <nav className="flex justify-between items-center bg-blue-600 text-white p-4">
                <div className="navbar-left">
                    {/* Menu icon */}
                    <FiMenu className="text-white text-2xl cursor-pointer" onClick={toggleSidebar} />
                </div>
            </nav>

            {/* Sidebar container */}
            <div className={`fixed inset-0 flex items-start justify-start bg-blue-600 bg-opacity-75 transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} style={{ zIndex: 1000 }} onClick={toggleSidebar}>
                {/* Sidebar */}
                <div className={`transform transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} bg-white w-96 p-6 h-full overflow-y-auto flex flex-col`} style={{ zIndex: 1100 }}>
                    {/* Close and Back icons */}
                    <div className="flex justify-between mb-4">
                        <FiArrowLeft className="text-blue-600 text-2xl cursor-pointer" onClick={handleGoBack} />
                        <FiX className="text-blue-600 text-2xl cursor-pointer" onClick={toggleSidebar} />
                    </div>
                    {/* Sidebar content */}
                    <div>
                        {/* Sidebar menu */}
                        {isAdmin && (
                            <ul className="text-gray-800 flex-grow">
                                <li className="font-bold mb-4"></li>
                                <li className="py-2 border-b border-gray-200">
                                    <a onClick={() => handleNavigation('/create-role')} className="text-blue-600 hover:underline cursor-pointer">Create Role</a>
                                </li>
                                <li className="py-2 border-b border-gray-200">
                                    <a onClick={() => handleNavigation('/create-permission')} className="text-blue-600 hover:underline cursor-pointer">Create Permission</a>
                                </li>
                                <li className="py-2 border-b border-gray-200">
                                    <a onClick={() => handleNavigation('/assign-role')} className="text-blue-600 hover:underline cursor-pointer">Assign Role</a>
                                </li>
                                <li className="py-2">
                                    <a onClick={() => handleNavigation('/assign-permission')} className="text-blue-600 hover:underline cursor-pointer">Assign Permission</a>
                                </li>
                            </ul>
                        )}
                    </div>
                    {/* Signout button at the bottom */}
                    <div className="mt-auto">
                        <Signout />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;
