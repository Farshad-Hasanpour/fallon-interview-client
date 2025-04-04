import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import {VBtn} from 'vuetify/components/VBtn';

// Composables
import { createVuetify } from 'vuetify'

const myCustomLightTheme = {
	dark: false,
	colors: {
		background: '#FFFFFF',
		surface: '#FFFFFF',
		'surface-bright': '#FFFFFF',
		'surface-light': '#EEEEEE',
		'surface-variant': '#424242',
		'on-surface-variant': '#EEEEEE',
		primary: '#1867C0',
		'primary-darken-1': '#1F5592',
		secondary: '#48A9A6',
		'secondary-darken-1': '#018786',
		error: '#B00020',
		info: '#2196F3',
		success: '#4CAF50',
		warning: '#FB8C00',
	},
	variables: {
		'border-color': '#000000',
		'border-opacity': 0.12,
		'high-emphasis-opacity': 0.87,
		'medium-emphasis-opacity': 0.60,
		'disabled-opacity': 0.38,
		'idle-opacity': 0.04,
		'hover-opacity': 0.04,
		'focus-opacity': 0.12,
		'selected-opacity': 0.08,
		'activated-opacity': 0.12,
		'pressed-opacity': 0.12,
		'dragged-opacity': 0.08,
		'theme-kbd': '#212529',
		'theme-on-kbd': '#FFFFFF',
		'theme-code': '#F5F5F5',
		'theme-on-code': '#000000',
	}
}

export default createVuetify({
	theme: {
		defaultTheme: 'myCustomLightTheme',
		themes: {
			myCustomLightTheme,
		},
	},
	aliases: {
		VPrimaryBtn: VBtn,
		VSecondaryBtn: VBtn,
		VIconBtn: VBtn,
	},
	defaults: {
		VTextField: {
			variant: 'outlined',
			density: 'comfortable',
			color: 'secondary',
			bgColor: 'surface-light',
			fullWidth: true
		},
		VAutocomplete: {
			variant: 'outlined',
			density: 'comfortable',
			color: 'secondary',
			bgColor: 'surface-light',
			fullWidth: true
		},
		VSelect: {
			variant: 'outlined',
			density: 'comfortable',
			color: 'secondary',
			bgColor: 'surface-light',
			fullWidth: true
		},
		VCombobox: {
			variant: 'outlined',
			density: 'comfortable',
			color: 'secondary',
			bgColor: 'surface-light',
			fullWidth: true
		},
		VBtn: {
			class: 'overflow-hidden tw:shrink-0',
		},
		VPrimaryBtn: {
			variant: 'flat',
			rounded: 'pill',
			color: 'primary',
			class: 'overflow-hidden tw:shrink-0 tw:h-[3rem]',
		},
		VSecondaryBtn: {
			variant: 'outlined',
			rounded: 'pill',
			color: 'surface',
			class: 'overflow-hidden font-weight-bold tw:border-2 tw:shrink-0 tw-h-[3rem]',
		},
		VIconBtn: {
			variant: 'text',
			rounded: 'full',
		},
		VCard: {
			flat: true,
		},
		VDivider: {
			opacity: '0.8',
			thickness: '2',
			length: '100%'
		},
		VForm: {
			validateOn: 'invalid-input',
		},
		VCheckbox: {
			density: 'compact',
			color: 'secondary',
		},
		VAvatar: {
			rounded: 'full',
			color: 'primary-darken-1',
			size: '3rem',
			class: 'pa-0'
		}
	}
})
