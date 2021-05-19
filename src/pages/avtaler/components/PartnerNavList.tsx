import React from 'react';
import { List, ListItem } from '@chakra-ui/react';
import { PartnerNavItem } from './PartnerNavItem';
import { mockPartnere } from '../../../../__mocks__/mocks-new/mockAktor';

export const PartnerNavList: React.FC = () => {
    // TODO: fetch partners from API/cache
    const partnere = mockPartnere;

    return (
        <List spacing={2}>
            {(partnere ?? []).map((partner) => (
                <ListItem key={partner.id}>
                    <PartnerNavItem partner={partner} />
                </ListItem>
            ))}
        </List>
    );
};
