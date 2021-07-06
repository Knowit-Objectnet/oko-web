import * as React from 'react';
import { Flex } from '@chakra-ui/layout';
import { Icon } from '@chakra-ui/react';
import Info from '../../assets/Info.svg';

interface Props {
    instructions?: Instruction[];
    useDefault?: boolean;
}

export interface Instruction {
    text: string;
    icon?: any;
}

export const RequiredFieldsInstruction: React.FC<Props> = ({ instructions, useDefault = true }) => (
    <Flex flexDirection="column">
        {useDefault ? (
            <Flex fontSize={{ base: 'sm', tablet: 'md' }}>
                <Icon as={Info} marginRight="2" aria-hidden transform="translateY(3px)" /> Felt merket med stjerne (*)
                er obligatoriske.
            </Flex>
        ) : null}

        {instructions?.map((instrusction) => {
            return (
                <Flex key={instrusction.text} fontSize={{ base: 'sm', tablet: 'md' }}>
                    <Icon as={instrusction.icon || Info} marginRight="2" aria-hidden transform="translateY(3px)" />{' '}
                    {instrusction.text}
                </Flex>
            );
        })}
    </Flex>
);
