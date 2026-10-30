/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.js', './src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        canvas: '#F7F6F1',
        ink: '#232620',
        muted: '#73776C',
        line: '#E4E6DC',
        lime: '#D2F65A',
        green: '#44652C',
        soft: '#EEEFE8',
        pale: '#EFF8D6',
        warm: '#FAEBDD',
        rust: '#AD6034',
      },
      fontFamily: {
        sans: ['Inter_400Regular'],
        medium: ['Inter_500Medium'],
        semibold: ['Inter_600SemiBold'],
        bold: ['Inter_700Bold'],
        extrabold: ['Inter_800ExtraBold'],
      },
      borderRadius: {
        input: '12px',
        card: '20px',
      },
    },
  },
  plugins: [],
};
