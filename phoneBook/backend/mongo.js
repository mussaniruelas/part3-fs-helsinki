const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@helsinki.elc0j.mongodb.net/phoneBook?retryWrites=true&w=majority&appName=helsinki`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

// listar personas 

switch (process.argv.length) {
  case 3:
    console.log("phonebook:");
    Person.find({}).then((result) => {
      result.forEach((p) => console.log(p.name, p.number));
      mongoose.connection.close();
    });
    break;

  case 5:
    const name = process.argv[3];
    const number = process.argv[4];
    const person = new Person({
      name: name,
      number: number,
    });

    person.save().then((r) => {
      console.log(`added ${name} number ${number} to phonebook`);
      mongoose.connection.close();
    });

  default:
    break;
}
