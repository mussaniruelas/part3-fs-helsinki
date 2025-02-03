import React from "react";


function Contact({ person, deletePerson }) {
  return (
    <>
      <tr>
        <td>{person.name}</td>
        <td>{person.number}</td>
        <td>
          <button onClick={() => deletePerson()}>delete</button>
        </td>
      </tr>
    </>
  );
}

export default Contact;
