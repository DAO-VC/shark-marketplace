export default function ({ $axios, store }) {
  $axios.setToken(store.getters.token, "Bearer");
}
