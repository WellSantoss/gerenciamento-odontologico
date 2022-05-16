import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost/gerenciamento-odontologico-api",
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});

export default api;
