/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				accent: '#5BC4D1',
				dark: '#3E445B',
				light: '#D1D8EC',
			},
			boxShadow: {
				theme: '0px 24px 32px rgba(19, 23, 35, 0.03), 0px 16px 24px rgba(19, 23, 35, 0.02), 0px 4px 8px rgba(19, 23, 35, 0.02), 0px 0px 1px rgba(19, 23, 35, 0.04)',
			},
		},
	},
	plugins: [],
}
