import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

const options = {
  confirmButtonColor: "#6ebcb6",
  cancelButtonColor: "#ee5253",
  closeOnClickOutside: false,
};

Vue.use(VueSweetalert2, options);
