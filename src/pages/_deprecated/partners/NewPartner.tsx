import * as React from 'react';
import styled from 'styled-components';
import { useAlert, types } from 'react-alert';
import { useMutation, useQueryClient } from 'react-query';
import { ApiPartnerPost, partnersDefaultQueryKey, postPartner } from '../../../services/_deprecated/PartnerService';
import { PositiveButton } from '../../../components/_deprecated/buttons/PositiveButton';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '../../../components/_deprecated/forms/Input';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background-color: ${(props) => props.theme.colors.LightBeige};
`;

const Title = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    background-color: ${(props) => props.theme.colors.LightBeige};
    padding: 10px 20px;
    margin-bottom: 25px;
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
    box-sizing: border-box;
`;

const StyledForm = styled.form`
    padding: 0 50px 50px;
    display: flex;
    flex-direction: column;
`;

const StyledInput = styled(Input)`
    width: 350px;
    height: 45px;

    &::placeholder {
        text-align: center;
    }
`;

// The type of the form data for the form
type FormData = {
    name: string;
};

const validationSchema = yup.object().shape({
    name: yup.string().label('Navnet til en samarbeidspartner').required().min(2).max(128),
});

interface Props {
    afterSubmit?: (successful: boolean) => void;
}

export const NewPartner: React.FC<Props> = (props) => {
    const alert = useAlert();

    const formMethods = useForm<FormData>({ resolver: yupResolver(validationSchema) });

    const queryClient = useQueryClient();
    const addPartnerMutation = useMutation((newPartner: ApiPartnerPost) => postPartner(newPartner), {
        onSuccess: () => {
            alert.show('Ny partner ble lagt til.', { type: types.SUCCESS });
            props.afterSubmit?.(true);
        },
        onError: () => {
            alert.show('Noe gikk galt, ny partner ble ikke lagt til.', { type: types.ERROR });
            props.afterSubmit?.(false);
        },
        onSettled: () => {
            queryClient.invalidateQueries(partnersDefaultQueryKey);
        },
    });

    const handleNewPartnerSubmission = formMethods.handleSubmit((data) => {
        const newPartner: ApiPartnerPost = data;
        addPartnerMutation.mutate(newPartner);
    });

    return (
        <Wrapper>
            <Title>Legg til ny samarbeidspartner</Title>
            <FormProvider {...formMethods}>
                <StyledForm onSubmit={handleNewPartnerSubmission}>
                    <StyledInput name="name" type="text" label="Navn på organisasjonen" />
                    <PositiveButton isLoading={addPartnerMutation.isLoading}>Legg til samarbeidspartner</PositiveButton>
                </StyledForm>
            </FormProvider>
        </Wrapper>
    );
};
