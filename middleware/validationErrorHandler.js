const { validationResult } = require('express-validator');
const { createHttpError } = require('../common/errors');

// Middleware para manejar errores de validación
const handleValidationErrors = (req, res, next) => {
    // Verificar si hay errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Si hay errores, enviar una respuesta de error con el código de estado 400 y los errores de validación
        const formattedErrors = errors.array().map(error => ({
            code: error.path,
            message: error.msg
        }));
        next(createHttpError(400, 'VALIDATION_ERROR', 'Error de validación', formattedErrors));
    }

    // Si no hay errores de validación, pasar al siguiente middleware
    next();
};

module.exports = handleValidationErrors;