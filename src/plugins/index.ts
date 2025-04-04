// Plugins
import globals from './globals';
import vuetify from './vuetify'
import pinia from '../stores'
import router from '../router'
import axios from './axios';

// Types
import type {App} from 'vue'

export function registerPlugins(app: App) {
	app
		.use(globals)
		.use(vuetify)
		.use(router)
		.use(pinia)
		.use(axios)
}
