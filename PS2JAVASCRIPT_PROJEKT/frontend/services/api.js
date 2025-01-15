// src/services/api.js
const API_URL = 'http://localhost:3000';

// Rejestracja u¿ytkownika
export const registerUser = async (name, password) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, password }),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Registration error');
        }
        return data;
    } catch (error) {
        console.error('Registration failed', error);
        throw error.message;
    }
};

// Logowanie u¿ytkownika
export const loginUser = async (name, password) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, password }),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Login error');
        }
        return data;
    } catch (error) {
        console.error('Login failed', error);
        throw error.message;
    }
};

// Pobieranie produktów
export const getProducts = async () => {
    try {
        const response = await fetch(`${API_URL}/products`);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Error fetching products');
        }
        return data;
    } catch (error) {
        console.error('Error fetching products', error);
        throw error.message;
    }
};

// Dodawanie produktu do koszyka
export const addToCart = async (userId, productId, quantity) => {
    try {
        const response = await fetch(`${API_URL}/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, productId, quantity }),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Error adding product to cart');
        }
        return data;
    } catch (error) {
        console.error('Error adding product to cart', error);
        throw error.message;
    }
};

// Pobieranie koszyka
export const getCart = async (userId) => {
    try {
        const response = await fetch(`${API_URL}/cart/${userId}`);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Error fetching cart');
        }
        return data;
    } catch (error) {
        console.error('Error fetching cart', error);
        throw error.message;
    }
};
