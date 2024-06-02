import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signin } from '../services/Service';

const Signin = ({ toggleForm }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting form with data:', formData);
        try {
            const response = await signin(formData.email, formData.password);
            console.log('Signin response:', response);
            localStorage.setItem('firstName',response.firstName);
            localStorage.setItem('token', response.token);
            localStorage.setItem('roles', JSON.stringify(response.roles));
            localStorage.setItem('permissions', JSON.stringify(response.permissions));

            // Retrieve roles from local storage
            const roles = JSON.parse(localStorage.getItem('roles'));

            // Navigate based on roles
            if (roles && roles.includes('ADMIN')) {
                console.log('Navigating to /AdminWelcome');
                navigate('/AdminWelcome');
            } else {
                console.log('Navigating to /UserWelcome');
                navigate('/UserWelcome');
            }

            // Display success message
            setMessage({ text: 'Login successful', color: 'text-green-500' });
        } catch (err) {
            console.log('Signin error:', err);
            // Display error message
            setMessage({ text: err.response?.data?.message || 'Login failed', color: 'text-red-500' });
        }
    };

    return (
        <div className="flex flex-col items-center p-8 bg-white shadow-lg rounded-lg w-80 mx-auto my-5">
            <h2 className="text-2xl font-bold text-gray-800 mb-5">Sign In</h2>
            <form onSubmit={handleSubmit} className="flex flex-col w-full">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="p-3 mb-3 border rounded focus:outline-none focus:border-blue-500"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="p-3 mb-3 border rounded focus:outline-none focus:border-blue-500"
                />
                <button
                    type="submit"
                    className="p-3 text-white bg-[#00AAFF] rounded hover:bg-blue-600"
                >
                    Sign In
                </button>
            </form>
            <p className={`mt-3 ${message.color || ''}`}>{message.text}</p>
            <p className="mt-3 text-gray-700">
                Don't have an account? <button onClick={toggleForm} className="text-blue-500 font-bold underline hover:text-blue-700">Sign Up</button>
            </p>
        </div>
    );
};

export default Signin;
