import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Customers from './views/Customers.vue';

// import axios from '../../axiosAPI';

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
      component: Customers,
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
