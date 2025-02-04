import { useState } from "react";
import { create, getAll, updateId, getId } from "../services/contact";

function Form({ persons, setPersons, setMessage, setErrorMessage }) {
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });

  const handleNewPerson = (event) => {
    const { name, value } = event.target;
    setNewPerson({ ...newPerson, [name]: value });
  };

  const handleUpdateList = () => {
    getAll()
      .then((data) => {
        setPersons(data);
        setMessage(`Se actualizo la lista`);
      })
      .catch((error) => {
        setErrorMessage(error);
      });
    setTimeout(() => {
      setErrorMessage(null);
      setMessage(null);
    }, 5000);
  };

  const handleUpdatePerson = (personUpdate) => {
    const id = personUpdate.id;
    updateId(id, personUpdate)
      .then((data) => {
        setMessage(`Update ${data.name}`);
      })
      .catch((error) => {
        setErrorMessage(
          `Information of ${personUpdate.name} has already been removed from server ${error}`
        );
      });
    console.log("holaa");
    
    setTimeout(() => {
      setErrorMessage(null);
      setMessage(null);
    }, 5000);

    handleUpdateList();
  };

  const handleCreatePerson = (newPerson) => {
    create(newPerson)
      .then((data) => {
        setMessage(`Update ${data.name}`);
      })
      .catch((error) => {
        setErrorMessage(
          `Information of ${newPerson.name} has already been removed from server`
        );
      });

    setTimeout(() => {
      setErrorMessage(null);
      setMessage(null);
    }, 5000);

    handleUpdateList();
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personAux = { ...newPerson };
    setNewPerson({ name: "", number: "" });

    const personUpdate = persons.find((p) => p.name === personAux.name);

    if (personUpdate) {
      const confirmation = window.confirm(
        `${personUpdate.name} is already added to phonebook, replace the old number with a new one?`
      );
      if (!confirmation) return;
      handleUpdatePerson({...personUpdate, number: personAux.number});
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
