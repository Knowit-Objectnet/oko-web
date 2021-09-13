import * as React from 'react';
import { Button, ButtonProps, Icon } from '@chakra-ui/react';
import Plus from '../../assets/Plus.svg';
import { Flex } from '@chakra-ui/layout';
import { useHistory, useRouteMatch } from 'react-router-dom';

export const AddAarsakButton: React.FC<Omit<ButtonProps, 'onClick'>> = (props) => {
    const history = useHistory();
    const { url } = useRouteMatch();

    const onClick = () => history.push(`${url}/ny`);

    return (
        <Flex margin="15">
            <Button variant="primary" leftIcon={<Icon as={Plus} />} {...props} onClick={onClick}>
                Legg til avlysningsårsak
            </Button>
        </Flex>
    );
};
