// Default values: https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/button.ts
export const Button = {
    baseStyle: {
        fontWeight: 'normal',
        borderRadius: '0',
        _disabled: {
            opacity: 1,
        },
        _hover: {
            _disabled: {
                bg: 'none',
            },
        },
    },
    variants: {
        outlineOnSurface: {
            backgroundColor: 'transparent',
            color: 'onSurface',
            border: '1px solid',
            borderColor: 'onSurface',
            '& svg': { fill: 'onSurface' },
            // TODO: we should use [layer styles](https://chakra-ui.com/docs/features/text-and-layer-styles#layer-style)
            //  here to avoid duplication - as soon as [this bug is fixed](https://github.com/chakra-ui/chakra-ui/issues/3883)
            _focus: {
                backgroundColor: 'onSurface',
                color: 'surface',
                '& svg': { fill: 'surface' },
                textDecoration: 'underline',
            },
            _active: {
                backgroundColor: 'onSurface',
                color: 'surface',
                '& svg': { fill: 'surface' },
                textDecoration: 'underline',
            },
            _hover: {
                backgroundColor: 'onSurface',
                color: 'surface',
                '& svg': { fill: 'surface' },
                textDecoration: 'underline',
            },
        },
        primary: {
            backgroundColor: 'primary',
            color: 'onPrimary',
            border: 'none',
            '& svg': { fill: 'onPrimary' },
            // TODO: we should use [layer styles](https://chakra-ui.com/docs/features/text-and-layer-styles#layer-style)
            //  here to avoid duplication - as soon as [this bug is fixed](https://github.com/chakra-ui/chakra-ui/issues/3883)
            _focus: {
                backgroundColor: 'primaryHover',
                textDecoration: 'underline',
                boxShadow: 'none',
            },
            _hover: {
                backgroundColor: 'primaryHover',
                textDecoration: 'underline',
                _disabled: {
                    backgroundColor: 'gray.200',
                    textDecoration: 'none',
                },
            },
            _active: {
                backgroundColor: 'primaryHover',
                textDecoration: 'none',
            },
            _disabled: {
                backgroundColor: 'gray.200',
                color: 'gray.600',
                '& svg': { fill: 'gray.500' },
            },
        },
        // TODO: better focus and hover colors/marking
        warning: {
            backgroundColor: 'warning',
            color: 'onWarning',
            border: 'none',
            '& svg': { fill: 'onWarning' },
            // TODO: we should use [layer styles](https://chakra-ui.com/docs/features/text-and-layer-styles#layer-style)
            //  here to avoid duplication - as soon as [this bug is fixed](https://github.com/chakra-ui/chakra-ui/issues/3883)
            _focus: {
                backgroundColor: 'warning',
                textDecoration: 'underline',
            },
            _hover: {
                backgroundColor: 'warning',
                textDecoration: 'underline',
            },
            _active: {
                backgroundColor: 'warning',
                textDecoration: 'none',
            },
        },
    },
    defaultProps: {
        variant: 'solid',
        size: 'md',
    },
};
