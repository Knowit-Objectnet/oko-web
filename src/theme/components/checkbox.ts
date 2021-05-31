// Default values: https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/checkbox.ts
export const Checkbox = {
    baseStyle: {
        container: {
            // TODO: find a way to combine this focus-within with focus-visible
            //  (so that focus-outline is not shown on mouse click)
            _focusWithin: {
                transition: 'outline 0.2s',
                outline: '4px solid',
                outlineColor: 'primaryHover',
                outlineOffset: '-2px',
            },
            padding: '1',
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
