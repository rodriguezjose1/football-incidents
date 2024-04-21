const { createHttpError } = require("../common/errors");

const handleMongooseError = (err, req, res, next) => {
    if (err.name && err.name === 'ValidationError') {
        // Si el error es una ValidationError de Mongoose, manejarlo aquí
        console.error('Error de validación de Mongoose:', err.message);
        next(createHttpError(500, 'INTERNAL_SERVER_ERROR', 'Internal Server Error', null, true));
    }

    if (err.name && err.name === 'CastError') {
        // Si el error es un CastError de Mongoose, manejarlo aquí
        console.error('Error de casting de Mongoose:', err.message);
        next(createHttpError(500, 'INTERNAL_SERVER_ERROR', 'Internal Server Error', null, true));
    }

    // Si el error no es de Mongoose, pasar al siguiente middleware
    next(err);
};

module.exports = handleMongooseError;
