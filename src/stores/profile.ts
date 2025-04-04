import { defineStore } from 'pinia'

export const useProfileStore = defineStore('profile', () => {
	const router = useRouter();

	const email = ref('');

	function logout(){
		localStorage.removeItem('token');
		router.push('/auth/login');
		setTimeout(() => {
			email.value = '';
		}, 1000)
	}

	function getJwtPayload(token: string) {
		const base64Url = token.split('.')[1]; // Get the payload part
		const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Fix Base64URL encoding
		const jsonPayload = decodeURIComponent(atob(base64).split('').map(c =>
			'%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
		).join(''));

		return JSON.parse(jsonPayload);
	}

	function setToken(token: string){
		localStorage.setItem('token', token);
		email.value = getJwtPayload(token).email;
		router.push('/dashboard');
	}

	return {
		email,
		logout,
		setToken
	}
})
