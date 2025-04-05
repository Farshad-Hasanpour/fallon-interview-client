import { defineStore } from 'pinia'
import {useSnackbarStore} from "@/stores/snackbar";

export const useBookingStore = defineStore('booking', () => {
	const $http: any = inject('http');
	const snackbarStore = useSnackbarStore();

	const mentors = ref<Record<string, any>[]>([]);
	const bookings = ref<Record<string, any>>([]);

	const fetchingMentors = ref(false);
	const fetchingBookings = ref(false);
	const settingMeeting = ref(false);

	function fetchAllMentors(){
		fetchingMentors.value = true;
		return $http.get('/mentors').then((res: any) => {
			mentors.value = res.data.data.mentors
		}).finally(() => {
			fetchingMentors.value = false;
		})
	}

	function fetchMyBookings(){
		fetchingBookings.value = true;
		return $http.get('/bookings').then((res: any) => {
			bookings.value = res.data.data.bookings;
		}).finally(() => {
			fetchingBookings.value = false;
		})
	}

	function bookMeeting(mentorEmail: string, time: Date | null){
		settingMeeting.value = true;
		return $http.post('/bookings', {
			mentorEmail,
			time: time?.toISOString()
		}).then((res: any) => {
			if(res.data.data.message){
				snackbarStore.showSnackbar(res.data.data.message, 'success')
			}
		}).finally(() => {
			settingMeeting.value = false;
		})
	}

	return {
		// loaders
		fetchingBookings,
		fetchingMentors,
		settingMeeting,
		// data
		mentors,
		bookings,
		// functions
		fetchAllMentors,
		fetchMyBookings,
		bookMeeting,
	}
})
