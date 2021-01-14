import * as React from 'react';
import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import ErrorText from './ErrorText';

const Wrapper = styled.span`
    display: block;
    width: 100%;
    margin-bottom: 15px;
`;

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
}

const Input: React.FC<Props> = ({name, label, ...rest}) => {
    const { register, errors } = useFormContext();
    return (
        <Wrapper>
            <input {...rest} placeholder={label} name={name} ref={register} />
            <ErrorMessage errors={errors} name={name} as={ErrorText} />
        </Wrapper>
    )
};

export default Input;
