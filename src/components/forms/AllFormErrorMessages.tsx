import * as React from 'react';
import { useFormState } from 'react-hook-form';
import { Heading, HStack, Icon, ListItem, UnorderedList } from '@chakra-ui/react';
import Warning from '../../assets/Warning.svg';
import { Box } from '@chakra-ui/layout';

export const AllFormErrorMessages: React.FC = () => {
    const { errors, isValid, isSubmitted } = useFormState();

    return isSubmitted && !isValid ? (
        <HStack
            as="section"
            padding="4"
            backgroundColor="errorBackground"
            color="onError"
            alignItems="flex-start"
            spacing="3"
        >
            <Icon as={Warning} aria-hidden width="5" height="auto" />
            <Box fontSize="sm">
                <Heading as="h3" fontSize="sm" fontWeight="bold" marginBottom="1">
                    Vennligst rett opp følgende feil i skjemaet:
                </Heading>
                <UnorderedList>
                    {Object.values(errors).map((error, index) => (
                        // We use the index as key here on purpose, in order to get the correct order for the errors
                        <ListItem key={index}>{error?.message}</ListItem>
                    ))}
                </UnorderedList>
            </Box>
        </HStack>
    ) : null;
};
