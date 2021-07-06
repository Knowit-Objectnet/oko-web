import * as React from 'react';
import { ButtonGroup, Flex, HStack, Icon, Link, Text } from '@chakra-ui/react';
import { ApiKontakt } from '../../services/aktor/KontaktService';
import { EditKontaktPersonButton } from './EditKontaktPersonButton';
import { DeleteKontaktPersonButton } from './DeleteKontaktPersonButton';
import { List, ListItem } from '@chakra-ui/react';
import DefaultProfilePic from '../../assets/Default_profile_pic.svg';

interface Props {
    kontaktPersoner: Array<ApiKontakt>;
}

export const KontaktPersonList: React.FC<Props> = ({ kontaktPersoner }) => {
    const sortedKontaktPersoner = kontaktPersoner.sort((kontaktPersonA, kontaktPersonB) =>
        kontaktPersonA.navn.localeCompare(kontaktPersonB.navn, 'nb'),
    );

    return (
        <List>
            {sortedKontaktPersoner.map((kontakt) => (
                <ListItem key={kontakt.id}>
                    <HStack
                        width="full"
                        border="4px solid"
                        spacing="4"
                        borderColor="gray.200"
                        marginBottom="3"
                        alignItems="flex-start"
                        padding="5"
                        key={kontakt.id}
                    >
                        <Icon
                            as={DefaultProfilePic}
                            height="8"
                            width="auto"
                            aria-hidden="true"
                            fill="primary"
                            marginTop="2"
                        />
                        <Flex fontSize="md" flexGrow={1} direction="column" alignItems="flex-start">
                            <Text fontWeight="medium" fontSize="lg" aria-label="Navn">
                                {kontakt.navn}
                            </Text>
                            <Text aria-label="Rolle">{kontakt.rolle}</Text>
                            {kontakt.telefon ? <Text aria-label="Telefonnummer"> {kontakt.telefon} </Text> : null}

                            {kontakt.epost ? (
                                <Text aria-label="E-postadresse">
                                    <Link href={`mailto:${kontakt.epost}`}>{kontakt.epost}</Link>
                                </Text>
                            ) : null}
                        </Flex>
                        <ButtonGroup spacing="4" size="sm">
                            <EditKontaktPersonButton kontakt={kontakt} />
                            <DeleteKontaktPersonButton kontakt={kontakt} />
                        </ButtonGroup>
                    </HStack>
                </ListItem>
            ))}
        </List>
    );
};
