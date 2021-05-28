// Default values: https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/checkbox.ts
export const Checkbox = {
    baseStyle: {
        container: {
            _focusWithin: {
                transition: 'outline 0.2s',
                outline: '2px solid',
                outlineColor: 'primaryHover',
                outlineOffset: '-2px',
            },
            paddingX: '1',
            minHeight: '12',
            width: 'full',
        },
        control: {
            borderRadius: '0',
            borderColor: 'primary',
            _checked: {
                backgroundColor: 'primary',
                borderColor: 'primary',
                color: 'onPrimary',
                // Hover on parent
                '*:hover > &': {
                    backgroundColor: 'primaryHover',
                },
            },
            // Hover on parent
            '*:hover > &': {
                borderColor: 'primaryHover',
            },
            _focus: {
                boxShadow: 'none',
            },
        },
    },
    sizes: {
        default: {
            label: {
                fontSize: 'lg',
            },
            control: {
                width: '6',
                height: '6',
            },
        },
    },
    defaultProps: {
        size: 'default',
    },
};
