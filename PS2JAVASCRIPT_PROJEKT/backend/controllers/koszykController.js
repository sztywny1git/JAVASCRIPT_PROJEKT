const { Koszyk, ProduktKoszyk } = require('../models/koszyk');
const Produkt = require('../models/produkt');

// Dodawanie produktu do koszyka
exports.addProductToCart = async (req, res) => {
    const { uzytkownikId, produktId, ilosc } = req.body;

    try {
        // Sprawdzamy, czy koszyk istnieje dla tego u�ytkownika
        let koszyk = await Koszyk.findOne({ where: { uzytkownikId } });
        if (!koszyk) {
            koszyk = await Koszyk.create({ uzytkownikId });
        }

        // Dodajemy produkt do koszyka
        const istniej�cyProdukt = await ProduktKoszyk.findOne({
            where: {
                koszykId: koszyk.id,
                produktId: produktId,
            },
        });

        if (istniej�cyProdukt) {
            await istniej�cyProdukt.update({ ilosc: istniej�cyProdukt.ilosc + ilosc });
        } else {
            await ProduktKoszyk.create({ koszykId: koszyk.id, produktId, ilosc });
        }

        return res.status(200).json({ message: 'Produkt dodany do koszyka.' });
    } catch (err) {
        return res.status(500).json({ message: 'B��d serwera', error: err.message });
    }
};

// Usuwanie produktu z koszyka
exports.removeProductFromCart = async (req, res) => {
    const { uzytkownikId, produktId } = req.body;

    try {
        const koszyk = await Koszyk.findOne({ where: { uzytkownikId } });
        if (!koszyk) {
            return res.status(404).json({ message: 'Koszyk nie znaleziony.' });
        }

        // Usuwamy produkt z koszyka
        await ProduktKoszyk.destroy({
            where: {
                koszykId: koszyk.id,
                produktId: produktId,
            },
        });

        return res.status(200).json({ message: 'Produkt usuni�ty z koszyka.' });
    } catch (err) {
        return res.status(500).json({ message: 'B��d serwera', error: err.message });
    }
};

// Pobieranie koszyka u�ytkownika
exports.getCart = async (req, res) => {
    const { uzytkownikId } = req.params;

    try {
        const koszyk = await Koszyk.findOne({
            where: { uzytkownikId },
            include: {
                model: Produkt,
                through: { attributes: ['ilosc'] },
            },
        });

        if (!koszyk) {
            return res.status(404).json({ message: 'Koszyk nie znaleziony.' });
        }

        return res.status(200).json(koszyk);
    } catch (err) {
        return res.status(500).json({ message: 'B��d serwera', error: err.message });
    }
};
