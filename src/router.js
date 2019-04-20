import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';

import axios from './axiosAPI';

Vue.use(Router);
import store from './store/store';

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter(to, from, next) {
        if (store.getters['isAuthenticated']) {
          return next();
        }
        next('/login');
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/customers',
      name: 'customers',
      // route level code-splitting
      // this generates a separate chunk (forgot.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "forgot" */ './views/Customers.vue'),
      beforeEnter(to, from, next) {
        if (store.getters['isAuthenticated']) {
          return next();
        }
        next('/login');
      }
    },
    {
      path: '/forgot',
      name: 'forgot',
      // route level code-splitting
      // this generates a separate chunk (forgot.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "forgot" */ './views/Forgot.vue')
    },
    {
      path: '/account/reset/:id/:hash',
      name: 'reset',
      // route level code-splitting
      // this generates a separate chunk (forgot.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "reset" */ './views/Reset.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      // route level code-splitting
      // this generates a separate chunk (profile.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "profile" */ './views/Profile.vue'),
      beforeEnter(to, from, next) {
        if (store.getters['isAuthenticated']) {
          return next();
        }
        next('/login');
      }
    },
    {
      path: '/admin',
      name: 'admin',
      // route level code-splitting
      // this generates a separate chunk (admin.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "admin" */ './views/Admin.vue'),
      beforeEnter(to, from, next) {
        if (store.getters['authorRole'] !== 'ADMIN') {
          return next(false);
        }
        if (store.getters['isAuthenticated']) {
          return next();
        }
        next('/login');
      }
    },
    {
      path: '/calendar',
      name: 'calendar',
      // route level code-splitting
      // this generates a separate chunk (calendar.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "calendar" */ './views/Calendar.vue'),
      beforeEnter(to, from, next) {
        if (store.getters['isAuthenticated']) {
          return next();
        }
        next('/login');
      }
    },
    {
      path: '/account/verify/:id/:hash',
      name: 'verify',
      beforeEnter(to, from, next) {
        store.dispatch('logout');
        axios
          .post(`/account/verify/${to.params.id}/${to.params.hash}`)
          .then(res => {
            localStorage.setItem('token', res.headers['x-auth-token']);
            store.commit('setAuthToken', res.headers['x-auth-token']);
            store.dispatch('setLogoutTimer', store.getters['tokenExp']);
            store.dispatch('setAuthHeaders');
            next('/profile');
          })
          .catch(err => {
            console.error(err);
            alert('Failed to verify your account. ' + err);
            next('/login');
          });
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (!store.getters['isAuthenticated']) {
    const token = localStorage.getItem('token');
    if (!token) {
      next();
      return;
    }
    store.commit('setAuthToken', token);
    store.dispatch('setLogoutTimer', store.getters['tokenExp']);
    store.dispatch('setAuthHeaders');
  }
  next();
});

export default router;
