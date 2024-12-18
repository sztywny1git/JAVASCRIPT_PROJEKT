const { Sequelize } = require('sequelize');

// Tworzenie po��czenia z baz� danych SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './sklep.sqlite',  // �cie�ka do pliku bazy danych
    logging: false, // Mo�na ustawi� na true, je�li chcesz zobaczy� zapytania SQL w konsoli
});

// Testowanie po��czenia
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Po��czenie z baz� danych zosta�o pomy�lnie nawi�zane.');
    } catch (error) {
        console.error('Nie uda�o si� po��czy� z baz� danych:', error);
    }
})();

module.exports = sequelize;