import * as React from 'react';
import { Flex } from '@chakra-ui/layout';
import { Icon } from '@chakra-ui/react';
import Info from '../../assets/Info.svg';

export const RequiredFieldsInstruction: React.FC = () => (
    <Flex as="p" alignItems="center">
        <Icon as={Info} marginRight="2" aria-hidden transform="translateY(-1px)" /> Felt merket med stjerne (*) er
        obligatoriske.
    </Flex>
);
