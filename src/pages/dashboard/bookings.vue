<template>
<div class="tw:grow tw:overflow-y-auto py-6 px-2 tw:flex tw:flex-col">
	<div class="tw:w-full tw:max-w-[700px] mx-auto">
		<v-data-table
			:headers="headers"
			:items="bookingStore.bookings as any"
			density="comfortable"
			:loading="bookingStore.fetchingBookings"
			items-per-page="-1"
			hide-default-footer
			:mobile="null"
			mobile-breakpoint="md"
		>
			<template v-slot:item.time="{ item }: {item: any}">
				<template v-if="item.time">
					<div class="tw:flex tw:items-center tw:justify-end">
						<span class="mt-1">{{new Date(item.time).toLocaleString()}}</span>
					</div>
				</template>
				<template v-else>as soon as possible</template>
			</template>
		</v-data-table>
	</div>
</div>
</template>

<route lang="yaml">
meta:
  layout: 'dashboard'
</route>

<script setup lang="ts">
import {useBookingStore} from "@/stores/booking";

const bookingStore = useBookingStore();
bookingStore.fetchMyBookings();

const headers: any = Object.freeze([
	{key: 'mentor.name', title: 'Mentor', sortable: true, align: 'start'},
	{key: 'time', title: 'Time', sortable: true, align: 'end'},
])
</script>

<style scoped>

</style>
