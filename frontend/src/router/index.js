import { createRouter, createWebHashHistory } from "vue-router";
import Authentification from "../views/Authentification.vue";
import Home from "../views/Home.vue";
import EditPost from "../views/EditPost.vue"


const routes = [
  {path: "/", name:"authentification", component: Authentification},
  {path:"/home", name:"home", component: Home},
  {path: "/post/:id", name:"editPost", component: EditPost},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
