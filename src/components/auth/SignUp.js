import React, { useState } from 'react';
import { signup } from '../services/Service';

const SignUp = ({ toggleForm }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await signup(formData);
            setMessage(response.message);
            toggleForm(); // Optionally redirect to sign-in after successful sign-up
        } catch (err) {
            setMessage(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="flex flex-col items-center p-8 bg-white shadow-lg rounded-lg w-80 mx-auto my-5">
            <h2 className="text-2xl font-bold text-gray-800 mb-5">Sign Up</h2>
            <form onSubmit={handleSubmit} className="flex flex-col w-full">
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="p-3 mb-3 border rounded focus:outline-none focus:border-blue-500"
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="p-3 mb-3 border rounded focus:outline-none focus:border-blue-500"
                />
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
                    Sign Up
                </button>
            </form>
            {message && <p className="mt-3 text-red-500">{message}</p>}
            <p className="mt-3 text-gray-700">
                Already have an account? <button onClick={toggleForm} className="text-blue-500 font-bold underline hover:text-blue-700">Sign In</button>
            </p>
        </div>
    );
};

export default SignUp;
