export const Button = {
    baseStyle: {
        fontWeight: 'normal',
        borderRadius: '0',
    },
    variants: {
        outline: {
            bg: 'surface',
            color: 'onSurface',
            borderColor: 'onSurface',
            fill: 'onSurface',
            // TODO: we should use [layer styles](https://chakra-ui.com/docs/features/text-and-layer-styles#layer-style)
            //  here to avoid duplication - as soon as [this bug is fixed](https://github.com/chakra-ui/chakra-ui/issues/3883)
            _focus: {
                bg: 'onSurface',
                color: 'surface',
                fill: 'surface',
                textDecoration: 'underline',
            },
            _active: {
                bg: 'onSurface',
                color: 'surface',
                fill: 'surface',
                textDecoration: 'underline',
            },
            _hover: {
                bg: 'onSurface',
                color: 'surface',
                fill: 'surface',
                textDecoration: 'underline',
            },
        },
    },
};
