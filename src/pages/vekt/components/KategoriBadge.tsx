import * as React from 'react';
import { Tag } from '@chakra-ui/react';

interface Props {
    name: string;
}

export const KategoriBadge: React.FC<Props> = ({ name }) => {
    return (
        <>
            <Tag size="md" paddingX={3} paddingY={1} fontSize="0.8rem" fontWeight={400}>
                {name}
            </Tag>
        </>
    );
};
