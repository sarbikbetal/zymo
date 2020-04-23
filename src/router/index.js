import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import( /* webpackChunkName: "about" */ '../views/About.vue')
    },
  },
  {
    path: '/host',
    name: 'Host',
    component: function () {
      return import( /* webpackChunkName: "about" */ '../views/Host.vue')
    },
  },
  {
    path: '/join',
    name: 'Join',
    beforeEnter: (to, from, next) => {
      let id = to.query.r;
      fetch(`https://zymo.herokuapp.com/room?r=${id}`)
        .then(res => res.json())
        .then((data) => {
          if (data.exists) {
            next();
          } else {
            next({
              path: "/404"
            });
          }
        }).catch((err) => {
          console.log(err);
          next({
            path: "/"
          });
        });
    },
    component: function () {
      return import( /* webpackChunkName: "about" */ '../views/Join.vue')
    },
  },
  {
    path: '/spotify',
    name: 'Spotify',
    beforeEnter: (to, from, next) => {
      let token = to.query.token;
      let rf_token = to.query.rf_token;

      if (token && rf_token) {
        next();
      } else {
        next({
          path: "/404"
        });
      }
    },
    props: true,
    component: function () {
      return import( /* webpackChunkName: "about" */ '../views/Spotify.vue')
    },
  },
  {
    path: '*',
    name: 'Error',
    component: function () {
      return import( /* webpackChunkName: "about" */ '../views/Error.vue')
    },
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router