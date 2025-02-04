import React from "react";
import Contact from "./Contact";
import { deleteId, getAll } from "../services/contact";

const Contacts = ({ persons, setPersons, setMessage, setErrorMessage }) => {
  const deletePerson = (name, id) => {
    const confirmacion = window.confirm(
      "Are you sure you want to delete this contact?"
    );

    if (!confirmacion) return null;

    deleteId(id)
      .then(() => {
        setMessage(`Delete ${name}`);
      })
      .catch((error) => {
        setErrorMessage(
          `Information of ${name} has already been removed from server`
        );
      });

    setTimeout(() => {
      setMessage(null);
    }, 5000);
    getAll()
      .then((data) => setPersons(data))
      .catch((error) => setMessage(error.message));
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
              deletePerson={() => deletePerson(person.name, person.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Contacts;
