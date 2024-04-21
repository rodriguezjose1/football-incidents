const { body } = require('express-validator');

const incidentRules = [
    body('match').isMongoId().withMessage('Match ID must be valid'),
    body('type').isString().notEmpty().withMessage('Type is required'),
    body('detail').optional().isString(),
    body('origin').optional().isString(),
    body('minute').isInt({ min: 1 }).withMessage('Minute must be a positive integer'),
    body('player').optional(),
    body('team').optional().isMongoId(),
    body('reason').optional().isString(),
    body('replacementIn').optional().isString(),
    body('replacementOut').optional().isString(),
    body('assistance').optional().isString()
];

module.exports = {
    incidentRules
};
