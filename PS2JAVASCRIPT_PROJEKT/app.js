const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db');
const path = require('path');
const cors = require('cors');

// Importujemy kontrolery
const uzytkownikController = require('./backend/controllers/userController');
const produktController = require('./backend/controllers/productController');
const koszykController = require('./backend/controllers/cartController');

// Inicjalizacja aplikacji Express
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Obs�uga CORS

// Udost�pnienie frontendu
app.use(express.static(path.join(__dirname, 'frontend')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Synchronizacja bazy danych
sequelize.sync().then(() => {
    console.log('Baza danych jest zsynchronizowana.');
});

// Trasy aplikacji
app.post('/api/register', uzytkownikController.register);
app.post('/api/login', uzytkownikController.login);
app.get('/api/products', produktController.getProducts);
app.post('/api/cart', koszykController.addProductToCart);
app.delete('/api/cart', koszykController.removeProductFromCart);
app.get('/api/cart/:userId', koszykController.getCart);

// Middleware obs�uguj�cy b��dy
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Co� posz�o nie tak!' });
});

// Eksportowanie aplikacji
module.exports = app;

// Uruchomienie serwera
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Aplikacja dzia�a na porcie ${port}`);
    });
}
