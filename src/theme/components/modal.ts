// Default values: https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/modal.ts
export const Modal = {
    baseStyle: {
        // The modal container:
        dialog: {
            borderRadius: '0',
            marginY: { base: '0', tablet: '3.75rem' },
            minHeight: { base: '100vh', tablet: 'auto' },
            padding: { base: '0', tablet: '5' },
            paddingBottom: { base: '6', tablet: '10' },
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
