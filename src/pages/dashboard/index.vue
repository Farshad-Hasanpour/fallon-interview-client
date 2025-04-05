<template>
<div class="tw:grow tw:overflow-y-auto py-6 px-2 tw:flex tw:flex-col">
	Dashboard
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
</script>

<style scoped>

</style>
