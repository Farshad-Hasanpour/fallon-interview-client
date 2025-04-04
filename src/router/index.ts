// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'
import {isTokenExpired} from "@/helpers";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
})

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
  localStorage.removeItem('vuetify:dynamic-reload')
})

// Global Navigation Guard
router.beforeEach((to, from, next) => {
	// Since landing page is not designed yet. redirect to login
	if(to.name === '/'){
		next('/auth/login');
		return;
	}

	const token = localStorage.getItem('token');
	const isAuthorized = Boolean(token && !isTokenExpired(token));

	if (to.meta.layout === 'dashboard' && !isAuthorized) {
		// Redirect to login page if not authenticated
		next('/auth/login');
	} else if(to.meta.layout === 'auth' && isAuthorized) {
		// Redirect to app if authenticated
		next('/dashboard');
	}else {
		next();
	}
});

export default router
