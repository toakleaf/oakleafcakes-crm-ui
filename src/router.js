import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';

import store from './store/store';
import axios from './axiosAPI';

Vue.use(Router);

function loadView(view) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`);
}

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
      component: Login,
      //once logged in you shouldn't access this page
      beforeEnter(to, from, next) {
        if (store.getters['isAuthenticated']) {
          return next('/profile');
        }
        next();
      }
    },
    {
      path: '/customers',
      name: 'customers',
      component: loadView('Customers'),
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
      component: loadView('Forgot')
    },
    {
      path: '/account/reset/:id/:hash',
      name: 'reset',
      component: loadView('Reset')
    },
    {
      path: '/profile',
      name: 'profile',
      component: loadView('Profile'),
      beforeEnter(to, from, next) {
        if (store.getters['isAuthenticated']) {
          return next();
        }
        next('/login');
      }
    },
    {
      path: '/employees',
      name: 'employees',
      component: loadView('Employees'),
      beforeEnter(to, from, next) {
        if (
          store.getters['author'] &&
          store.getters['author'].role !== 'ADMIN'
        ) {
          return next('/');
        }
        if (store.getters['isAuthenticated']) {
          return next();
        }
        next('/login');
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: loadView('Admin'),
      beforeEnter(to, from, next) {
        if (
          store.getters['author'] &&
          store.getters['author'].role !== 'ADMIN'
        ) {
          return next('/');
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
      component: loadView('Calendar'),
      beforeEnter(to, from, next) {
        if (store.getters['isAuthenticated']) {
          return next();
        }
        next('/login');
      }
    },
    {
      path: '/test',
      name: 'test',
      component: loadView('Test'),
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
  if (!store.getters.authorFirstName) {
    store.dispatch('fetchAuthorData');
  }

  next();
});

export default router;
