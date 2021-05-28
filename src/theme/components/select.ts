// Default values: https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/select.ts
import { Input } from './input';

export const Select = {
    variants: {
        default: {
            field: {
                ...Input.variants.default.field,
                _focus: {
                    borderColor: 'primaryHover',
                    backgroundColor: 'primaryHover',
                    color: 'onPrimary',
                },
                // Resetting the text color used in the dropdown
                '& > option': {
                    color: 'initial',
                },
                _invalid: {
                    borderColor: 'error',
                    _focus: {
                        borderColor: 'primaryHover',
                    },
                },
            },
            icon: {
                fontSize: '30px', // Icon size
                insetEnd: '1rem',
                fill: 'onBackground',
                // Hover on parent element
                '*:hover > &': {
                    fill: 'primaryHover',
                },
                // Focus inside parent element
                '*:focus-within > &': {
                    fill: 'onPrimary',
                },
            },
        },
    },
    sizes: {
        default: {
            field: {
                ...Input.sizes.default.field,
                paddingX: '2',
            },
        },
    },
    defaultProps: {
        size: 'default',
        variant: 'default',
    },
};
