import React from 'react';
import { Button, Heading, HStack, Icon, Link, List, ListItem } from '@chakra-ui/react';
import { NavLink, Route, useRouteMatch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Flex } from '@chakra-ui/layout';
import Plus from '../../assets/Plus.svg';
import { mockPartnere as partnere } from '../../../__mocks__/mocks-new/mockAktor';
import { ApiPartner } from '../../services-new/AktorService';
import { PartnerInfo } from './PartnerInfo';

const PartnerNavList: React.FC = () => {
    const { url } = useRouteMatch();
    return (
        <List spacing={2}>
            {(partnere ?? []).map((partner: ApiPartner) => (
                <ListItem key={partner.id}>
                    <Link
                        as={NavLink}
                        to={`${url}/${partner.id}`}
                        _activeLink={{
                            fontWeight: 'bold',
                            '&:before': {
                                content: `""`,
                                display: 'block',
                                width: '8px',
                                height: '8px',
                                backgroundColor: 'onSurface',
                                borderRadius: '50%',
                                position: 'absolute',
                                transform: 'translate(-20px, 80%)',
                            },
                        }}
                        display="block"
                        paddingLeft="20px"
                        position="relative"
                    >
                        {partner.navn}
                    </Link>
                </ListItem>
            ))}
        </List>
    );
};

export const Avtaler: React.FC = () => {
    const { url } = useRouteMatch();

    return (
        <>
            <Helmet>
                <title>Avtaler</title>
            </Helmet>
            <HStack alignItems="stretch" padding={5} spacing={10} height="100%" marginX="auto" maxWidth="100%">
                <Flex
                    direction="column"
                    as="nav"
                    alignItems="flex-start"
                    backgroundColor="surface"
                    height="100%"
                    padding={5}
                    minWidth="300px"
                >
                    <Heading
                        as="h2"
                        width="100%"
                        fontSize="xl"
                        paddingBottom={3}
                        marginBottom={4}
                        borderBottom="1px solid"
                        borderBottomColor="DarkBeige"
                    >
                        Partnere
                    </Heading>
                    <PartnerNavList />
                    <Button
                        leftIcon={<Icon as={Plus} />}
                        variant="outline"
                        width="100%"
                        borderColor="Black"
                        marginTop={10}
                    >
                        Legg til partner
                    </Button>
                </Flex>
                <Route path={`${url}/:partnerId`}>
                    <PartnerInfo />
                </Route>
            </HStack>
        </>
    );
};
