import { extendTheme } from '@chakra-ui/react';

// Foundational (general) style overrides (see https://chakra-ui.com/docs/theming/customize-theme)
import { colors } from './foundations/colors';
import { sizes } from './foundations/sizes';
import { breakpoints } from './foundations/breakpoints';
import { typography } from './foundations/typography';

// Styling of components (see https://chakra-ui.com/docs/theming/component-style)
import { Button } from './components/button';

const overrides = {
    colors,
    sizes,
    space: {
        ...sizes, // So we can reference size-values in padding, margin etc.
    },
    breakpoints,
    ...typography,
    components: {
        Button,
    },
};

export const theme = {
    ...extendTheme(overrides),
    // TODO: colors, // Overriding all colors except our own
};
