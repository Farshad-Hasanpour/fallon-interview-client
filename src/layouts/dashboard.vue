<template>
	<v-layout class="dashboard-layout">
		<v-navigation-drawer
			:model-value="isDrawerVisible"
			:persistent="!isMobile"
			:permanent="!isMobile"
			:temporary="isMobile"
			mobile-breakpoint="sm"
			class="tw:select-none"
			@update:model-value="isDrawerShown = $event"
		>
			<v-list class="py-0 tw:grow">
				<v-list-item
					v-for="(tabLink, tabName) in tabLinks"
					:key="tabName"
					:to="tabLink.routeName"
					exact
					class="tw:h-[56px] pa-0"
					:active="tab === tabName"
					color="primary"
					@click="selectTab(tabName)"
				>
					<template #prepend>
						<div class="box-center tw:h-8 tw:w-8">
							<v-icon>{{tabLink.icon}}</v-icon>
						</div>
					</template>
					<v-list-item-title>{{tabLink.title}}</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-app-bar
			color="primary-darken-1"
			class="px-1 px-md-4"
			density="comfortable"
			flat
		>
			<v-app-bar-nav-icon
				v-if="isMobile"
				@click="isDrawerShown = !isDrawerShown"
			/>
			<v-toolbar-title v-else-if="!isMobile" class="ms-0">O'Fallon Interview</v-toolbar-title>

			<v-spacer></v-spacer>

			<v-btn icon="mdi-power" variant="text" @click="profileStore.logout()"></v-btn>

		</v-app-bar>

		<v-main class="tw:!flex tw:flex-col tw:items-stretch">
			<router-view/>
		</v-main>
	</v-layout>
</template>

<script lang="ts" setup>
import {useRoute} from "vue-router";
import {useProfileStore} from "@/stores/profile";
import {useDisplay} from "vuetify";


const route = useRoute();
const profileStore = useProfileStore();
const display = useDisplay();

const isMobile = computed(() => {
	return display.smAndDown.value;
})

const isDrawerVisible = computed(() => {
	if(!isMobile.value) return true;
	return isDrawerShown.value;
})

const isDrawerShown = ref(false);

// Set Default Tab using url
type TabName = keyof typeof tabLinks;
const tab = ref<TabName | null>(null);
const tabLinks = {
	mentors: {
		routeName: '/dashboard/',
		icon: 'mdi-account-star',
		title: 'Mentors'
	},
	bookings: {
		routeName: '/dashboard/bookings',
		icon: 'mdi-book-account-outline',
		title: 'Bookings'
	}
}
watch(() => route.name, (newVal) => {
	const tabNames = Object.keys(tabLinks) as TabName[];
	for(let i = 0; i < tabNames.length; i++) {
		const tabName = tabNames[i];
		if(tabLinks[tabName].routeName === newVal){
			tab.value = tabName;
			return;
		}
	}
}, {immediate: true})

function selectTab(tabName: TabName){
	if(tabName === tab.value) return;
	tab.value = tabName;
}
</script>

<style>
html, body, #app{
	overflow: hidden;
	height: 100%;
	min-height: 100%;
	max-height: 100%;
}
</style>

<style lang="scss" scoped>
.navigation--full{
	width: calc(100% - 56px) !important;
}
</style>
