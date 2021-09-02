import * as React from 'react';
import { Flex } from '@chakra-ui/react';
import { Redirect, Route, useRouteMatch, withRouter } from 'react-router-dom';

interface Props {
    to: string;
    callback: string;
}

export const FormRedirect: React.FC<Props> = ({ to, callback, children }) => {
    const { url } = useRouteMatch();

    return <Redirect to={`${url}/${to}`} />;
};

export const FormWrapper: React.FC<Props> = ({ to, callback, children }) => {
    const { url } = useRouteMatch();

    return (
        <Route exact path={`${url}/${to}`}>
            <Flex
                as="main"
                direction="column"
                paddingY="5"
                paddingX="10"
                marginX="auto"
                width="full"
                alignItems="flex-start"
                backgroundColor="surface"
            >
                {children}
            </Flex>
        </Route>
    );
};
