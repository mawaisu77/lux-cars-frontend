module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        urbanist: ['Urbanist', 'sans-serif'],
      },
      screens: {
        // Add custom screen sizes if needed
        'ipad-pro': '1024px', // Example for iPad Pro width
      },
      fontSize: {
        '14': '1.09375vw', 
        '15': '1.171875vw', 
        '16': '1.25vw', 
        '17': '1.328125vw',
        '18': '1.40625vw',
        '20': '1.5625vw',
        '22': '1.71875vw', 
        '24': '1.875vw', 
        '34': '2.125vw', 
        '36': '2.8125vw', 
        
      },
      colors: {
        'primary-red': '#CA0000', 
        'primary-gray': '#7A798A',
        'secondary-gray': '#EBEBEB', 
        'light-gray': '#F8F8F8',
        'lux-black': '#1F1F2C',
        'lux-gray': '#F3F3F6',
      },
    },
  },
  plugins: [require('daisyui'),],
};