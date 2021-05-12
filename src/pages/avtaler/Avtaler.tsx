import React from 'react';
import { usePartners } from '../../services/hooks/usePartners';
import { Breadcrumb, BreadcrumbLink, Heading, HStack, Link, List, ListItem, VStack } from '@chakra-ui/react';
import { NavLink, useRouteMatch, Link as RouterLink, useLocation, Route } from 'react-router-dom';
import { usePartnerById } from '../../services/hooks/usePartnerById';
import { useQueryStringKey } from 'use-route-as-state';

const PartnerInfo: React.FC = () => {
    const { url, params } = useRouteMatch<{ partnerId: string }>();

    // TODO: handle invalid partner Id
    const { data: partner } = usePartnerById(Number(params.partnerId));

    return partner ? (
        <VStack alignItems="flex-start">
            <Breadcrumb>
                <BreadcrumbLink as={RouterLink} to={`${url}`}>
                    Partnere
                </BreadcrumbLink>
            </Breadcrumb>
            <Heading>{partner.name}</Heading>
        </VStack>
    ) : (
        <>Laster data...</>
    );
};

export const Avtaler: React.FC = () => {
    const { url } = useRouteMatch();
    const { data: partners } = usePartners();

    return (
        <HStack alignItems="flex-start">
            <VStack as="nav" alignItems="flex-start">
                <Heading as="h2">Partnere</Heading>
                <List>
                    {(partners ?? []).map((partner) => (
                        <ListItem key={partner.id}>
                            <Link as={NavLink} to={`${url}/partner/${partner.id}`}>
                                {partner.name}
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </VStack>
            <Route path={`${url}/partner/:partnerId`}>
                <PartnerInfo />
            </Route>
        </HStack>
    );
};
