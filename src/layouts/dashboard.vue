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
					:to="tabLink.route"
					exact
					class="tw:h-[56px] pa-0"
					:class="tab === tabName ? 'bg-surface-light text-primary' : ''"
					@click="selectTab(tabName)"
				>
					<div class="tw:w-full tw:h-full box-center tw:flex-col">
						<v-icon>{{tabLink.icon}}</v-icon>
						<span class="tw:text-xs">{{tabLink.title}}</span>
					</div>
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
const tab = ref<TabName>('mentors');
const tabLinks = {
	mentors: {
		route: '/dashboard',
		icon: 'mdi-home',
		title: 'Mentors'
	}
}

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
