import * as React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { VektObject } from '../Vektregistrering';
import { useFormContext } from 'react-hook-form';
import { Input } from '../../../../components/forms/input/Input';
import { Dispatch, SetStateAction, useEffect } from 'react';

interface FormFieldProps {
    required?: boolean;
}

type FormFieldRenderProp = (fieldProps: { isInvalid: boolean }) => React.ReactNode;

interface Props extends FormFieldProps {
    height?: string;
    width?: string;
    vektObject: VektObject;
    children?: React.ReactNode | FormFieldRenderProp;
    setVekt: Dispatch<SetStateAction<Record<string, number>>>;
}

export const Registreringsfelt: React.FC<Props> = ({ vektObject, setVekt }) => {
    const { setValue, watch } = useFormContext();

    const fieldName = `${vektObject.navn}.value`;
    const fieldValue = watch(fieldName);

    useEffect(() => {
        setVekt((currentVekt) => {
            return {
                ...currentVekt,
                [fieldName]: Number(fieldValue),
            };
        });
    }, [fieldName, fieldValue, setVekt]);

    return (
        <>
            <Flex alignItems="center" {...setValue(`${vektObject.navn}.kategoriId`, vektObject.kategoriId)}>
                <Input
                    variant="unstyled"
                    backgroundColor="white"
                    type="number"
                    step="any"
                    name={fieldName}
                    fontSize="md"
                    label=""
                    textAlign="center"
                    placeholder="0"
                    aria-label="Skriv inn vekt"
                    width="16"
                    height="full"
                    marginRight={2}
                    marginBottom={2}
                    defaultValue={0}
                />
                <Text fontSize="md">kg</Text>
            </Flex>
        </>
    );
};
