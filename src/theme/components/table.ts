// Default values: https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/table.ts
export const Table = {
    sizes: {
        sm: { td: { paddingX: '3', paddingY: '4' }, th: { paddingX: '3' } },
    },
    variants: {
        stripedNegative: {
            tbody: {
                tr: {
                    '&:nth-of-type(odd)': { td: { background: 'white' } },
                    '&:nth-of-type(even)': { td: { button: { background: 'white' } } },
                },
            },
        },
    },
};
