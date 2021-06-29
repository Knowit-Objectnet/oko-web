// Default values: https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/tag.ts
export const Tag = {
    baseStyle: {
        container: {
            whiteSpace: 'nowrap',
        },
    },
    variants: {
        solid: {
            container: {
                backgroundColor: 'secondary',
                color: 'onSecondary',
                borderRadius: 'full',
            },
        },
    },
    defaultProps: {
        variant: 'solid',
    },
};
