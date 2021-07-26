import * as React from 'react';
import { Helmet } from 'react-helmet';
import { ButtonGroup, Heading, HStack, VStack } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/layout';
import { AddAarsakButton } from './AddAarsakButton';
import { AarsakList } from './AarsakList';
import { useLocation } from 'react-router-dom';
import { ApiAarsak } from '../../services/aarsak/AarsakService';

const Aarsaker: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Avlysningsårsaker</title>
            </Helmet>
            <Flex as="main" direction="column" paddingY="5" paddingX="10" width="full">
                <Heading
                    as="h1"
                    fontWeight="normal"
                    fontSize="4xl"
                    width="full"
                    paddingBottom="4"
                    marginTop="5"
                    marginBottom="4"
                    borderBottom="1px solid"
                    borderBottomColor="gray.200"
                    borderBottomWidth="2"
                >
                    Avlysningsårsaker
                </Heading>
                <HStack margin="15" alignItems="flex-start">
                    <VStack marginRight="20" alignItems="flex-start">
                        <Heading as="h2" fontWeight="bold" fontSize="md" minWidth="500">
                            Stasjon
                        </Heading>
                        <AarsakList isPartnerAarsaker={false} />
                    </VStack>
                    <VStack alignItems="flex-start">
                        <Heading as="h2" fontWeight="bold" fontSize="md" minWidth="500">
                            Partner
                        </Heading>
                        <AarsakList isPartnerAarsaker={true} />
                    </VStack>
                </HStack>
                <ButtonGroup marginRight="30" justifyContent="right">
                    <AddAarsakButton />
                </ButtonGroup>
            </Flex>
        </>
    );
};

export default Aarsaker;
