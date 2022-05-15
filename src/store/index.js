import Vue from "vue";
import Vuex from "vuex";
import api from "@/api.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login: false,
    usuario: {
      id: "",
      nome: "",
      administrador: "",
      dentista: "",
      foto: "",
    },
  },
  mutations: {
    UPDADE_LOGIN(state, payload) {
      state.login = payload;
    },
    UPDATE_USUARIO(state, payload) {
      state.usuario = payload;
    },
  },
  actions: {
    getUsuario(context, payload) {
      api
        .get("/auth/autentica", {
          headers: {
            Authorization: "Bearer " + payload,
          },
        })
        .then((response) => {
          context.commit("UPDATE_USUARIO", response.data.data);
          context.commit("UPDADE_LOGIN", true);
        });
    },
    setUsuario(context, payload) {
      context.commit("UPDATE_USUARIO", payload);
      context.commit("UPDADE_LOGIN", true);
    },
  },
  modules: {},
});
