import React from 'react';
import { HenteplanForm, HenteplanFormData } from './HenteplanForm';
import { useUpdateHenteplan } from '../../../services/henteplan/useUpdateHenteplan';
import { ApiHenteplan } from '../../../services/henteplan/HenteplanService';
import { createUpdatedHenteplan } from './henteplanFormUtils';
import { ApiAvtale } from '../../../services/avtale/AvtaleService';
import { useSuccessToast } from '../../../components/toasts/useSuccessToast';

interface Props {
    avtale: ApiAvtale;
    henteplan: ApiHenteplan;
    /** Callback that will fire if registration is successful: **/
    onSuccess?: () => void;
}

export const EditHenteplanForm: React.FC<Props> = ({ avtale, henteplan, onSuccess }) => {
    const formValues = {
        stasjonId: henteplan.stasjonId,
        frekvens: henteplan.frekvens,
        ukedag: henteplan.ukedag,
        // startDato: localDateFromISO(henteplan.startTidspunkt),
        // sluttDato: localDateFromISO(henteplan.sluttTidspunkt),
        // startTidspunkt: localDateFromISO(henteplan.startTidspunkt),
        // sluttTidspunkt: localDateFromISO(henteplan.sluttTidspunkt),
        kategorier: henteplan.kategorier.map((kategori) => kategori.kategoriId),
        merknad: henteplan.merknad,
    };

    console.log('Henteplan som skal redigeres: ', formValues);

    const updateHenteplanMutation = useUpdateHenteplan();
    const showSuccessToast = useSuccessToast();

    const handleSubmit = (formData: HenteplanFormData) => {
        const updatedHenteplan = createUpdatedHenteplan(henteplan.id, formData);

        return updateHenteplanMutation.mutateAsync(updatedHenteplan, {
            onSuccess: () => {
                showSuccessToast({ title: `Henteplanen ble oppdatert` });
                onSuccess?.();
            },
        });
    };

    return (
        <HenteplanForm
            isEditing
            defaultFormValues={formValues}
            avtale={avtale}
            onSubmit={handleSubmit}
            submitLoading={updateHenteplanMutation.isLoading}
        />
    );
};
