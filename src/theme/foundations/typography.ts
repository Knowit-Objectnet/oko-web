// Importing the webfonts (webpack + css-loader + file-loader handles the bundling of the css and font files)
import '../../assets/font/fonts.css';

// Default values: https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/foundations/typography.ts
export const typography = {
    fonts: {
        heading: `"Oslo Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
        body: `"Oslo Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    },
};
