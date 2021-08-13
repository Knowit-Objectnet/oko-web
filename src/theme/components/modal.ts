// Default values: https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/modal.ts
export const Modal = {
    baseStyle: {
        // The modal container:
        dialog: {
            borderRadius: '0',
            padding: { base: '0', tablet: '5' },
            marginY: { base: '0', tablet: '3.75rem' },
            minHeight: { base: '100vh', tablet: 'auto' },
            minWidth: { base: '100vw', tablet: '42rem' },
        },
        header: {
            fontSize: { base: '3xl', tablet: '4xl' },
            fontWeight: 'normal',
            paddingTop: { base: '7', tablet: '5' },
        },
        closeButton: {
            top: '4',
            insetEnd: '4',
        },
    },
};
