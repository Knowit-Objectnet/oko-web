import * as React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { Unit, VektObject } from '../Vektregistrering';
import { useFormContext } from 'react-hook-form';
import { Input } from '../../../../components/forms/input/Input';
import { SelectOption } from '../../../../components/forms/Select';
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

    const options: Array<SelectOption> = [
        { label: 'Kg', value: Unit[0] },
        { label: 'Tonn', value: Unit[1] },
        { label: 'Gram', value: Unit[2] },
    ];

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
            <Flex alignItems="center" {...setValue(`${vektObject.navn}.id`, vektObject.id)}>
                <Input
                    variant="unstyled"
                    backgroundColor="white"
                    type="number"
                    step="any"
                    name={fieldName}
                    label=""
                    textAlign="center"
                    placeholder="0"
                    aria-label="Vektinput"
                    width="6rem"
                    height="2.5rem"
                    marginRight={2}
                    defaultValue={0}
                />
                {/*<Select*/}
                {/*    name={`${vektObject.navn}.unit`}*/}
                {/*    label=""*/}
                {/*    backgroundColor={colors.LightBeige}*/}
                {/*    style={{ textAlignLast: 'center' }}*/}
                {/*    aria-label="Vektenhet"*/}
                {/*    height="2.5rem"*/}
                {/*    width="8rem"*/}
                {/*    options={options}*/}
                {/*/>*/}
                <Text>kg</Text>
            </Flex>
        </>
    );
};
