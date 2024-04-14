const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    team: { type: mongoose.Types.ObjectId, ref: 'Team', required: true },
    position: { type: [mongoose.Types.ObjectId], ref: 'Position', required: true },
    dateOfBirth: { type: Date, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    nationality: { type: String, required: true },
    dominantFoot: { type: String, enum: ['right', 'left', 'both'] },
}, { timestamps: true });

module.exports = mongoose.model('Player', PlayerSchema)