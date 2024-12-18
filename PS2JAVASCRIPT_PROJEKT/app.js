const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db');

// Importujemy kontrolery
const uzytkownikController = require('./controllers/uzytkownikController');
const produktController = require('./controllers/produktController');
const koszykController = require('./controllers/koszykController');

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
app.get('/produkty', produktController.getProducts);
app.post('/koszyk', koszykController.addProductToCart);
app.delete('/koszyk', koszykController.removeProductFromCart);
app.get('/koszyk/:uzytkownikId', koszykController.getCart);

// Uruchomienie serwera
app.listen(port, () => {
    console.log(`Aplikacja dzia³a na porcie ${port}`);
});
