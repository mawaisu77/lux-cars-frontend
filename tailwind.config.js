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
        '14': '0.729vw', 
        '15': '0.781vw', 
        '16': '0.833vw', 
        '17': '0.885vw',
        '18': '0.938vw',
        '20': '1.042vw',
        '22': '1.146vw', 
        '24': '1.25vw', 
        '26': '1.354vw',
        '30': '1.563vw',
        '34': '1.771vw', 
        '36': '1.875vw', 
        '38': '1.979vw',
        '40': '2.083vw',
        '50': '2.604vw',
        '54': '2.813vw',
        '56': '2.917vw',
        
      },
   
      colors: {
        'primary-red': '#CA0000', 
        'primary-gray': '#7A798A',
        'secondary-gray': '#EBEBEB', 
        'light-gray': '#F8F8F8',
        'lux-black': '#1F1F2C',
        'lux-gray': '#F3F3F6',
      },
      boxShadow: {
        'inner-lg': 'inset 0px 0px 20px 3px rgba(0, 0, 0, 0.3)', // Custom inset shadow
        'custom': 'rgba(211, 211, 211, 0.2) 0px 0px 0px 2px, rgba(211, 211, 211, 0.4) 0px 4px 6px -1px, rgba(255, 255, 255, 0.1) 0px 1px 0px inset',

      },
    },
  },
  plugins: [require('daisyui'),],
};