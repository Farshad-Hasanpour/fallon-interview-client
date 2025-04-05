import { defineStore } from 'pinia'
import {useSnackbarStore} from "@/stores/snackbar";

export const useBookingStore = defineStore('booking', () => {
	const $http: any = inject('http');
	const snackbarStore = useSnackbarStore();

	const mentors = ref<Record<string, any>[]>([]);
	const bookings = ref<Record<string, any>>([]);

	const fetchingMentors = ref(false);
	const fetchingBookings = ref(false);
	const bookingMentorEmails = ref<string[]>([]); // mentor email

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
		bookingMentorEmails.value.push(mentorEmail);
		return $http.post('/bookings', {
			mentorEmail,
			time: time?.toISOString()
		}).then((res: any) => {
			const time = !res.data.data.time ? 'earliest available time' : new Date(res.data.data.time).toLocaleString()
			const message = `You booked a meeting with ${res.data.data.mentor.name} for ${time}`
			snackbarStore.showSnackbar(message, 'success')
		}).finally(() => {
			const indexToDelete = bookingMentorEmails.value.findIndex(email => email === mentorEmail);
			if(indexToDelete > -1){
				bookingMentorEmails.value.splice(indexToDelete, 1)
			}
		})
	}

	return {
		// loaders
		fetchingBookings,
		fetchingMentors,
		bookingMentorEmails,
		// data
		mentors,
		bookings,
		// functions
		fetchAllMentors,
		fetchMyBookings,
		bookMeeting,
	}
})
