import Vue from "vue";
import API from "~/api/";

export default ({ $axios, store, env }, inject) => {
  // inject the repository in the context (ctx.app.$repository)
  // And in the Vue instances (this.$repository in your components)
  const ApiWithAxios = API($axios, store);

  // $axios.setToken(store.getters.token, "Bearer");
  Vue.prototype.$API = ApiWithAxios(store);

  // inject("API", ApiWithAxios(proxy));

  // You can reuse the repositoryWithAxios object:
  // inject("userRepository", repositoryWithAxios('/users'));
};
