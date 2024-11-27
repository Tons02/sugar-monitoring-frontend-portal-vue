
/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'

routes.forEach(route => {
  if (route.name === '/Dashboard') {
    route.meta = route.meta || {};  // Ensure meta is defined if it's not already
    route.meta.requiresAuth = true;  // Set requiresAuth to true for Dashboard route
  }
});

console.log("Auto-generated routes:", routes);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})


// Route guard for protected routes
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token'); // Check if the token exists
  console.log("isAuthenticated:", isAuthenticated);
  console.log("Route requiresAuth meta:", to.meta.requiresAuth);

  if (to.meta.requiresAuth) {
    if (isAuthenticated === null) {
      console.log("Token is null, redirecting to login...");
      next({ path: '/' }); // Redirect to login if token is not set
    } else {
      console.log('Proceeding to route:', to.fullPath);
      next(); // Continue to the requested route
    }
  } else {
    console.log('Route does not require authentication, proceeding...');
    next(); // Proceed for routes that don't require authentication
  }
});


// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  console.log("Router is ready");
  localStorage.removeItem('vuetify:dynamic-reload');
});

export default router
