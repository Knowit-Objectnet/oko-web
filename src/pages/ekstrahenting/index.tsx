import * as React from 'react';
import { Helmet } from 'react-helmet';
import { AddEkstraHentingButton } from './forms/AddEkstraHentingButton';
import { Flex } from '@chakra-ui/layout';
import { useAuth } from '../../auth/useAuth';
import { EkstraHentingSortedInfo } from './EkstraHentingSortedInfo';

const EkstraHenting: React.FC = () => {
    const { user } = useAuth();

    return (
        <>
            <Helmet>
                <title>Ekstrahenting</title>
            </Helmet>
            <Flex
                as="main"
                direction="column"
                paddingY="5"
                paddingX="10"
                marginX="auto"
                width={{ base: '100%', desktop: '80%' }}
            >
                {user.isAdmin || user.isStasjon ? (
                    <AddEkstraHentingButton
                        width="fit-content"
                        marginLeft="auto"
                        borderRadius="6"
                        backgroundColor="Green"
                    />
                ) : null}
                <EkstraHentingSortedInfo />
            </Flex>
        </>
    );
};

export default EkstraHenting;
