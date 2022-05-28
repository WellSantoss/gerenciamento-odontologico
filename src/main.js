import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import VueTheMask from "vue-the-mask";

Vue.config.productionTip = false;

Vue.filter("formatCurrency", (valor) => {
  valor = Number(valor);

  if (!isNaN(valor)) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  } else {
    return "";
  }
});

Vue.filter("formatDate", (data) => {
  data = new Date(data);

  return data.toLocaleDateString("pt-BR");
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

const options = {
  confirmButtonColor: "#6ebcb6",
  denyButtonColor: "#6ebcb6",
  cancelButtonColor: "#ee5253",
  closeOnClickOutside: false,
};

Vue.use(VueSweetalert2, options);
Vue.use(VueTheMask);
