import { UseToastOptions, useToast } from '@chakra-ui/react';
import { defaultToastOptions } from './defaultToastOptions';

// TODO: find a way to declare a sensible return type here
export const useSuccessToast = (options?: UseToastOptions) =>
    useToast({
        ...defaultToastOptions,
        ...options,
        status: 'success',
    });
