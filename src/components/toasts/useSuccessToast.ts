import { UseToastOptions, useToast } from '@chakra-ui/react';

const defaultToastOptions: UseToastOptions = {
    position: 'bottom',
    isClosable: true,
};

// TODO: find a way to declare a sensible return type here
export const useSuccessToast = (options?: UseToastOptions) =>
    useToast({
        ...defaultToastOptions,
        ...options,
        status: 'success',
    });
