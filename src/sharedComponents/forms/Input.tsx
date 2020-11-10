import * as React from 'react';
import styled from 'styled-components';
import ErrorText from './ErrorText';

const Wrapper = styled.span`
    display: block;
    width: 100%;
`;

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
}

const Input = React.forwardRef<HTMLInputElement, Props>(({ error, ...rest }, forwardRef) => (
    <Wrapper>
        {error && <ErrorText error={error} />}
        <input {...rest} ref={forwardRef} />
    </Wrapper>
));

Input.displayName = 'Input';

export default Input;
