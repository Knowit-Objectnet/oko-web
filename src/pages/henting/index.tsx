import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Flex } from '@chakra-ui/layout';

const Henting: React.FC = () => (
    <>
        <Helmet>
            {/*TODO: create title from calendar state*/}
            <title>Kalender</title>
        </Helmet>
        <Flex width="full" height="full" backgroundColor="surface" />
    </>
);

export default Henting;
