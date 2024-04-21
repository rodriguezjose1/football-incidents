const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const TeamSchema = new Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    town: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Team', TeamSchema)