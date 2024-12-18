const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Uzytkownik = sequelize.define('Uzytkownik', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nazwa: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    haslo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

module.exports = Uzytkownik;
