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
    },
  },
  plugins: [require('daisyui'),],
};