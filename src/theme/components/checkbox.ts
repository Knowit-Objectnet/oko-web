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
                _invalid: {
                    backgroundColor: 'error',
                },
                // Hover on parent
                '*:hover > &': {
                    backgroundColor: 'primaryHover',
                    _invalid: {
                        backgroundColor: 'error',
                    },
                },
            },
            // Hover on parent
            '*:hover > &': {
                borderColor: 'primaryHover',
                _invalid: {
                    borderColor: 'error',
                },
            },
            _focus: {
                boxShadow: 'none',
            },
            _invalid: {
                borderColor: 'error',
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
