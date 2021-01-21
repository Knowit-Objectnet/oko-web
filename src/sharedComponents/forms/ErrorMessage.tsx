import * as React from 'react';
import styled from 'styled-components';
import { ErrorMessage as HookFormErrorMessage } from '@hookform/error-message';

const StyledError = styled.span`
    color: ${(props) => props.theme.colors.Red};
    display: flex;
    flex-wrap: wrap;
    font-size: 0.8em;
`;

type Props = React.ComponentPropsWithoutRef<typeof HookFormErrorMessage>;

export const ErrorMessage: React.FC<Props> = ({ name, ...rest }) => (
    <HookFormErrorMessage name={name} as={StyledError} {...rest} />
);
