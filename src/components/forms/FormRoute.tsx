import * as React from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';
import { Route, useHistory, useLocation } from 'react-router-dom';
import { ApiPartner } from '../../services/partner/PartnerService';
import { usePartnerById } from '../../services/partner/usePartnerById';
import { Roles } from '../../auth/Roles';
import { ProtectedRoute } from '../../routing/ProtectedRoute';
import { Loading } from '../Loading';
import { useStasjonById } from '../../services/stasjon/useStasjonById';
import { ApiStasjon } from '../../services/stasjon/StasjonService';
import { ApiAvtale } from '../../services/avtale/AvtaleService';
import { ApiHenteplan } from '../../services/henteplan/HenteplanService';
import { useHenteplanById } from '../../services/henteplan/useHenteplanById';
import { ApiEkstraHenting } from '../../services/henting/EkstraHentingService';
import { useAktorById } from '../../services/aktor/useAktorById';
import { ApiAktor } from '../../services/aktor/AktorService';
import { ApiKontakt } from '../../services/aktor/KontaktService';
import { ApiKategori } from '../../services/kategori/KategoriService';
import { useKontaktById } from '../../services/aktor/useKontaktById';
import { useKategoriById } from '../../services/kategori/useKategoriById';
import { useAvtaleById } from '../../services/avtale/useAvtaleById';
import { useEkstraHentingById } from '../../services/henting/useEkstraHentingById';
import queryString, { ParsedQuery } from 'query-string';

interface Props {
    path: string;
    title: string;
    requiredRoles?: Array<Roles>;
}

interface LocationState {
    partner?: ApiPartner;
    stasjon?: ApiStasjon;
    avtale?: ApiAvtale;
    henteplan?: ApiHenteplan;
    henting?: ApiEkstraHenting;
    aktor?: ApiAktor;
    kontakt?: ApiKontakt;
    kategori?: ApiKategori;
}

function recreateState(params: ParsedQuery) {
    const paramToHook: Record<string, (id: string) => any> = {
        partnerId: usePartnerById,
        stasjonId: useStasjonById,
        avtaleId: useAvtaleById,
        henteplanId: useHenteplanById,
        hentingId: useEkstraHentingById,
        kontaktId: useKontaktById,
        aktorId: useAktorById,
        kategoriId: useKategoriById,
    };

    const state: Record<string, any> = {};
    let loading = false;
    let error = false;

    const paramToState: Record<string, string> = {
        partnerId: 'partner',
        stasjonId: 'stasjon',
        avtaleId: 'avtale',
        henteplanId: 'henteplan',
        hentingId: 'henting',
        kontaktId: 'kontakt',
        aktorId: 'aktor',
        kategoriId: 'kategori',
    };

    Object.keys(params).forEach((key) => {
        const func = paramToHook[key];
        const { data, isLoading, isError } = func(params[key] as string);
        state[paramToState[key]] = data;
        loading = loading || isLoading;
        error = error || isError;
    });

    return { state, isLoading: loading, isError: error };
}

export const FormRoute: React.FC<Props> = ({ path, title, requiredRoles, children }) => {
    const history = useHistory();
    const params = queryString.parse(useLocation().search);
    const callback_fn = () => history.goBack();
    let { state } = useLocation<LocationState>();
    let isLoading;
    let isError;

    if (state === undefined) {
        const recreatedState = recreateState(params);
        state = recreatedState.state;
        isLoading = recreatedState.isLoading;
        isError = recreatedState.isError;
    }

    const StatefulForm: React.FC = (props) => {
        const child: any = React.Children.only(props.children);
        return React.cloneElement(child, { onSuccess: callback_fn, ...state, ...params });
    };

    const FormPage: React.FC = () => (
        <Flex
            as="main"
            direction="column"
            width="full"
            alignItems="center"
            backgroundColor="surface"
            justifyContent="center"
            padding="10"
        >
            <Heading marginBottom="4">{title}</Heading>
            <StatefulForm>{children}</StatefulForm>
        </Flex>
    );

    if (isLoading) {
        return <Loading isFullPage />;
    }

    if (isError) {
        return <Box>Skjemaet lastet ikke inn riktig.</Box>;
    }

    if (requiredRoles)
        return (
            <ProtectedRoute exact path={path} requiredRoles={requiredRoles}>
                <FormPage />
            </ProtectedRoute>
        );
    else
        return (
            <Route exact path={path}>
                <FormPage />
            </Route>
        );
};
