/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				accent: '#5BC4D1',
				dark: '#3E445B',
				light: '#D1D8EC',
				danger: '#FF6F91',
			},
			boxShadow: {
				theme: '0px 24px 32px rgba(19, 23, 35, 0.03), 0px 16px 24px rgba(19, 23, 35, 0.02), 0px 4px 8px rgba(19, 23, 35, 0.02), 0px 0px 1px rgba(19, 23, 35, 0.04)',
			},
			gridTemplateColumns: {
				app: 'repeat(5, 1fr)',
			},
			gridTemplateRows: {
				app: '10vh 90vh',
			},
		},
		screens: {
			'2xl': { max: '1535px' },
			// => @media (max-width: 1535px) { ... }

			xl: { max: '1279px' },
			// => @media (max-width: 1279px) { ... }

			lg: { max: '1023px' },
			// => @media (max-width: 1023px) { ... }

			md: { max: '767px' },
			// => @media (max-width: 767px) { ... }

			sm: { max: '639px' },
			// => @media (max-width: 639px) { ... }
		},
	},
	plugins: [],
}
