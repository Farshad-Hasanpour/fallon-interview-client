import { defineStore } from 'pinia'

export const useSnackbarStore = defineStore('snackbar', () => {
	const snackbar = reactive<Record<string, any>>({
		show: false,
		type: 'error',
		message: '',
		timeout: 10000,
	})

	function showSnackbar(message = '', type = 'error', timeout = 10000) {
		if(!message) return;

		snackbar.message = message;
		snackbar.type = type;
		snackbar.timeout = 10000;
		snackbar.show = true;
	}

	function hideSnackbar() {
		snackbar.show = false;
	}

	return {
		snackbar,
		showSnackbar,
		hideSnackbar,
	}
})
