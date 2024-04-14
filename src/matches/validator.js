const { body } = require('express-validator');

// Reglas de validación para los datos de un partido
const matchRules = [
    body('date').isISO8601().toDate().withMessage('La fecha debe estar en formato ISO8601 válido'),
    body('venue').isString().notEmpty().withMessage('El lugar del partido es requerido'),
    body('homeTeam').isMongoId().withMessage('El ID del equipo local debe ser válido'),
    body('awayTeam').isMongoId().withMessage('El ID del equipo visitante debe ser válido')
];

module.exports = {
    matchRules
};