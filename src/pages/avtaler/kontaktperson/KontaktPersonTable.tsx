import * as React from 'react';
import { ButtonGroup, Flex, Icon, Link } from '@chakra-ui/react';
import { ApiKontakt } from '../../../services/aktor/KontaktService';
import { EditKontaktPersonButton } from './EditKontaktPersonButton';
import { DeleteKontaktPersonButton } from './DeleteKontaktPersonButton';
import { List, ListItem } from '@chakra-ui/react';
import DefaultProfilePic from '../../../assets/Default_profile_pic.svg';

interface Props {
    kontaktPersoner: Array<ApiKontakt>;
}

export const KontaktPersonTable: React.FC<Props> = ({ kontaktPersoner }) => {
    const sortedKontaktPersoner = kontaktPersoner.sort((kontaktPersonA, kontaktPersonB) =>
        kontaktPersonA.navn.localeCompare(kontaktPersonB.navn, 'nb'),
    );

    return (
        <List>
            {sortedKontaktPersoner.map((kontakt) => (
                <ListItem key={kontakt.id}>
                    <Flex width="full" border="4px solid" borderColor="gray.200" margin="8px" key={kontakt.id}>
                        <Flex padding="8px">
                            <Icon as={DefaultProfilePic} height="30px" width="auto" margin="6" />
                        </Flex>
                        <Flex padding="8px" flexGrow={1}>
                            <List fontSize="12px">
                                <ListItem fontWeight="medium" fontSize="16px">
                                    {kontakt.navn}
                                </ListItem>
                                <ListItem>{kontakt.rolle}</ListItem>
                                <ListItem>{kontakt.telefon ? kontakt.telefon : <span>&nbsp;&nbsp;</span>}</ListItem>
                                <ListItem>
                                    {kontakt.epost ? (
                                        <Link href={`mailto:${kontakt.epost}`}>{kontakt.epost}</Link>
                                    ) : (
                                        <span>&nbsp;&nbsp;</span>
                                    )}
                                </ListItem>
                            </List>
                        </Flex>
                        <Flex padding="8px" textAlign="end">
                            <ButtonGroup spacing="4" size="sm">
                                <EditKontaktPersonButton kontakt={kontakt} />
                                <DeleteKontaktPersonButton kontakt={kontakt} />
                            </ButtonGroup>
                        </Flex>
                    </Flex>
                </ListItem>
            ))}
        </List>
    );
};
