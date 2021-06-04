// Default values: https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/alert.ts
// NB! Also used for styling [toasts](https://chakra-ui.com/docs/feedback/toast)
export const Alert = {
    baseStyle: {
        container: {
            // TODO: fix for offsetting toasts from window edge - we need to do this another way,
            //  because this also affects all alerts, and the spacing between toasts
            marginBottom: '10',
        },
        title: {
            fontWeight: 'medium',
        },
    },
};
