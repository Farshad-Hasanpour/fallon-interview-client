// plugins/axios.js
import axios from "axios";
import {useSnackbarStore} from "@/stores/snackbar";

export default {
	install: (app: any) => {
		const {showSnackbar} = useSnackbarStore()

		const axiosInstance = axios.create({
			baseURL: import.meta.env.VITE_APP_API_BASE_URL,
			timeout: Number(import.meta.env.VITE_APP_API_TIMEOUT) || undefined,
			headers: {
				"Content-Type": "application/json",
			},
		});

		// Add request interceptor
		axiosInstance.interceptors.request.use(
			(config) => {
				const token = localStorage.getItem("token");
				if(token && !app.config.globalProperties.$isTokenExpired(token)){
					config.headers.Authorization = `Bearer ${token}`;
				}else {
					localStorage.removeItem("token");
					delete config.headers.Authorization;
				}

				return config;
			},
			(error) => Promise.reject(error)
		);

		// Add response interceptor
		axiosInstance.interceptors.response.use(
			(response) => {
				if(response.data.message){
					showSnackbar(response.data.message, 'success');
				}
				return response;
			},
			(error) => {
				if(error.status === 401) {
					app.config.globalProperties.$router.push("/auth/login");
				}

				if(!error.response?.data || error.status >= 500) showSnackbar('Something went wrong! Please try again.');
				else showSnackbar(error.response?.data.message || 'Something went wrong! Please contact us.');

				return Promise.reject(error);
			}
		);

		app.config.globalProperties.$http = axiosInstance; // Make axios globally available
		app.provide("http", axiosInstance); // Provide for Composition API
	},
};
