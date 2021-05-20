import * as React from 'react';
import { Button, ChakraProps, Icon } from '@chakra-ui/react';
import Plus from '../../assets/Plus.svg';

export const AddPartnerButton: React.FC<ChakraProps> = (props) => (
    <Button leftIcon={<Icon as={Plus} />} variant="outline" width="full" borderColor="onSurface" {...props}>
        Legg til partner
    </Button>
);
