const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const PositionSchema = new Schema({
    codeEn: { type: String, required: true },
    codeEs: { type: String, required: true },
    nameEn: { type: String, required: true },
    nameEs: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Position', PositionSchema)