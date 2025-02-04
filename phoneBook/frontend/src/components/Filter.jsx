import { useState } from "react";
import { getAll } from "../services/contact";

function Filter({ persons, setPersons }) {
  const [filterName, setFilterName] = useState("");

  const handleFilter = (e) => {
    const newName = e.target.value;
    setFilterName(newName);

    if (newName) {
      const show = persons.filter((p) =>
        p.name.toLowerCase().includes(newName.toLowerCase())
      );
      setPersons(show);
    } else {
      getAll()
        .then((date) => setPersons(date))
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      Filter shown with{" "}
      <input type="text" value={filterName} onChange={handleFilter} />
    </>
  );
}

export default Filter;
