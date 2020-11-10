import * as React from 'react';
import styled from 'styled-components';
import ErrorText from './ErrorText';

const Test = styled.span`
    display: block;
    width: 100%;
`;

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
}

const Input = React.forwardRef<HTMLInputElement, Props>(({ error, ...rest }, forwardRef) => (
    <Test>
        {error && <ErrorText error={error} />}
        <input {...rest} ref={forwardRef} />
    </Test>
));

Input.displayName = 'Input';

export default Input;
