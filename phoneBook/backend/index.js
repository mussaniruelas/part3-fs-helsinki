require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const Person = require("./models/person.js");
const app = express();

let persons = require("./data.js");

app.use(express.static("dist"));
app.use(cors());
app.use(express.json());

// *********************************** MORGAN *************************************
//app.use(morgan('tiny'));
//app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
const requestLogger = (tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
    JSON.stringify(req.body),
  ].join(" ");
};

app.use(morgan(requestLogger));

// Esto es para los enpoints desconocidos
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// ------------------------------------------------------------------
// ------------------------ Inicio api ----------------------------
// ------------------------------------------------------------------

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/info", (req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`);
});

// ------------------------------------------------------------------
// ------------------------ CRUD persons ----------------------------
// ------------------------------------------------------------------

app.get("/api/persons", (req, res) => {
  Person.find({}).then((person) => {
    res.json(person);
  });
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!(body && body.name && body.number))
    return res.status(400).json({ error: "Falta datos..." });

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savePerson) => {
    res.json(savePerson);
  });
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  Person.findById(id).then((person) => {
    res.json(person);
  });
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((p) => p.id !== id);
  console.log(id, persons);

  res.status(204).end();
});

// -------------- Inicio --------------

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
