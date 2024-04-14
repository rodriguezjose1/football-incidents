const createError = require('http-errors');

// Función para crear un error HTTP personalizado con un código identificador
function createHttpError(statusCode, errorCode, message, errors, handled) {
    const error = createError(statusCode, message);
    error.errorCode = errorCode;
    error.handled = handled || false;
    error.errors = errors || null;

    return error;
}

module.exports = { createHttpError }