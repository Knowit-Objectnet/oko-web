import * as React from 'react';
import { ButtonGroup, Flex, HStack, Icon, Link, Tag, Text } from '@chakra-ui/react';
import { ApiKontakt } from '../../services/aktor/KontaktService';
import { EditKontaktPersonButton } from './EditKontaktPersonButton';
import { DeleteKontaktPersonButton } from './DeleteKontaktPersonButton';
import { List, ListItem } from '@chakra-ui/react';
import DefaultProfilePic from '../../assets/Default_profile_pic.svg';
import { OpenVerificationFormButon } from './OpenVerificationFormButton';

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
                                    <Link href={`mailto:${kontakt.epost}`} marginRight="2">
                                        {kontakt.epost}
                                    </Link>
                                </Text>
                            ) : null}
                        </Flex>
                        <Flex flexDirection="column" height="100%" display={{ base: 'none', tablet: 'flex' }}>
                            <ButtonGroup spacing="4" size="xs" justifyContent="flex-end">
                                <EditKontaktPersonButton kontakt={kontakt} />
                                <DeleteKontaktPersonButton kontakt={kontakt} />
                                {(kontakt.telefon && !kontakt.verifiseringStatus.telefonVerifisert) ||
                                (kontakt.epost && !kontakt.verifiseringStatus.epostVerifisert) ? (
                                    <OpenVerificationFormButon kontakt={kontakt} />
                                ) : null}
                            </ButtonGroup>
                            <Flex marginTop="4">
                                {kontakt.telefon && !kontakt.verifiseringStatus.telefonVerifisert ? (
                                    <Tag backgroundColor="Red" margin="1">
                                        SMS ikke verifisert
                                    </Tag>
                                ) : null}
                                {kontakt.epost && !kontakt.verifiseringStatus.epostVerifisert ? (
                                    <Tag backgroundColor="Red" margin="1">
                                        Epost ikke verifisert
                                    </Tag>
                                ) : null}
                            </Flex>
                        </Flex>
                    </HStack>
                </ListItem>
            ))}
        </List>
    );
};
