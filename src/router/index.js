import Vue from "vue";
import VueRouter from "vue-router";
import Puppets from "../views/Puppets.vue";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/puppets",
    name: "Puppets",
    props: route => ({ shuffle: route.query.shuffle }),
    component: Puppets
  },
  {
    path: "/puppet/:id",
    name: "Puppet",
    props: route => ({ id: route.params.id }),
    component: () =>
      import(/* webpackChunkName: "puppet" */ "../views/Puppet.vue")
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: () =>
      import(/* webpackChunkName: "checkout" */ "../views/Checkout.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
