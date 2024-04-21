const { default: mongoose, Schema } = require("mongoose")

const Team = new Schema({
    id: { type: mongoose.Types.ObjectId, required: true, ref: 'Team' },
    name: { type: String, required: true },
    code: { type: String, required: true }
}, { _id: false });

const Player = new Schema({
    id: { type: mongoose.Types.ObjectId, required: true, ref: 'Player' },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
}, { _id: false });


const IncidentSchema = new Schema({
    match: { type: mongoose.Types.ObjectId, required: true, ref: 'Match' },
    type: { type: String, required: true, required: true }, // Tipo de incidencia (gol, tarjeta amarilla, etc.)
    detail: { type: String }, // Detalle de la incidencia (cabeza, pie, etc.)
    origin: { type: String }, // Origen de la incidencia (tiro libre, tiro de esquina, etc.)
    minute: { type: Number, required: true },
    player: { type: Player, default: null },
    team: { type: Team, required: true },
    reason: { type: String }, // Motivo de la incidencia (solo para tarjetas)
    replacementIn: { type: Player }, // Jugador que entra (solo para sustituciones)
    replacementOut: { type: Player }, // Jugador que sale (solo para sustituciones)
    assistance: { type: Player, default: null, ref: 'Player' } // Asistencia asociada al gol
}, { timestamps: true });

module.exports = mongoose.model('Incident', IncidentSchema)