const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Rejestracja u�ytkownika
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Sprawd�, czy u�ytkownik ju� istnieje
        const existingUser = await User.findOne({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Email ju� istnieje.' });
        }

        // Hashowanie has�a przed zapisaniem w bazie
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tworzenie nowego u�ytkownika
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({ message: 'Rejestracja zako�czona sukcesem', user: newUser });
    } catch (err) {
        return res.status(500).json({ message: 'B��d serwera', error: err.message });
    }
};

// Logowanie u�ytkownika
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Sprawd�, czy u�ytkownik istnieje
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'U�ytkownik nie znaleziony.' });
        }

        // Sprawdzenie poprawno�ci has�a
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({ message: 'Niepoprawne has�o.' });
        }

        // Generowanie tokenu JWT
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            'secretKey', // Mo�esz zmieni� na sw�j sekret
            { expiresIn: '1h' } // Czas wyga�ni�cia tokenu (1 godzina)
        );

        return res.status(200).json({
            message: 'Logowanie zako�czone sukcesem.',
            token,
        });
    } catch (err) {
        return res.status(500).json({ message: 'B��d serwera', error: err.message });
    }
};
