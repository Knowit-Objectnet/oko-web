import * as React from 'react';
import { Flex } from '@chakra-ui/layout';
import { Icon } from '@chakra-ui/react';
import Info from '../../assets/Info.svg';

export const RequiredFieldsInstruction: React.FC = () => (
    <Flex as="p" fontSize={{ base: 'sm', tablet: 'md' }}>
        <Icon as={Info} marginRight="2" aria-hidden transform="translateY(3px)" /> Felt merket med stjerne (*) er
        obligatoriske.
    </Flex>
);
