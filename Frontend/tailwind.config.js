// tailwind.config.js
module.exports = {
  // other configurations...
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      // extend your configuration here
    },
  },
  variants: {
    extend: {
      width: {
        1024: "1024px",
      },
      // extend your variants here if needed
    },
  },
  plugins: [
    // add a plugin to hide scrollbars
    function ({ addUtilities }) {
      addUtilities({
        ".hide-scrollbar": {
          /* Hide scrollbar for Chrome, Safari and Opera */
          "&::-webkit-scrollbar": {
            display: "none",
          },
          /* Hide scrollbar for IE, Edge and Firefox */
          "-ms-overflow-style": "none" /* IE and Edge */,
          "scrollbar-width": "none" /* Firefox */,
        },
      });
    },
  ],
};
