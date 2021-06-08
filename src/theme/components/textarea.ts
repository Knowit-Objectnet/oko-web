import { Input } from './input';

// Default values: https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/textarea.ts
export const Textarea = {
    variants: {
        default: {
            ...Input.variants.default.field,
        },
    },
    sizes: {
        default: {
            fontSize: 'md',
            paddingX: '2',
            borderRadius: '0',
        },
    },
    defaultProps: {
        size: 'default',
        variant: 'default',
    },
};
