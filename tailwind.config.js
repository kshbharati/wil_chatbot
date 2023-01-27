const { default: plugin} = require('tailwindcss');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            height: {
                180: "80rem",
            },
        },
    },
    plugins: [
        require("tailwindcss-textshadow"),
        require("tw-elements/dist/plugin"),
    ],
};
