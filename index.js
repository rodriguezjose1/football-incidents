const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { connect } = require('./db/connection');

const app = express();
const PORT = process.env.PORT || 3000;


const matchRoutes = require('./src/matches/matches.routes');
const incidentRoutes = require('./src/incidents/incidents.routes');

const handleHttpError = require('./middleware/httpErrorHandler');
const handleMongoError = require('./middleware/mongoErrorHandler');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use('/matches', matchRoutes);
app.use('/incidents', incidentRoutes);

app.use(handleMongoError);
app.use(handleHttpError);


// Inicia el servidor
app.listen(PORT, async () => {
  await connect();
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});