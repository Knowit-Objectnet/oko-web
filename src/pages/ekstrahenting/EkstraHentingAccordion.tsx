import { AccordionButton, AccordionItem, AccordionPanel, Flex, Heading, Icon } from '@chakra-ui/react';
import React from 'react';
import { EkstraHentingTable } from './EkstraHentingTable';
import ArrowRight from '../../assets/ArrowRight.svg';
import { ApiEkstraHenting } from '../../services/henting/EkstraHentingService';

interface Props {
    ekstraHentinger: Array<ApiEkstraHenting>;
    label: string;
    isLoading: boolean;
    isError: boolean;
    isPast: boolean;
}

export const EkstraHentingAccordion: React.FC<Props> = ({ ekstraHentinger, label, isLoading, isError, isPast }) => {
    return (
        <>
            <AccordionItem>
                {({ isExpanded }) => (
                    <Flex direction="column" width="full" marginBottom="12">
                        <Heading as="h3" flex="1" marginBottom="4">
                            <AccordionButton
                                width="fit-content"
                                fontSize="2xl"
                                fontWeight="normal"
                                padding="0"
                                _hover={{ background: 'none', textDecoration: 'underline' }}
                            >
                                <Icon
                                    as={ArrowRight}
                                    transform={`translate(-2px, -2px) rotate(${isExpanded ? '90deg' : '0deg'})`}
                                    transformOrigin="center"
                                    transition="transform 200ms ease-in-out"
                                    marginRight="1"
                                />
                                {label}
                            </AccordionButton>
                        </Heading>

                        <AccordionPanel padding="0">
                            <EkstraHentingTable
                                ekstraHentinger={ekstraHentinger}
                                isLoading={isLoading}
                                isError={isError}
                                isPast={isPast}
                            />
                        </AccordionPanel>
                    </Flex>
                )}
            </AccordionItem>
        </>
    );
};
