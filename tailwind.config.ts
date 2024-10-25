import containerQueries from '@tailwindcss/container-queries';
import defaultTheme from 'tailwindcss/defaultTheme';
import typography from '@tailwindcss/typography';

import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	darkMode: 'class',

	theme: {
		extend: {
			fontFamily: {
				sans: ['Commit Mono', ...defaultTheme.fontFamily.sans],
				mono: ['Hubot Sans', ...defaultTheme.fontFamily.mono]
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				additive: {
					DEFAULT: 'hsl(var(--additive))',
					foreground: 'hsl(var(--additive-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				ring: 'hsl(var(--ring))'
			}
		}
	},

	plugins: [typography, containerQueries]
} as Config;
