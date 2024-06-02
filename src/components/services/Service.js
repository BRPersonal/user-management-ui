// Service.js
import axios from 'axios';

const API_URL_8080 = 'http://localhost:8080';

const getToken = () => {
    return localStorage.getItem('token');
};

// Authentication Endpoints
export const signin = async (email, password) => {
    const response = await axios.post(`${API_URL_8080}/auth/signin`, {
        email,
        password
    });
    return response.data;
};

export const signup = async (formData) => {
    const response = await axios.post(`${API_URL_8080}/auth/signup`, formData);
    return response.data;
};

export const signout = async (token) => {
    await axios.post(`${API_URL_8080}/auth/signout`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

// Role and Permission Endpoints
export const fetchAccessPermissions = async (email) => {
    const response = await axios.post(
        `${API_URL_8080}/admin/accesspermission`, 
        { email }, 
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );
    return response.data;
};

export const assignRole = async (email, roles) => {
    const response = await axios.post(
        `${API_URL_8080}/admin/assignrole`,
        { email, roles },
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );
    return response.data;
};

export const assignPermission = async (email, permissions) => {
    const response = await axios.post(
        `${API_URL_8080}/admin/assignpermission`,
        { email, permissions },
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );
    return response.data;
};

export const createRole = async (roles) => {
    const response = await axios.post(
        `${API_URL_8080}/admin/createrole`,
        { roles },
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );
    return response.data;
};

export const createPermission = async (permissions) => {
    const response = await axios.post(
        `${API_URL_8080}/admin/createpermission`,
        { permissions },
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );
    return response.data;
};


