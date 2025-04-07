<template>
	<v-container class="d-flex justify-center">
		<v-card class="pa-5" width="400">
			<v-card-title class="text-center">Sign Up</v-card-title>
			<v-card-subtitle class="text-center">Create an account</v-card-subtitle>

			<v-form ref="formRef" v-model="valid">
				<v-text-field
					v-model="name"
					label="Full Name"
					variant="outlined"
					:rules="[rules.required]"
				/>

				<v-text-field
					v-model="email"
					label="Email"
					variant="outlined"
					:rules="[rules.required, rules.email]"
				/>

				<v-text-field
					v-model="password"
					label="Password"
					type="password"
					variant="outlined"
					:rules="[rules.required, rules.password]"
				/>

				<v-text-field
					v-model="confirmPassword"
					label="Confirm Password"
					type="password"
					variant="outlined"
					:rules="[rules.required, rules.confirmPassword]"
				/>

				<v-btn
					block
					color="primary"
					class="mt-3"
					@click="submitForm"
				>
					Sign Up
				</v-btn>
			</v-form>
			<p class="mt-4">Already have an account? <router-link to="/auth/login">Login Here</router-link></p>
		</v-card>
	</v-container>
</template>

<route lang="yaml">
meta:
  layout: 'auth'
</route>

<script lang="ts" setup>
import {useProfileStore} from "@/stores/profile";

const $http: any = inject('http');
const router = useRouter();

const profileStore = useProfileStore();

// Form Data
const formRef = ref<HTMLFormElement | null>(null);
const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const valid = ref(false);

// Validation Rules
const rules = {
	required: (value: any) => !!value || "This field is required",
	email: (value: any) => /.+@.+\..+/.test(value) || "Enter a valid email",
	password: (value: any) =>
		value.length >= 6 || "Password must be at least 6 characters",
	confirmPassword: (value: any) =>
		value === password.value || "Passwords do not match",
};

// Submit Handler
const submitForm = () => {
	if (!formRef.value?.validate()) return;

	$http.post('/auth/signup', {
		email: email.value,
		name: name.value,
		password: password.value,
	}).then((res: any) => {
		profileStore.setToken(res.data.data.token)
	})
};
</script>

<style scoped>

</style>
