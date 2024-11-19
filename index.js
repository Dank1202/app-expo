// index.js
const db = require('./dbConfig');
const User = require('./User');

const createUser = async () => {
  try {
    const newUser = new User({
      name: 'Juan Pérez',
      phoneNumber: '1234567890',
      email: 'juan.perez@example.com',
      password: 'securepassword123',
    });

    await newUser.save();
    console.log('Usuario creado exitosamente');
  } catch (error) {
    console.error('Error al crear el usuario:', error);
  }
};

createUser();
