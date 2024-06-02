import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { fetchAccessPermissions, assignRole } from '../services/Service';

const AssignRole = () => {
    const [email, setEmail] = useState('');
    const [roles, setRoles] = useState([]);
    const [existingRoles, setExistingRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState('');

    useEffect(() => {
        setExistingRoles([]);
    }, []);

    useEffect(() => {
        if (email) {
            fetchExistingRoles();
        }
    }, [email]);

    const fetchExistingRoles = async () => {
        setLoading(true);
        try {
            const response = await fetchAccessPermissions(email);
            setExistingRoles(response.roles.map(role => role));
        } catch (err) {
            console.error('Error fetching existing roles:', err);
            setExistingRoles([]);
        }
        setLoading(false);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleRolesChange = (selectedOptions) => {
        setRoles(selectedOptions.map(option => option.value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await assignRole(email, roles);
            if (response=== "Roles assignment was successful") {
                setMessage("Roles assigned!");
                setMessageColor('text-green-500');
            } else {
                setMessage(response);
                setMessageColor('text-red-500');
            }
        } catch (err) {
            setMessage('Role assignment failed!');
            setMessageColor('text-red-500');
        }
    };

    const roleOptions = [
        { value: 'ADMIN', label: 'ADMIN' },
        { value: 'USER', label: 'USER' },
        { value: 'PROJECT_ADVERTISER', label: 'PROJECT_ADVERTISER' },
        { value: 'PROJECT_SEEKER', label: 'PROJECT_SEEKER' }
    ];

    // Filter out existing roles from available roles
    const availableRoles = roleOptions.filter(role => !existingRoles.includes(role.value));

    return (
        <div className="flex flex-col items-center px-10 pt-10 pb-20 bg-white shadow-md rounded-lg w-full max-w-md mx-auto my-5">
            <h2 className="text-2xl font-bold text-gray-800 mb-5">Assign Role</h2>
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
                    <p className="font-bold text-gray-800 mb-2">Existing Roles:</p>
                    <div className="border rounded p-2 max-h-40 overflow-auto">
                        {loading ? (
                            <FontAwesomeIcon icon={faSpinner} className="text-gray-600 animate-spin" />
                        ) : (
                            <div className="text-gray-600">
                                {!email ? (
                                    <div className="text-gray-400">Fetching existing roles...</div>
                                ) : existingRoles.length === 0 ? (
                                    <div className="text-gray-600">No existing roles</div>
                                ) : (
                                    existingRoles.map((role, index) => (
                                        <div key={index} className="mb-1">
                                            {role}
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <Select
                    isMulti
                    options={availableRoles}
                    onChange={handleRolesChange}
                    placeholder="Select roles"
                    className="mb-6"
                    closeMenuOnSelect={false}
                />
                <button
                    type="submit"
                    className="px-4 py-2 text-white text-center bg-[#00AAFF] rounded hover:bg-blue-600"
                >
                    Assign Roles
                </button>
            </form>
            {message && <p className={`mt-3 ${messageColor}`}>{message}</p>}
        </div>
    );
};

export default AssignRole;
