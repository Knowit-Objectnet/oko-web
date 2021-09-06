import * as React from 'react';
import { ButtonProps } from '@chakra-ui/react';
import { ApiEkstraHenting } from '../../../services/henting/EkstraHentingService';
import { AddButton } from '../../../components/buttons/AddButton';
import { useHistory, useRouteMatch } from 'react-router-dom';

interface Props {
    henting: ApiEkstraHenting;
}

export const UtlysFlerePartnereButton: React.FC<Omit<ButtonProps, 'onClick'> & Props> = (props) => {
    const history = useHistory();
    const { url } = useRouteMatch();

    const onClick = () =>
        history.push(`${url}/leggtil?hentingId=${props.henting.id}`, { henting: props.henting, callback: url });

    return (
        <AddButton
            label="Legg til flere"
            borderRadius="6"
            aria-label="Legg til flere partnere på ekstrautlysningen"
            {...props}
            onClick={onClick}
        />
    );
};
