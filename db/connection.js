const mongoose = require('mongoose');
const { config } = require('../config/config');


async function connect() {
  try {
    await mongoose.connect(config.db.uri);
    mongoose.set('debug', true);

    console.log('Connected to the database');
    // Puedes continuar con tus operaciones después de que la conexión se haya establecido
  } catch (error) {
    console.error('Error to connect to the database:', error);
  }
}

module.exports = { connect }