import { useState } from "react";
import { create, update } from "../services/contact";

function Form({ persons, setPersons, setMessage, setErrorMessage }) {
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });

  const handleNewPerson = (event) => {
    const { name, value } = event.target;
    setNewPerson({ ...newPerson, [name]: value });
  };

  const handleUpdatePerson = (personObject) => {
    const id = personObject.id;
    const changedPerson = { ...personObject, number: newPerson.number };
    update(id, changedPerson)
      .then((data) => {
        setPersons(persons.map((person) => (person.id !== id ? person : data)));
        setMessage(`Update ${personObject.name}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      })
      .catch((error) => {
        setErrorMessage(`Information of ${personObject.name} has already been removed from server`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setPersons(persons.filter((person) => person.id !== personObject.id));
      });
  };

  const handleCreatePerson = (newPerson) => {
    const newPersons = persons.concat(newPerson);
    create(newPerson)
      .then((data) => {
        setPersons(newPersons);
        setMessage(`Update ${newPerson.name}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      })
      .catch((error) => {
        setErrorMessage(`Information of ${newPerson.name} has already been removed from server`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personAux = { ...newPerson };
    setNewPerson({ name: "", number: "" });

    const personObject = persons.find((p) => p.name === personAux.name);

    if (personObject) {
      const confirmation = window.confirm(
        `${personAux.name} is already added to phonebook, replace the old number with a new one?`
      );
      if (confirmation) handleUpdatePerson(personObject);
      else return;
    } else {
      handleCreatePerson(personAux);
    }
  };

  return (
    <>
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name:{" "}
          <input
            value={newPerson.name}
            name="name"
            onChange={handleNewPerson}
          />
        </div>
        <div>
          phone:{" "}
          <input
            value={newPerson.number}
            name="number"
            onChange={handleNewPerson}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
}

export default Form;
