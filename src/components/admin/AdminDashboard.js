import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center space-y-4 p-8 bg-white shadow-lg rounded-lg w-full max-w-md mx-auto my-5">
            <h2 className="text-2xl font-bold text-gray-800 mb-5">Admin Dashboard</h2>
            <button
                onClick={() => navigate('/create-role')}
                className="w-full h-12 p-3 text-white bg-[#00AAFF] rounded hover:bg-blue-600 transition-transform transform hover:scale-105"
            >
                Create Role
            </button>
            <button
                onClick={() => navigate('/create-permission')}
                className="w-full h-12 p-3 text-white bg-[#00AAFF] rounded hover:bg-blue-600 transition-transform transform hover:scale-105"
            >
                Create Permission
            </button>
            <button
                onClick={() => navigate('/assign-role')}
                className="w-full h-12 p-3 text-white bg-[#00AAFF] rounded hover:bg-blue-600 transition-transform transform hover:scale-105"
            >
                Assign Role
            </button>
            <button
                onClick={() => navigate('/assign-permission')}
                className="w-full h-12 p-3 text-white bg-[#00AAFF] rounded hover:bg-blue-600 transition-transform transform hover:scale-105"
            >
                Assign Permission
            </button>
        </div>
    );
};

export default AdminDashboard;
