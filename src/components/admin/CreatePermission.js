import React, { useState } from 'react';
import Select from 'react-select';
import { createPermission } from '../services/Service';

const CreatePermission = () => {
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState('');

    const handlePermissionsChange = (selectedOptions) => {
        setSelectedPermissions(selectedOptions.map(option => option.value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createPermission(selectedPermissions);
            console.log('Response:', response); // Log the response to check its structure
            if (response === "Permissions creation was successful" ) {
                setMessage("Permissions created!");
                setMessageColor('text-green-500');
            } else {
                setMessage(response);
                setMessageColor('text-red-500');
            }
        } catch (err) {
            console.error('Error:', err); // Log any errors for debugging
            setMessage('Permission creation failed!');
            setMessageColor('text-red-500');
        }
    };

    const permissionOptions = [
        { value: 'CREATE', label: 'CREATE' },
        { value: 'READ', label: 'READ' },
        { value: 'UPDATE', label: 'UPDATE' },
        { value: 'DELETE', label: 'DELETE' }
    ];

    return (
        <div className="flex flex-col items-center px-10 pt-10 pb-20 bg-white shadow-md rounded-lg w-full max-w-md mx-auto my-5">
            <h2 className="text-2xl font-bold text-gray-800 mb-5">Create Permission</h2>
            <form onSubmit={handleSubmit} className="w-full">
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="permissions">Permissions</label>
                    <Select
                        isMulti
                        options={permissionOptions}
                        onChange={handlePermissionsChange}
                        placeholder="Select permissions"
                        className="mb-3"
                        closeMenuOnSelect={false}
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 text-white text-center bg-[#00AAFF] rounded hover:bg-blue-600"
                >
                    Create Permissions
                </button>
            </form>
            {message && <p className={`mt-3 ${messageColor}`}>{message}</p>}
        </div>
    );
};

export default CreatePermission;
