import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";

// definition de l'URL pour les requêtes au serveur
const instance = axios.create({
  baseURL: "http://localhost:3000/api",
});

createApp(App).use(router).use(VueAxios, instance).mount("#app");
