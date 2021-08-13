// Default values: https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/radio.ts
import { Checkbox } from './checkbox';

export const Radio = {
    baseStyle: {
        container: Checkbox.baseStyle.container,
        control: {
            ...Checkbox.baseStyle.control,
            borderRadius: 'full',
        },
    },
    sizes: Checkbox.sizes,
    defaultProps: {
        size: 'default',
    },
};
