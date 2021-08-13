// Default values: https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/select.ts
import { Input } from './input';

export const Select = {
    variants: {
        default: {
            field: {
                ...Input.variants.default.field,
            },
            icon: {
                fontSize: '30px', // Icon size
                insetEnd: '1rem',
                fill: 'onBackground',
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
