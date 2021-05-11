import { extendTheme } from '@chakra-ui/react';

// Importing the webfonts (webpack + css-loader + file-loader handles the bundling of the css and font files)
import '../assets/font/fonts.css';

// Foundational (general) style overrides (see https://chakra-ui.com/docs/theming/customize-theme)
import { typography } from './foundations/typography';
import { colors } from './foundations/colors';

// Styling of components (see https://chakra-ui.com/docs/theming/component-style)
import { Button } from './components/button';

const overrides = {
    colors,
    ...typography,
    components: {
        Button,
    },
};

export const theme = {
    ...extendTheme(overrides),
    // TODO: colors, // Overriding all colors except our own
};
