import * as React from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

interface Props extends ButtonProps {
    visible?: boolean;
}

export const BackButton: React.FC<Props> = ({ visible, ...props }) => {
    const history = useHistory();

    const goBack = () => history.goBack();

    return visible ? (
        <Button onClick={goBack} variant="outline" {...props}>
            Tilbake
        </Button>
    ) : null;
};
