// dbConfig.js
const mongoose = require('mongoose');

// Reemplaza con tu URI de conexión de MongoDB Atlas
const uri = 'mongodb+srv://toor:toor@rentaautos.tbccl.mongodb.net/?retryWrites=true&w=majority&appName=RentaAutosN';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conectado a MongoDB Atlas');
});

module.exports = db;
