// app.js
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db'); // Importujemy po³¹czenie z baz¹ danych

// Importujemy kontrolery
const uzytkownikController = require('./backend/controllers/userController');
const produktController = require('./backend/controllers/productController');
const koszykController = require('./backend/controllers/cartController');

// Inicjalizacja aplikacji Express
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json()); // Obs³uguje dane w formacie JSON
app.use(bodyParser.urlencoded({ extended: true }));

// Synchronizacja bazy danych
sequelize.sync().then(() => {
    console.log('Baza danych jest zsynchronizowana.');
});

// Trasy (routingi) aplikacji
app.post('/register', uzytkownikController.register);
app.post('/login', uzytkownikController.login);
app.get('/products', produktController.getProducts);
app.post('/cart', koszykController.addProductToCart);
app.delete('/koszyk', koszykController.removeProductFromCart);
app.get('/cart/:userId', koszykController.getCart);

// Eksportowanie aplikacji
module.exports = app;
