import Vue from 'vue';
import Router from 'vue-router';
import Customers from './views/Customers.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'customers',
      component: Customers
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (login.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/customers',
      name: 'customers',
      component: Customers
    },
    {
      path: '/admin',
      name: 'admin',
      // route level code-splitting
      // this generates a separate chunk (login.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "login" */ './views/Admin.vue')
    }
  ]
});
