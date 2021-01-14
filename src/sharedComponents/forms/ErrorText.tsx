import * as React from 'react';
import styled from 'styled-components';

const ErrorText = styled.span`
    color: ${(props) => props.theme.colors.Red};
    display: flex;
    flex-wrap: wrap;
    font-size: 0.8em;
`;

export default ErrorText;
