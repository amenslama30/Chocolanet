import { createRouter, createWebHistory } from 'vue-router'
import { fetchUser } from '@/services/AuthenticationService'

import Home from '../views/HomeView.vue'
import About from '../views/AboutView.vue'
import Features from '../views/FeaturesView.vue'
import Integrations from '../views/IntegrationsView.vue'
import notFound from '../views/404.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import RecoverPWD from '../views/RecoverPWD.vue'
import ResetPassword from '../views/ResetPassword.vue'
import ContentPlanning from '../views/ContentPlanning.vue'
import ContentTracking from '../views/ContentTracking.vue'
import StatsTracking from '../views/StatsTracking.vue'

import Dashboard from '../views/UserViews/Dashboard.vue'
import Statistiques from '../views/UserViews/Statistiques.vue'
import publication from '../views/UserViews/publication.vue'
import feed from '../views/UserViews/feed.vue'
import pages from '../views/UserViews/pages.vue' 
import pageStats from '../views/UserViews/pageStats.vue' 
import AnotherPage  from '../views/UserViews/AnotherPage.vue' 
import profile from '../views/UserViews/profile.vue'
import Calendar from '../views/UserViews/Calendar.vue'

import EspaceAdmin from '../views/AdminViews/EspaceAdmin.vue'


const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/about', name: 'about', component: About },
  { path: '/features', name: 'features', component: Features },
  { path: '/integrations', name: 'integrations', component: Integrations },
  { path: '/register', name: 'register', component: Register },
  { path: '/login', name: 'login', component: Login },
  { path: '/recover-password', name: 'recoverpwd', component: RecoverPWD },
  { path: '/planification-contenu', name: 'planification-contenu', component: ContentPlanning },
  { path: '/suivi-contenu', name: 'suivi-contenu', component: ContentTracking },
  { path: '/suivi-statistiques', name: 'suivi-statistiques', component: StatsTracking },
  { path: '/reset-password/:token', name: 'ResetPassword', component: ResetPassword },
  { path: '/:catchAll(.*)', name: '404-not-found', component: notFound },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/statistiques',
    name: 'statistiques',
    component: Statistiques,
    meta: { requiresAuth: true }
  },
  {
    path: '/publication',
    name: 'publication',
    component: publication,
    meta: { requiresAuth: true }
  },
  {
    path: '/feed',
    name: 'feed',
    component: feed,
    meta: { requiresAuth: true }
  },
  {
    path: '/pages',
    name: 'pages',
    component: pages,
    meta: { requiresAuth: true }
  },
  {
    path: '/statistiques-page',
    name: 'statistiques-page',
    component: pageStats,
    meta: { requiresAuth: true }
  },
  {
    path: '/another-page',
    name: 'AnotherPage',
    component: AnotherPage,
    params: true, // Allow passing props to route
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'profile',
    component: profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: Calendar,
    meta: { requiresAuth: true }
  },
  {
    path: '/espace-admin',
    name: 'espace-admin',
    component: EspaceAdmin,
    meta: { requiresAuth: true, requiresAdmin: true }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

function isAuthenticated() {
  // This is a simple example, replace with real authentication check
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${'jwt'}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null
}

async function getUserRole() {
  if (isAuthenticated()) {
    const user = await fetchUser();
    return user.data.user.role; // Assuming the user object has a role property
  }
  return null;
}

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      next({
        path: '/404-not-found',
        query: { redirect: to.fullPath }
      });
    } else {
      if (to.matched.some(record => record.meta.requiresAdmin)) {
        const role = await getUserRole();
        if (role !== 'admin') {
          next({ 
            path: '/404-not-found',
            query: { redirect: to.fullPath }
        });
        } else {
          next();
        }
      } else {
        next();
      }
    }
  } else {
    next();
  }
});

export default router
