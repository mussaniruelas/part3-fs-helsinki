const express = require('express');
const app = express();
app.use(express.json());

const persons = require('./data.js');


app.get('/', (req, res) =>{
    res.send('<h1>Hello World!</h1>');
});

app.get('/api/persons', (req, res)=>{
    res.json(persons);
})



// -------------- Inicio --------------

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
