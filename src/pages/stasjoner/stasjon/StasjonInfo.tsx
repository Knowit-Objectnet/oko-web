import * as React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Flex } from '@chakra-ui/layout';
import { useStasjonById } from '../../../services/stasjon/useStasjonById';
import { StasjonInfoHeader } from './StasjonInfoHeader';
import { KontaktPersonSection } from '../../../components/kontaktperson/KontaktPersonSection';

export const StasjonInfo: React.FC = () => {
    const { params } = useRouteMatch<{ stasjonId: string }>();

    // TODO: handle invalid partner Id and handle loading state more gracefully
    const { data: stasjon, isLoading, isError } = useStasjonById(params.stasjonId);

    if (!params.stasjonId) {
        return null;
    }

    if (isLoading) {
        return <>Laster inn...</>;
    }

    if (isError) {
        return <>Noe gikk galt ved henting av stasjoner.</>;
    }

    if (!stasjon) {
        return <>Kunne ikke finne denne stasjonen.</>;
    }

    return (
        <Flex as="main" alignItems="flex-start" direction="column" flex="1" height="full">
            <StasjonInfoHeader stasjon={stasjon} />
            <KontaktPersonSection aktor={stasjon} isPartner={false} />
        </Flex>
    );
};
