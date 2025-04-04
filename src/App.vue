<template>
	<v-app>
		<router-view/>
		<v-snackbar
			close-on-back
			location="top"
			position="fixed"
			:color="snackbarStore.snackbar.type"
			:model-value="snackbarStore.snackbar.show"
			:text="snackbarStore.snackbar.message"
			:timeout="snackbarStore.snackbar.timeout"
		>
			<template #actions>
				<v-btn @click="snackbarStore.hideSnackbar()">
					<v-icon>mdi-close</v-icon>
				</v-btn>
			</template>
		</v-snackbar>
	</v-app>
</template>

<script lang="ts" setup>
import {useSnackbarStore} from '@/stores/snackbar';

const snackbarStore = useSnackbarStore();
</script>

<style>
@import "@/styles/main.scss";
</style>
