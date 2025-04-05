<template>
<div class="tw:grow tw:overflow-y-auto py-6 px-2 tw:flex tw:flex-col">
	Bookings
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

</script>

<style scoped>

</style>
