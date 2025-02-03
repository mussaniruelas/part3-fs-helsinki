import { useState } from "react";

function Filter({persons, setPersons}) {
  const [filterName, setFilterName] = useState("");

  const handleFilter = (e) => {
    const newName = e.target.value;
    setFilterName(newName);
    const show = newName
      ? persons.filter((person) =>
          person.name.toLowerCase().includes(newName.toLowerCase())
        )
      : persons;
    
    setPersons(show);

  };

  return (
    <>
      Filter shown with{" "}
      <input type="text" value={filterName} onChange={handleFilter} />
    </>
  );
}

export default Filter;
