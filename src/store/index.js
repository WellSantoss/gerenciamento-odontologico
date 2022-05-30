import Vue from "vue";
import Vuex from "vuex";
import api from "@/api.js";
import router from "@/router/index.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login: false,
    cargo: "",
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
    UPDADE_CARGO(state, payload) {
      state.cargo = payload;
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
          const data = response.data.data;
          context.commit("UPDATE_USUARIO", data);
          context.commit("UPDADE_LOGIN", true);

          let cargo = "Atendente";

          if (data.administrador) {
            cargo = "Administrador";
          } else if (data.dentista) {
            cargo = "Dentista";
          }

          context.commit("UPDADE_CARGO", cargo);
        })
        .catch(() => {
          router.push({ name: "login" });
        });
    },
    setUsuario(context, payload) {
      let cargo = "Atendente";

      if (payload.administrador) {
        cargo = "Administrador";
      } else if (payload.dentista) {
        cargo = "Dentista";
      }

      context.commit("UPDATE_USUARIO", payload);
      context.commit("UPDADE_CARGO", cargo);
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
