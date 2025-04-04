import {
	isTokenExpired,
	formatDateTime,
} from "@/helpers";

export default {
	install: (app: any) => {
		app.config.globalProperties.$isTokenExpired = isTokenExpired;
		app.provide("isTokenExpired", isTokenExpired); // Provide for Composition API

		app.config.globalProperties.$formatDateTime = formatDateTime;
		app.provide("formatDateTime", formatDateTime); // Provide for Composition API
	}
}
