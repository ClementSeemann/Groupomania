import { createRouter, createWebHistory } from "vue-router";
import Authentification from "../views/Authentification.vue";
import Home from "../views/Home.vue";
import EditPost from "../views/EditPost.vue"


const routes = [
  {path: "/", name:"Authentification", component: Authentification},
  {path:"/home", name:"Home", component: Home},
  {path: "/post/:id", name:"EditPost", component: EditPost},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from) => {
  if (isLoginRequired(to)) {
    return router.push("/")
  }
})

function isLoginRequired(to) {
  if (!isPrivatePage(to)) return false
  if (!isTokenInCache()) return true
  return false
}

function isPrivatePage(to) {
  const publicPages = ["/"]
  return !publicPages.includes(to.path)
}

function isTokenInCache() {
  return localStorage.getItem("user") != null
}


export default router;
