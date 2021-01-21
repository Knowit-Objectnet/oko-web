import * as React from 'react';
import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from './ErrorMessage';

const Wrapper = styled.span`
    display: block;
    width: 100%;
    margin-bottom: 15px;
`;

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
}

const Input: React.FC<Props> = ({ name, label, ...rest }) => {
    const { register } = useFormContext();
    return (
        <Wrapper>
            <input {...rest} placeholder={label} name={name} ref={register} />
            <ErrorMessage name={name} />
        </Wrapper>
    );
};

export default Input;
