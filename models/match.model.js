const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MatchSchema = new Schema({
    date: { type: Date, required: true },
    venue: { type: String, required: true },
    homeTeam: { type: mongoose.Types.ObjectId, ref: 'Team', required: true },
    awayTeam: { type: mongoose.Types.ObjectId, ref: 'Team', required: true },
    homeTeamGoals: { type: Number, required: true },
    awayTeamGoals: { type: Number, required: true },
    finished: { type: Boolean, default: false, required: true },
}, { timestamps: true });

const Match = mongoose.model('Match', MatchSchema);

module.exports = Match;