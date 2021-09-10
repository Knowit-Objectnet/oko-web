import * as React from 'react';
import { Button, ButtonProps, Icon } from '@chakra-ui/react';
import Plus from '../../../assets/Plus.svg';
import { useAuth } from '../../../auth/useAuth';
import { useHistory, useRouteMatch } from 'react-router-dom';

export const AddEkstraHentingButton: React.FC<Omit<ButtonProps, 'onClick'>> = (props) => {
    const { user } = useAuth();
    const history = useHistory();
    const { url } = useRouteMatch();
    const stasjonId = user.isStasjon ? user.aktorId : undefined;

    const onClick = () =>
        history.push(`${url}/ny${stasjonId ? '?stasjonId=' + stasjonId : ''}`, { stasjonId: stasjonId });

    return (
        <Button leftIcon={<Icon as={Plus} />} {...props} onClick={onClick}>
            Legg til ekstrahenting
        </Button>
    );
};
