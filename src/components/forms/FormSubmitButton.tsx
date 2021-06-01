import * as React from 'react';
import { Button } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/layout';

interface Props {
    label: string;
    isLoading?: boolean;
    loadingText?: string;
}

export const FormSubmitButton: React.FC<Props> = ({ label, isLoading, loadingText }) => (
    <Flex width="full" paddingY="5">
        <Button type="submit" width="full" variant="primary" size="lg" isLoading={isLoading} loadingText={loadingText}>
            {label}
        </Button>
    </Flex>
);
