import { createBreakpoints } from '@chakra-ui/theme-tools';

// Default values: https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/foundations/breakpoints.ts
export const breakpoints = createBreakpoints({
    // Our custom breakpoints
    base: '0px', // mobile
    handheld: '480px', // oversized phones and portrait-oriented tablet
    tablet: '768px',
    bigTablet: '896px',
    desktop: '992px',
    maxWidth: '1800px',

    // We need to override these default values because we want to use pixel values (not ems)
    sm: '480px',
    md: '768px',
    lg: '992px',
    xl: '1280px',
    '2xl': '1536px',
});
