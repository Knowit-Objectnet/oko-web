import * as React from 'react';
import styled from 'styled-components';

const Text = styled.span`
    color: ${(props) => props.theme.colors.Red};
    display: flex;
    flex-wrap: wrap;
    font-size: 0.8em;
`;

interface Props {
    error: string;
}

const ErrorText: React.FC<Props> = ({ error }) => <Text>{error}</Text>;

export default ErrorText;
