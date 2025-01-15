// models/koszyk.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../db');
const User = require('./user');
const Product = require('./product');

// Tworzymy model Koszyk
const Cart = sequelize.define('Cart', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
});

// Relacje
Cart.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Cart, { foreignKey: 'userId' });

const ProductCart = sequelize.define('ProductCart', {
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
});

// Relacje mi�dzy produktami a koszykiem
Cart.belongsToMany(Product, { through: ProductCart });
Product.belongsToMany(Cart, { through: ProductCart });

module.exports = { Cart, ProductCart };
