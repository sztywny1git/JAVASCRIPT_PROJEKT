// src/services/api.js
const API_URL = 'http://localhost:3000';

// Rejestracja u¿ytkownika
export const registerUser = async (nazwa, haslo) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nazwa, haslo }),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'B³¹d rejestracji');
        }
        return data;
    } catch (error) {
        console.error('Rejestracja nieudana', error);
        throw error.message;
    }
};

// Logowanie u¿ytkownika
export const loginUser = async (nazwa, haslo) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nazwa, haslo }),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'B³¹d logowania');
        }
        return data;
    } catch (error) {
        console.error('Logowanie nieudane', error);
        throw error.message;
    }
};

// Pobieranie produktów
export const getProducts = async () => {
    try {
        const response = await fetch(`${API_URL}/produkty`);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'B³¹d podczas pobierania produktów');
        }
        return data;
    } catch (error) {
        console.error('B³¹d podczas pobierania produktów', error);
        throw error.message;
    }
};

// Dodawanie produktu do koszyka
export const addToCart = async (uzytkownikId, produktId, ilosc) => {
    try {
        const response = await fetch(`${API_URL}/koszyk`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uzytkownikId, produktId, ilosc }),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'B³¹d podczas dodawania produktu do koszyka');
        }
        return data;
    } catch (error) {
        console.error('B³¹d podczas dodawania produktu do koszyka', error);
        throw error.message;
    }
};

// Pobieranie koszyka
export const getCart = async (uzytkownikId) => {
    try {
        const response = await fetch(`${API_URL}/koszyk/${uzytkownikId}`);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'B³¹d podczas pobierania koszyka');
        }
        return data;
    } catch (error) {
        console.error('B³¹d podczas pobierania koszyka', error);
        throw error.message;
    }
};
