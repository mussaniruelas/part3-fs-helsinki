import { useState, useEffect } from "react";

import { Contacts, Form, Filter, Message } from "./components/index.js";
import { getAll } from "./services/contact.js";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const effect = () =>
    getAll()
      .then((data) => setPersons(data))
      .catch((error) => setMessage(error.message));

  useEffect(effect, []);

  return (
    <div>
      <h1>Phonebook</h1>
      <Message message={message} errorMessage={errorMessage} />
      <Filter persons={persons} setPersons={setPersons} />
      <Form
        persons={persons}
        setPersons={setPersons}
        setMessage={setMessage}
        setErrorMessage={setErrorMessage}
      />
      <Contacts
        persons={persons}
        setPersons={setPersons}
        setMessage={setMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};

export default App;
