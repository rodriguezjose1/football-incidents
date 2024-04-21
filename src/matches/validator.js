const { body, param } = require('express-validator');

// Reglas de validación para los datos de un partido
const matchRules = [
    body('date').isISO8601().toDate().withMessage('La fecha debe estar en formato ISO8601 válido'),
    body('venue').isString().notEmpty().withMessage('El lugar del partido es requerido'),
    body('homeTeam').isMongoId().withMessage('El ID del equipo local debe ser válido'),
    body('awayTeam').isMongoId().withMessage('El ID del equipo visitante debe ser válido'),
    body('minutesFirstTime').isInt({ min: 45 }).withMessage('El minuto del primer tiempo debe ser un número positivo'),
    body('minutesSecondTime').isInt({ min: 90 }).withMessage('El minuto del segundo tiempo debe ser un número positivo'),
];

const matchRulesGet = [
    param('id').isMongoId().withMessage('Debe ser un id válido'),
];

const matchRulesPutTime = [
    body('secondsFirstTime'),
    body('secondsSecondTime'),
];


module.exports = {
    matchRules,
    matchRulesGet,
    matchRulesPutTime
};