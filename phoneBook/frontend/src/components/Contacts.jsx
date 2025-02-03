import React from "react";
import Contact from "./Contact";
import { deleteId } from "../services/contact";

const Contacts = ({ persons, setPersons, setMessage, setErrorMessage }) => {
  const deletePerson = (id) => {
    const personAux = persons.find((person) => person.id === id);
    if (window.confirm("Are you sure you want to delete this contact?")) {
      deleteId(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setMessage(`Delete ${personAux.name}`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setErrorMessage(`Information of ${personAux.name} has already been removed from server`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  return (
    <div>
      <h2>Numbers</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((person) => (
            <Contact
              key={person.id}
              person={person}
              deletePerson={() => deletePerson(person.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Contacts;