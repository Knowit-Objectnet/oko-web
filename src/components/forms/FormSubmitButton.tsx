import * as React from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/layout';

interface Props extends ButtonProps {
    label: string;
    isLoading?: boolean;
    loadingText?: string;
}

export const FormSubmitButton: React.FC<Props> = ({ label, isLoading, loadingText, ...props }) => (
    <Button
        type="submit"
        width="full"
        variant="primary"
        size="lg"
        marginBottom="5"
        marginTop="2"
        isLoading={isLoading}
        loadingText={loadingText}
        {...props}
    >
        {label}
    </Button>
);
