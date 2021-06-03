import * as React from 'react';
import { useState } from 'react';
import { ApiAvtale } from '../../../services/avtale/AvtaleService';
import { ApiPartner } from '../../../services/partner/PartnerService';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSuccessToast } from '../../../components/toasts/useSuccessToast';
import { ApiHenteplanPost, HenteplanFrekvens } from '../../../services/henteplan/HenteplanService';
import { useAddHenteplan } from '../../../services/henteplan/useAddHenteplan';
import * as yup from 'yup';
import { RadiobuttonGroup, RadioOption } from '../../../components/forms/RadiobuttonGroup';
import { Stack } from '@chakra-ui/react';
import { RequiredFieldsInstruction } from '../../../components/forms/RequiredFieldsInstruction';
import { ErrorMessages } from '../../../components/forms/ErrorMessages';
import { FormSubmitButton } from '../../../components/forms/FormSubmitButton';
import { StasjonSelect } from '../../../components/forms/StasjonSelect';

// NB! Setting the error messages used by yup
import '../../../utils/forms/formErrorMessages';
import { TimeInput } from '../../../components/forms/TimeInput';
import { transformDate } from '../../../utils/forms/transformDate';
import { transformTime } from '../../../utils/forms/transformTime';

interface HenteplanFormData {
    stasjonId: string;
    frekvens: HenteplanFrekvens;
    // startDato: Date;
    // sluttDato?: Date;
    startTidspunkt: Date;
    sluttTidspunkt: Date;
    // ukedag?: Weekday;
    // merknad?: string;
}

const frekvensOptions: Array<RadioOption<HenteplanFrekvens>> = [
    { value: 'ENKELT', label: 'Enkelthendelse' },
    { value: 'UKENTLIG', label: 'Ukentlig' },
    { value: 'ANNENHVER', label: 'Annenhver uke' },
];

const validationSchema = yup.object().shape({
    stasjonId: yup.string().label('hvilken stasjon det skal hentes fra').required(),
    frekvens: yup
        .mixed<HenteplanFrekvens>()
        .label('frekvens for henteplanen')
        .required()
        .oneOf(frekvensOptions.map((frekvens) => frekvens.value)),
    startTidspunkt: yup.date().label('starttidspunkt for hentingen').transform(transformTime).required().nullable(),
    sluttTidspunkt: yup
        .date()
        .label('sluttidspunkt for hentingene')
        .transform(transformTime)
        .required()
        .min(yup.ref('startTidspunkt'), 'Sluttidspunktet for hentingene kan ikke være før starttidspunktet')
        .nullable(),
});

interface Props {
    avtale: ApiAvtale;
    partner: ApiPartner;
    /** Callback that will fire if registration of new Stasjon is successful: **/
    onSuccess?: () => void;
}

export const HenteplanForm: React.FC<Props> = ({ avtale, partner, onSuccess }) => {
    const formMethods = useForm<HenteplanFormData>({
        resolver: yupResolver(validationSchema),
        // TODO: if form is in edit mode: pass original values as "defaultValues" here
    });

    const addHenteplanMutation = useAddHenteplan();
    const showSuccessToast = useSuccessToast();
    const [apiOrNetworkError, setApiOrNetworkError] = useState<string>();

    const handleSubmit = formMethods.handleSubmit((data) => {
        console.log(data);

        const newHenteplan: ApiHenteplanPost = {
            avtaleId: avtale.id,
            frekvens: data.frekvens,
            stasjonId: data.stasjonId,
            sluttTidspunkt: '',
            startTidspunkt: '',
            ukedag: undefined,
        };

        console.log(newHenteplan);

        //     setApiOrNetworkError(undefined);
        //
        //     const newHenteplan: ApiHenteplanPost = {
        //         avtaleId: '',
        //         frekvens: undefined,
        //         sluttTidspunkt: '',
        //         startTidspunkt: '',
        //         stasjonId: '',
        //         ukedag: undefined,
        //     };
        //
        //     addHenteplanMutation.mutate(newHenteplan, {
        //         onSuccess: () => {
        //             showSuccessToast({ title: `Henteplanen ble registrert` });
        //             onSuccess?.();
        //         },
        //         onError: (error) => {
        //             // TODO: get details from error and set appropriate message.
        //             //  If caused by user: set message to correct field
        //             setApiOrNetworkError('Uffda, noe gikk galt ved registreringen. Vennligst prøv igjen.');
        //         },
        //     });
    });

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit}>
                <Stack direction="column" spacing="8">
                    <RequiredFieldsInstruction />
                    <ErrorMessages globalError={apiOrNetworkError} />
                    <StasjonSelect label="Stasjon" required name="stasjonId" />
                    <RadiobuttonGroup
                        name="frekvens"
                        label="Frekvens"
                        helperText="Hvor ofte skal hentingene foregå?"
                        options={frekvensOptions}
                        required
                    />
                    {/*<DateInput name="startDato" label="Startdato for avtalen" required />*/}
                    {/*<DateInput name="sluttDato" label="Sluttdato for avtalen" required />*/}
                    <TimeInput name="startTidspunkt" label="Starttidspunkt" required />
                    <TimeInput name="sluttTidspunkt" label="Sluttidspunkt" required />
                    <FormSubmitButton
                        label="Registrer ny henteplan"
                        isLoading={addHenteplanMutation.isLoading}
                        loadingText="Vennligst vent..."
                    />
                </Stack>
            </form>
        </FormProvider>
    );
};
