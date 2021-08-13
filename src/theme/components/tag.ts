// Default values: https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/tag.ts

import Theme from '@chakra-ui/theme';

export const Tag = {
    baseStyle: {
        container: {
            whiteSpace: 'nowrap',
            display: 'inline-block',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
        },
    },
    variants: {
        solid: {
            container: {
                backgroundColor: 'secondary',
                color: 'onSecondary',
            },
        },
        kategori: {
            ...Theme.components.Tag.variants.solid,
            container: {
                backgroundColor: 'secondary',
                color: 'onSecondary',
            },
        },
        warning: {
            ...Theme.components.Tag.variants.solid,
            container: {
                backgroundColor: 'error',
                color: 'onError',
            },
        },
    },
    sizes: {
        md: {
            container: {
                maxWidth: 'full',
                fontSize: '0.75rem',
                borderRadius: 'full',
                paddingX: '2',
                paddingY: '1',
                lineHeight: 'normal',
            },
        },
    },
    defaultProps: {
        variant: 'solid',
        size: 'md',
    },
};
