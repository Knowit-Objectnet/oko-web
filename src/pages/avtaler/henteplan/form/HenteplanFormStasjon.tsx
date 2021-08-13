import * as React from 'react';
import { StasjonSelect } from '../../../../components/forms/StasjonSelect';
import { useStasjonById } from '../../../../services/stasjon/useStasjonById';
import { FormLabel } from '../../../../components/forms/FormLabel';
import { FormControl, FormHelperText } from '@chakra-ui/react';
import { Box } from '@chakra-ui/layout';

interface Props {
    stasjonId?: string;
}

const StasjonInfo: React.FC<Required<Props>> = ({ stasjonId }) => {
    const { data: stasjon, isLoading, isLoadingError } = useStasjonById(stasjonId);

    const getStasjonNavn = (): string => {
        if (isLoading) {
            return 'Vennligst vent...';
        }
        if (stasjon && !isLoadingError) {
            return stasjon.navn;
        }
        return 'Klarte ikke hente navn på stasjonen';
    };

    return (
        <FormControl>
            <FormLabel label="Stasjon" />
            <FormHelperText>Hvilken stasjon det skal hentes fra</FormHelperText>
            <Box backgroundColor="gray.100" width="full" padding="5" fontSize="lg">
                {getStasjonNavn()}
            </Box>
        </FormControl>
    );
};

export const HenteplanFormStasjon: React.FC<Props> = ({ stasjonId }) =>
    stasjonId ? (
        <StasjonInfo stasjonId={stasjonId} />
    ) : (
        <StasjonSelect name="stasjonId" label="Stasjon" helperText="Hvilken stasjon skal det hentes fra?" required />
    );
