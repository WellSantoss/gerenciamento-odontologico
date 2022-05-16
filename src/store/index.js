import Vue from "vue";
import Vuex from "vuex";
import api from "@/api.js";
import router from "@/router/index.js";

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
    getUsuario(context) {
      api
        .get("/auth/autentica")
        .then((response) => {
          context.commit("UPDATE_USUARIO", response.data.data);
          context.commit("UPDADE_LOGIN", true);
        })
        .catch(() => {
          router.push({ name: "login" });
        });
    },
    setUsuario(context, payload) {
      context.commit("UPDATE_USUARIO", payload);
      context.commit("UPDADE_LOGIN", true);
    },
    logout(context) {
      context.commit("UPDATE_USUARIO", {
        id: "",
        nome: "",
        administrador: "",
        dentista: "",
        foto: "",
      });
      context.commit("UPDADE_LOGIN", false);
    },
  },
  modules: {},
});
