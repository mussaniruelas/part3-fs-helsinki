import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const getId = (id) => {
  return axios.get(`${baseUrl}/${id}`).then((response) => response.data);
};

const create = (newPerson) => {
  return axios.post(baseUrl, newPerson).then((response) => response.data);
};

const updateId = (id, newPerson) => {
  console.log(id, newPerson);

  return axios
    .put(`${baseUrl}/${id}`, newPerson)
    .then((response) => response.data);
};

const deleteId = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export { getAll, getId, create, updateId, deleteId };
