// models/koszyk.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Uzytkownik = require('./uzytkownik');
const Produkt = require('./produkt');

// Tworzymy model Koszyk
const Koszyk = sequelize.define('Koszyk', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
});

// Relacje
Koszyk.belongsTo(Uzytkownik, { foreignKey: 'uzytkownikId' });
Uzytkownik.hasMany(Koszyk, { foreignKey: 'uzytkownikId' });

const ProduktKoszyk = sequelize.define('ProduktKoszyk', {
    ilosc: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
});

// Relacje miêdzy produktami a koszykiem
Koszyk.belongsToMany(Produkt, { through: ProduktKoszyk });
Produkt.belongsToMany(Koszyk, { through: ProduktKoszyk });

module.exports = { Koszyk, ProduktKoszyk };
