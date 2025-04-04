import {useSnackbarStore} from "@/stores/snackbar";

export function isTokenExpired(token: string) {
	try{
		const base64Url = token.split(".")[1];
		const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

		const jsonPayload = decodeURIComponent(
			atob(base64)
				.split("")
				.map(function (c) {
					return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
				})
				.join("")
		);

		const { exp } = JSON.parse(jsonPayload);
		return Date.now() >= exp * 1000;
	} catch (err){
		return true;
	}
}

export function formatDateTime(dateTime: string, options: Record<string, any> = {}) {
	if(!dateTime) return '';
	const dateObj = new Date(dateTime);
	const timeOnly = !!options.timeOnly || false;
	const dateOnly = !!options.dateOnly || false;
	const approximate = !!options.approximate || false;

	let format: Record<string, any> | undefined = {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false
	}

	if(dateOnly){
		format = {year: 'numeric', month: '2-digit', day: '2-digit'}
	} else if(timeOnly){
		format = { hour: "2-digit", minute: "2-digit", hour12: false};
	} else if(approximate){
		const now = new Date();
		const isToday = now.toDateString() === dateObj.toDateString();
		const isThisWeek = (
			(now.getTime() > dateObj.getTime()) &&
			now.getDay() >= dateObj.getDay() &&
			(now.getTime() - dateObj.getTime()) / (1000 * 60 * 60 * 24) < 7
		);

		if(isToday){
			format = { hour: "2-digit", minute: "2-digit", hour12: false }
		} else if(isThisWeek){
			format = { weekday: "short" };
		} else {
			format = { year: "numeric", month: "2-digit", day: "2-digit" }
		}
	}

	return new Date(dateTime).toLocaleString("en", format)
}
