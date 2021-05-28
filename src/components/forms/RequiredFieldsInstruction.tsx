import * as React from 'react';
import { Flex } from '@chakra-ui/layout';
import { Icon } from '@chakra-ui/react';
import Info from '../../assets/Info.svg';

export const RequiredFieldsInstruction: React.FC = () => (
    <Flex as="p" alignItems="center" backgroundColor="gray.200" paddingX="4" paddingY="3">
        <Icon as={Info} marginRight="2" aria-hidden transform="translateY(-1px)" /> Felt merket med stjerne (*) er
        obligatoriske.
    </Flex>
);
