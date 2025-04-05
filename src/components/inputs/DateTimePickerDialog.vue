<template>
	<v-dialog
		:model-value="props.modelValue"
		width="auto"
		@update:model-value="emit('update:model-value', $event)"
	>
		<!-- TODO: scroll -->
		<v-card class="tw:overflow-y-auto" width="340px">
			<v-date-picker
				v-if="showDatePicker"
				v-model="date"
				color="primary"
				first-day-of-week="1"
				:min="minDate"
				:allowed-dates="allowedDates"
				tile
				width="100%"
			/>
			<v-time-picker
				v-else
				v-model="time"
				color="primary"
				format="24hr"
				:min="minTime"
				tile
				width="100%"
			/>
			<v-card-actions class="tw:w-full tw:flex-wrap tw:justify-between">
				<v-secondary-btn
					text="Cancel"
					color="error"
					class="tw:grow"
					@click="cancel()"
				/>
				<v-primary-btn
					:disabled="showDatePicker ? !date : !time"
					text="Confirm"
					class="tw:grow"
					@click="confirm()"
				/>
				<v-secondary-btn
					v-if="!required"
					class="tw:w-full"
					color="surface-variant"
					text="As soon as possible"
					@click="emit('select', null)"
				/>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import { VTimePicker } from 'vuetify/labs/VTimePicker'

const emit = defineEmits(['update:model-value', 'select']);
const props = withDefaults(defineProps<{
	modelValue: boolean,
	required?: boolean,
}>(), {
	required: false,
})

const showDatePicker = ref(true);
const date = ref<Date | null>(null);
const time = ref<string | null>(null);

const minDate = computed(() => {
	const yesterday = new Date();
	yesterday.setTime(yesterday.getTime() - 24 * 60 * 60 * 1000);
	return yesterday;
})

const minTime = computed(() => {
	const now = new Date();
	now.setTime(now.getTime() + 30 * 60 * 1000);
	return now.toTimeString();
})

// Restart values when dialog opens
watch(() => props.modelValue, (newVal) => {
	if(!newVal) return;
	date.value = null;
	time.value = null;
	showDatePicker.value = true;
})

function allowedDates(date: unknown) {
	let dateObject: Date | null = null;
	if(date instanceof Date) {
		dateObject = date;
	} else if(typeof date === 'string'){
		dateObject = new Date(date);
	} else {
		return true;
	}

	return ![0, 6].includes(dateObject.getDay())
}

function confirm(){
	if(showDatePicker.value){
		showDatePicker.value = false;
	} else {
		submit()
	}
}

function submit(){
	if(!date.value || !time.value) return;
	const [hour, min] = time.value.split(':').map(val => Number(val));
	const result = new Date(date.value.toISOString());

	result.setHours(hour, min, 0, 0)
	emit('select', result);
}

function cancel(){
	emit('update:model-value', false);
}
</script>

<style scoped>

</style>
