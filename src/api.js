import axios from "axios";

const api = axios.create({
  baseURL: "http://gerenciamento-odontologico-api.000webhostapp.com",
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});

export default api;
