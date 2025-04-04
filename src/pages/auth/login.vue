<template>
	<v-container class="d-flex justify-center">
		<v-card class="pa-5" width="400">
			<v-card-title class="text-center">Login</v-card-title>
			<v-card-subtitle class="text-center">Access your account</v-card-subtitle>

			<v-form ref="formRef" :disabled="!valid" v-model="valid">
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

				<v-checkbox
					v-model="rememberMe"
					label="Remember me"
					density="compact"
					color="primary"
				/>

				<v-btn
					block
					color="primary"
					class="mt-3"
					@click="submitForm"
				>
					Login
				</v-btn>
			</v-form>
			<p class="mt-4">Have no account? <router-link to="/auth/signup">Signup Here</router-link></p>
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
const email = ref("farshad.hasanpour96@gmail.com");
const password = ref("secret");
const rememberMe = ref(true);
const valid = ref(false);

// Validation Rules
const rules = {
	required: (value: any) => !!value || "This field is required",
	email: (value: any) => /.+@.+\..+/.test(value) || "Enter a valid email",
	password: (value: any) => true,
};

// Submit Handler
const submitForm = () => {
	if (!formRef.value?.validate()) return;
	$http.post('/auth/login', {
		email: email.value,
		password: password.value,
		rememberMe: rememberMe.value,
	}).then((res: any) => {
		profileStore.setToken(res.data.data.token)
	})
};
</script>

<style scoped>

</style>
