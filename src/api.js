import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost/gerenciamento-odontologico-api",
});

export default api;
