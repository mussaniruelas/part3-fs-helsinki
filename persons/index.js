const express = require("express");
const app = express();
app.use(express.json());

let persons = require("./data.js");

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
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.filter((p) => p.id === id);
  res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((p) => p.id !== id);
  console.log(id, persons);

  res.status(204).end();
});

const generateId = () => {
  return Math.floor(Math.random() * 1000);
};
app.post("/api/persons", (req, res) => {
  const body = req.body;

  console.log(body);
  

  if (!(body && body.name && body.number))
    return res.status(400).json({ error: "Falta datos..." });
  if (persons.some(p => p.name === body.name))
    return res.status(400).json({ error: "Nombre ya registrado" });

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  console.log(person);
  persons = persons.concat(person);

  console.log(persons);

  res.json(person);
});

// -------------- Inicio --------------

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
