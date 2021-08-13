import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Flex } from '@chakra-ui/layout';
import { EkstraHentingSortedInfo } from './EkstraHentingSortedInfo';

const EkstraHenting: React.FC = () => {
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
                width={{ base: '100%', xl: '80%', tablet: '80%', bigTablet: '100%' }}
            >
                <EkstraHentingSortedInfo />
            </Flex>
        </>
    );
};

export default EkstraHenting;
