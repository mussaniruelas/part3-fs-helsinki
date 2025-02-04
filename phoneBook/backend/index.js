require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const Person = require('./models/person.js');
const app = express();

// *********************************** MORGAN *************************************
//app.use(morgan('tiny'));
//app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
const requestLogger = (tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res),
    'ms',
    JSON.stringify(req.body),
  ].join(' ');
};

// Menjador de esrrores
const handleError = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  }

  next(error);
};

// Manejador de endpoints enpoints desconocidos
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

// ------------------------------------------------------------------
// ------------------------ Middleware ----------------------------
// ------------------------------------------------------------------

app.use(express.static('dist'));
app.use(express.json());
app.use(cors());
app.use(morgan(requestLogger));

// ------------------------------------------------------------------
// ------------------------ Inicio api ----------------------------
// ------------------------------------------------------------------

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has info for people</p>
    <p>${new Date()}</p>`);
});

// ------------------------------------------------------------------
// ------------------------ CRUD persons ----------------------------
// ------------------------------------------------------------------

app.get('/api/persons', (req, res) => {
  Person.find({}).then((person) => {
    res.json(person);
  });
});

app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (!(body && body.name && body.number))
    return res.status(400).json({ error: 'Falta datos...' });

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savePerson) => {
    res.json(savePerson);
  });
});

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  Person.findById(id)
    .then((person) => {
      res.json(person);
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(204).json(result);
    })
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body;

  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((updatePerson) => {
      res.json(updatePerson);
    })
    .catch((error) => next(error));
});

// -------------- Inicio --------------

app.use(unknownEndpoint);
app.use(handleError);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
