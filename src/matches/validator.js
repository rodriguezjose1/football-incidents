const { body, param } = require('express-validator');

// Reglas de validación para los datos de un partido
const matchRules = [
    body('date').isISO8601().toDate().withMessage('La fecha debe estar en formato ISO8601 válido'),
    body('venue').isString().optional(),
    body('homeTeam').isMongoId().withMessage('El ID del equipo local debe ser válido'),
    body('awayTeam').isMongoId().withMessage('El ID del equipo visitante debe ser válido'),
    body('minutesFirstTime').isInt({ min: 45 }).optional(),
    body('minutesSecondTime').isInt({ min: 90 }).optional(),
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