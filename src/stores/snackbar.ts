import { defineStore } from 'pinia'

export const useSnackbarStore = defineStore('snackbar', () => {
	const snackbar = reactive<Record<string, any>>({
		show: false,
		type: 'error',
		message: '',
		timeoutId: null,
	})

	function showSnackbar(message = '', type = 'error', timeout = 10000) {
		if(!message) return;

		snackbar.timeoutId && clearTimeout(snackbar.timeoutId)
		snackbar.timeoutId = setTimeout(() => {
			hideSnackbar()
		}, timeout)

		snackbar.message = message;
		snackbar.type = type;
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
