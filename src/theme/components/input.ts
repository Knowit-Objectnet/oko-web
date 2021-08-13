const sizes = {
    default: {
        fontSize: 'lg',
        paddingX: '3',
        height: '12',
        borderRadius: '0',
    },
};

// Default values: https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/input.ts
export const Input = {
    variants: {
        default: {
            field: {
                border: '2px solid',
                borderColor: 'primary',
                outlineOffset: '-2px',
                display: 'flex',
                alignItems: 'center',
                _hover: {
                    borderColor: 'primaryHover',
                },
                _focus: {
                    outline: '4px solid',
                    outlineColor: 'primaryHover',
                },
                _invalid: {
                    borderColor: 'error',
                    outlineColor: 'error', // For invalid + focused state combination
                },
            },
        },
    },
    sizes: {
        default: {
            field: sizes.default,
            addon: sizes.default,
        },
    },
    defaultProps: {
        size: 'default',
        variant: 'default',
    },
};
