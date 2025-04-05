<template>
<div class="tw:grow tw:overflow-y-auto py-6 px-2 tw:flex tw:flex-col">
	<v-data-table
		:headers="headers"
		:items="bookingStore.mentors"
		density="comfortable"
		:loading="bookingStore.fetchingMentors"
		items-per-page="-1"
		hide-default-footer
		:mobile="null"
		mobile-breakpoint="md"
	>
		<template v-slot:item.rating="{ item }">
			<template v-if="item.rating">
				<div class="tw:flex tw:items-center tw:justify-end tw:md:justify-center tw:gap-x-1">
					<span class="mt-1">{{item.rating}}</span>
					<v-icon color="warning">mdi-star</v-icon>
				</div>
			</template>
			<template v-else>-</template>
		</template>
		<template v-slot:item.actions="{ item, index }">
			<div class="tw:flex tw:items-center tw:justify-end tw:md:justify-center">
				<v-primary-btn
					color="error"
					size="small"
					text="Book"
					@click="mentorToBook = item;"
				/>
			</div>
		</template>
	</v-data-table>
</div>
</template>

<route lang="yaml">
meta:
  layout: 'dashboard'
</route>

<script setup lang="ts">
import {useBookingStore} from "@/stores/booking";

const bookingStore = useBookingStore();
bookingStore.fetchAllMentors();

const headers: any = Object.freeze([
	{key: 'name', title: 'Name', sortable: true, align: 'start'},
	{key: 'expertise', title: 'Expertise', sortable: true, align: 'center'},
	{key: 'yearsExperience', title: 'Experience', sortable: true, align: 'center',},
	{key: 'rating', title: 'Rating', sortable: true, align: 'center'},
	{key: 'actions', title: 'Actions', sortable: false, align: 'center'},
])

const mentorToBook = ref<Record<string, any> | null>();
</script>

<style scoped>

</style>
