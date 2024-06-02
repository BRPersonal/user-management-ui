import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { signout } from '../services/Service';

const Signout = () => {
    const navigate = useNavigate();
    const location = useLocation();

 

    const handleSignout = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                await signout(token);
                localStorage.removeItem('token');
                localStorage.removeItem('roles');
                localStorage.removeItem('permissions');
                navigate('/'); 
            } catch (err) {
                console.error('Signout error:', err);
            }
        }
    };

    return (
        <button onClick={handleSignout} className={`p-3 mr-10 text-white bg-red-500 rounded hover:bg-red-600`}>
            Sign Out
        </button>
    );
};

export default Signout;
