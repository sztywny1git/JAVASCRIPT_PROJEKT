// models/produkt.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Produkt = sequelize.define('Produkt', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nazwa: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cena: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    opis: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ilosc: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
});

module.exports = Produkt;
