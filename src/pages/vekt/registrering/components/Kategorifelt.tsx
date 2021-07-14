import * as React from 'react';
import { Flex, Tag } from '@chakra-ui/react';
import { Registreringsfelt } from './Registreringfelt';
import { Unit, Vektobjekt } from '../Vektregistrering';
import { useState } from 'react';

interface Props {
    id: string;
    name: string;
    vektobjekt: Vektobjekt;
    onChange: (vektobjekt: Vektobjekt) => void;
}

export const Kategorifelt: React.FC<Props> = ({ name, onChange, vektobjekt }) => {
    return (
        <>
            <Flex justifyContent="flex-end" alignItems="center" padding={2.5} alignSelf="stretch" marginBottom={3}>
                <Tag
                    as="li"
                    size={'md' || 'sm'}
                    marginBottom="1"
                    marginRight="1"
                    paddingX={3}
                    paddingY={1}
                    fontSize="1rem"
                    fontWeight={400}
                    marginX={4}
                >
                    {name}
                </Tag>
                <Registreringsfelt vektobjekt={vektobjekt} onChange={onChange} />
            </Flex>
        </>
    );
};
