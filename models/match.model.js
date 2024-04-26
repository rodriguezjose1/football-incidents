const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MatchSchema = new Schema({
    date: { type: Date, required: true },
    venue: { type: String, required: false, default: null },
    homeTeam: { type: mongoose.Types.ObjectId, ref: 'Team', required: true },
    awayTeam: { type: mongoose.Types.ObjectId, ref: 'Team', required: true },
    homeTeamGoals: { type: Number, required: false, default: 0 },
    awayTeamGoals: { type: Number, required: false, default: 0 },
    secondsFirstTime: { type: Number, required: false, default: 0 },
    secondsSecondTime: { type: Number, required: false, default: 0 },
    finished: { type: Boolean, default: false },
}, { timestamps: true });

const Match = mongoose.model('Match', MatchSchema);

module.exports = Match;