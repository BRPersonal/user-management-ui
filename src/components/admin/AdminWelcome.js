import React, { useState } from 'react';

const AdminWelcome = () => {
    const token = localStorage.getItem('token');
    const firstName = localStorage.getItem('firstName'); 
    const [copied, setCopied] = useState(false);

    const handleCopyToken = () => {
        navigator.clipboard.writeText(token);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); 
    };

    let welcomeMessage = `Welcome ${firstName}!`; 

    return (
        <div className="flex justify-center items-center">
            <div className="flex flex-col items-center space-y-6 p-10 bg-white shadow-lg rounded-lg w-full max-w-2xl mx-auto my-5">
                <p className="text-2xl text-gray-700 font-bold text-center">{welcomeMessage}</p>
                
                {/* {roles && roles.includes('ADMIN') && (
                    <p className="mt-3">
                        <Link to="/admin" className="text-xl text-blue-500 font-bold underline hover:text-blue-700">
                            Admin Dashboard
                        </Link>
                    </p>
                )} */}
            </div>
        </div>
    );
};

export default AdminWelcome;
