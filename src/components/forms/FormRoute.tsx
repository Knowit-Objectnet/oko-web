import * as React from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import { Redirect, Route, useHistory, useLocation, useRouteMatch, withRouter } from 'react-router-dom';
import { ApiPartner } from '../../services/partner/PartnerService';
import { isNull } from 'lodash';
import { usePartnerById } from '../../services/partner/usePartnerById';

interface Props {
    path: string;
    title: string;
}

interface LocationState {
    partner?: ApiPartner;
    callback: string;
}

export const FormRoute: React.FC<Props> = ({ path, title, children }) => {
    // const { params } = useRouteMatch<{ partnerId?: string }>();
    const history = useHistory();
    const callback_fn = () => history.push(state.callback);
    const { state } = useLocation<LocationState>();

    // TODO: state not present on direct url access.
    //if (isNull(state.partner) && !isNull(params.partnerId)) {
    //    const { data: partner, isLoading, isError } = usePartnerById(params.partnerId!);
    //}

    const Callback: React.FC = (props) => {
        const child: any = React.Children.only(props.children);
        return React.cloneElement(child, { onSuccess: callback_fn, ...state });
    };

    return (
        <Route exact path={path}>
            <Flex
                as="main"
                direction="column"
                width="full"
                alignItems="center"
                backgroundColor="surface"
                justifyContent="center"
                padding="10"
            >
                <Heading marginBottom="4">{title}</Heading>
                <Callback>{children}</Callback>
            </Flex>
        </Route>
    );
};
