/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	extend: {
  		colors: {
  			rose: {
  				'50': '#ffeff3',
  				'100': '#ffe0ea',
  				'200': '#ffc6da',
  				'300': '#ff97bb',
  				'400': '#ff5d98',
  				'500': '#ff247b',
  				'600': '#fa006cd1',
  				'700': '#d7005d',
  				'800': '#b40056',
  				'900': '#990250',
  				'950': '#570026'
  			},
  			'torch-red': {
  				'50': '#fff1f3',
  				'100': '#ffe0e5',
  				'200': '#ffc6d0',
  				'300': '#ff9faf',
  				'400': '#ff6780',
  				'500': '#fb2448',
  				'600': '#e9193c',
  				'700': '#c4112f',
  				'800': '#a2122a',
  				'900': '#861629',
  				'950': '#490611'
  			},
  			'dark-blue': {
  				'50': '#f2f2ff',
  				'100': '#e8eaff',
  				'200': '#d4d7ff',
  				'300': '#b1b5ff',
  				'400': '#8586ff',
  				'500': '#5b54fe',
  				'600': '#4631f6',
  				'700': '#371fe2',
  				'800': '#2f1ac4',
  				'900': '#28179b',
  				'950': '#140c69'
  			},
  			sapphire: {
  				'50': '#f2f5fc',
  				'100': '#e2eaf7',
  				'200': '#cbdaf2',
  				'300': '#a8c2e8',
  				'400': '#7ea3dc',
  				'500': '#6085d1',
  				'600': '#4c6bc4',
  				'700': '#4259b3',
  				'800': '#3f509e',
  				'900': '#334075',
  				'950': '#232948'
  			},
  			'deep-koamaru': {
  				'50': '#f3f6ff',
  				'100': '#e9edfe',
  				'200': '#d7dffd',
  				'300': '#b7c3fb',
  				'400': '#8d9bf8',
  				'500': '#5f6bf3',
  				'600': '#3e41e9',
  				'700': '#2d2cd5',
  				'800': '#2524b3',
  				'900': '#212092',
  				'950': '#151875'
  			},
  			'electric-violet': {
  				'50': '#f6f3ff',
  				'100': '#eee8ff',
  				'200': '#ded5ff',
  				'300': '#c6b3ff',
  				'400': '#ab88fd',
  				'500': '#9058fa',
  				'600': '#8335f2',
  				'700': '#7e33e0',
  				'800': '#611dba',
  				'900': '#511a98',
  				'950': '#310e67'
  			},
  			'athens-gray': {
  				'50': '#f6f7f8',
  				'100': '#eaebed',
  				'200': '#dcdee1',
  				'300': '#c4c7cc',
  				'400': '#a7abb3',
  				'500': '#9196a0',
  				'600': '#808390',
  				'700': '#737682',
  				'800': '#61626c',
  				'900': '#505158',
  				'950': '#333438'
  			},
  			'sky-blue': 'linear-gradient(90deg,_#F3F9FF,_#F1F0FF)',
  			'h-black': '#0D0E43',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
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
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			fadeInDown: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(-20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			}
  		},
  		animation: {
  			fadeInDown: 'fadeInDown 0.3s ease-out'
  		}
  	}
  },
  plugins: [require('tailwindcss-animate')],
};
