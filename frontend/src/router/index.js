import { createRouter, createWebHashHistory } from "vue-router";
import Authentification from "../views/Authentification.vue";
import Home from "../views/Home.vue";
import EditPost from "../views/EditPost.vue"


const routes = [
  {path: "/", name:"Authentification", component: Authentification},
  {path:"/home", name:"Home", component: Home},
  {path: "/post/:id", name:"EditPost", component: EditPost},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
