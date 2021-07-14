import * as React from 'react';
import { Button, Flex, Icon, LinkBox, LinkOverlay, useToast } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { usePlanlagtHentingById } from '../../../services/henting/usePlanlagtHentingById';
import { ApiPlanlagtHenting } from '../../../services/henting/HentingService';
import { colors } from '../../../theme/foundations/colors';
import { useAuth } from '../../../auth/useAuth';
import Checkbox from '../../../assets/Checkbox.svg';
import { useState } from 'react';
import { Totalvekt } from './components/Totalvekt';
import { RegistrerVektkategori } from './components/RegistrerVektkategori';
import { useSuccessToast } from '../../../components/toasts/useSuccessToast';

interface Props {
    hentingId: string;
}

export interface VektKategorier {
    [key: string]: Vektobjekt;
}

export interface Vektobjekt {
    unit: Unit;
    id: string;
    navn: string;
    value: number;
}

export enum Unit {
    'KG',
    'TONN',
    'GRAM',
}

export const Vektregistrering: React.FC<Props> = ({ hentingId }) => {
    const { user } = useAuth();
    const { state: locationState } = useLocation<{ henting?: ApiPlanlagtHenting; prevPath?: string }>();

    const [total, setVekting] = useState(true);

    const hentingQuery = usePlanlagtHentingById(hentingId, {
        initialData: locationState?.henting,
    });

    const sToast = useSuccessToast();

    const getBackButton = () => {
        if (locationState?.prevPath) {
            return (
                <Button as={Link} to={locationState.prevPath} variant="outline">
                    Tilbake
                </Button>
            );
        }
    };

    // TODO: create better UI for loading and error states
    return hentingQuery.dispatch<React.ReactElement | null>(
        () => null,
        () => <>Vennligst vent...</>,
        () => <>Klarte dessverre ikke å finne informasjon for denne hentingen</>,
        (henting: ApiPlanlagtHenting) => (
            <>
                {total ? (
                    <Totalvekt setState={setVekting} henting={henting} />
                ) : (
                    <RegistrerVektkategori setState={setVekting} henting={henting} />
                )}

                <Flex
                    alignSelf="stretch"
                    alignItems="flex-start"
                    justifyContent={getBackButton() ? 'space-between' : 'flex-end'}
                >
                    {getBackButton()}
                    <Button
                        variant="outline"
                        rightIcon={<Icon as={Checkbox} boxSize="0.7rem" />}
                        backgroundColor={colors.DarkBlue}
                        textColor={colors.White}
                        paddingX={8}
                        paddingY={6}
                        onClick={() => {
                            sToast({ title: `Vekt registrert!` });
                        }}
                    >
                        <LinkOverlay as={Link} to={{ pathname: `/henting/${henting.id}` }} />
                        Lagre vekt og avslutt
                    </Button>
                </Flex>
            </>
        ),
    );
};
