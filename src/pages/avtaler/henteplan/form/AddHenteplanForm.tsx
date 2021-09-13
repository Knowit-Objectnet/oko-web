import React from 'react';
import { HenteplanForm, HenteplanFormData } from './HenteplanForm';
import { useAddHenteplan } from '../../../../services/henteplan/useAddHenteplan';
import { createNewHenteplan } from './henteplanFormUtils';
import { useSuccessToast } from '../../../../components/toasts/useSuccessToast';
import { ApiAvtale } from '../../../../services/avtale/AvtaleService';

interface Props {
    avtale?: ApiAvtale;
    /** Callback that will fire if registration is successful: **/
    onSuccess?: () => void;
}

export const AddHenteplanForm: React.FC<Props> = ({ avtale, onSuccess }) => {
    const formValues = {
        startDato: avtale!.startDato,
        sluttDato: avtale!.sluttDato,
    };

    const addHenteplanMutation = useAddHenteplan();
    const showSuccessToast = useSuccessToast();

    const handleSubmit = (formData: HenteplanFormData) => {
        const newHenteplan = createNewHenteplan(avtale!.id, formData);

        return addHenteplanMutation.mutateAsync(newHenteplan, {
            onSuccess: () => {
                showSuccessToast({ title: `Henteplanen ble registrert` });
                onSuccess?.();
            },
        });
    };

    return (
        <HenteplanForm
            avtale={avtale!}
            defaultFormValues={formValues}
            onSubmit={handleSubmit}
            submitLoading={addHenteplanMutation.isLoading}
        />
    );
};
