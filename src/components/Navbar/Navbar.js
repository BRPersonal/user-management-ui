// components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import Signout from '../auth/Signout';

const Navbar = () => {
    return (
        <nav className="w-full bg-blue-500 p-4 flex justify-between items-center">
            <div className="text-white text-lg font-bold">
                <Link to="/">MyApp</Link>
            </div>
            <div>
                <Signout />
            </div>
        </nav>
    );
};

export default Navbar;
