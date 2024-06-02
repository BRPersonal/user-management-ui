import React, { useState } from 'react';
import Select from 'react-select';
import { createRole } from '../services/Service';

const CreateRole = () => {
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState('');

    const handleRolesChange = (selectedOptions) => {
        setSelectedRoles(selectedOptions.map(option => option.value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createRole(selectedRoles);
            console.log('Response:', response); 
            if (response === "Roles creation was successful") {
                setMessage("Roles created!");
                setMessageColor('text-green-500');
            } else {
                setMessage(response);
                setMessageColor('text-red-500');
            }
        } catch (err) {
            console.error('Error:', err); 
            setMessage('Role creation failed!');
            setMessageColor('text-red-500');
        }
    };

    const roleOptions = [
        { value: 'ADMIN', label: 'ADMIN' },
        { value: 'USER', label: 'USER' },
        { value: 'PROJECT_SEEKER', label: 'PROJECT_SEEKER' },
        { value: 'PROJECT_ADVERTISER', label: 'PROJECT_ADVERTISER' }
    ];

    return (
        <div className="flex flex-col items-center px-10 pt-10 pb-20 bg-white shadow-md rounded-lg w-full max-w-md mx-auto my-5">
            <h2 className="text-2xl font-bold text-gray-800 mb-5">Create Role</h2>
            <form onSubmit={handleSubmit} className="w-full">
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roles">Roles</label>
                    <Select
                        isMulti
                        options={roleOptions}
                        onChange={handleRolesChange}
                        placeholder="Select roles"
                        className="mb-3"
                        closeMenuOnSelect={false}
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 text-white text-center bg-[#00AAFF] rounded hover:bg-blue-600"
                >
                    Create Roles
                </button>
            </form>
            {message && <p className={`mt-3 ${messageColor}`}>{message}</p>}
        </div>
    );
};

export default CreateRole;
