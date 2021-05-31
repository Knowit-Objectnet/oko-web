import * as React from 'react';
import { Button } from '@chakra-ui/react';

interface Props {
    label: string;
    isLoading?: boolean;
}

export const FormSubmitButton: React.FC<Props> = ({ label, isLoading }) => (
    <Button type="submit" width="full" variant="primary" size="lg" isLoading={isLoading}>
        {label}
    </Button>
);
