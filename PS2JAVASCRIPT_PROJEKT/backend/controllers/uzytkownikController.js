const Produkt = require('../models/produkt');

// Pobieranie wszystkich produkt�w
exports.getProducts = async (req, res) => {
    try {
        const produkty = await Produkt.findAll();
        return res.json(produkty);
    } catch (err) {
        return res.status(500).json({ message: 'B��d serwera', error: err.message });
    }
};
