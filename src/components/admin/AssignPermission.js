import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { fetchAccessPermissions, assignPermission } from '../services/Service';

const AssignPermission = () => {
    const [email, setEmail] = useState('');
    const [permissions, setPermissions] = useState([]);
    const [existingPermissions, setExistingPermissions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState('');

    useEffect(() => {
        setExistingPermissions([]);
    }, []);

    useEffect(() => {
        if (email) {
            fetchExistingPermissions();
        }
    }, [email]);

    const fetchExistingPermissions = async () => {
        setLoading(true);
        try {
            const response = await fetchAccessPermissions(email);
            setExistingPermissions(response.permissions.map(permission => permission));
        } catch (err) {
            console.error('Error fetching existing permissions:', err);
            setExistingPermissions([]);
        }
        setLoading(false);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePermissionsChange = (selectedOptions) => {
        setPermissions(selectedOptions.map(option => option.value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await assignPermission(email, permissions);
            if (response === "Permissions assignment was successful") {
                setMessage("Permissions assigned!");
                setMessageColor('text-green-500');
            } else {
                setMessage(response);
                setMessageColor('text-red-500');
            }
        } catch (err) {
            setMessage('Permission assignment failed!');
            setMessageColor('text-red-500');
        }
    };

    const permissionOptions = [
        { value: 'CREATE', label: 'CREATE' },
        { value: 'UPDATE', label: 'UPDATE' },
        { value: 'DELETE', label: 'DELETE' },
        { value: 'READ', label: 'READ' },
    ];

    // Filter out existing permissions from available permissions
    const availablePermissions = permissionOptions.filter(permission => !existingPermissions.includes(permission.value));

    return (
        <div className="flex flex-col items-center px-10 pt-10 pb-20 bg-white shadow-md rounded-lg w-full max-w-md mx-auto my-5">
            <h2 className="text-2xl font-bold text-gray-800 mb-5">Assign Permission</h2>
            <form onSubmit={handleSubmit} className="w-full">
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                        className="p-2 border rounded focus:outline-none focus:border-blue-500 w-full"
                    />
                </div>
                <div className="mb-6">
                    <p className="font-bold text-gray-800 mb-2">Existing Permissions:</p>
                    <div className="border rounded p-2 max-h-40 overflow-auto">
                        {loading ? (
                            <FontAwesomeIcon icon={faSpinner} className="text-gray-600 animate-spin" />
                        ) : (
                            <div className="text-gray-600">
                                {!email ? (
                                    <div className="text-gray-400">Fetching existing permissions...</div>
                                ) : existingPermissions.length === 0 ? (
                                    <div className="text-gray-600">No existing permissions</div>
                                ) : (
                                    existingPermissions.map((permission, index) => (
                                        <div key={index} className="mb-1">
                                            {permission}
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <Select
                    isMulti
                    options={availablePermissions}
                    onChange={handlePermissionsChange}
                    placeholder="Select permissions"
                    className="mb-6"
                    closeMenuOnSelect={false}
                />
                <button
                    type="submit"
                    className="px-4 py-2 text-white text-center bg-[#00AAFF] rounded hover:bg-blue-600"
                >
                    Assign Permissions
                </button>
            </form>
            {message && <p className={`mt-3 ${messageColor}`}>{message}</p>}
        </div>
    );
};

export default AssignPermission;
