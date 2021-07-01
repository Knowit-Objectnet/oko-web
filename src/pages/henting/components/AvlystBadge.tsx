import * as React from 'react';
import { Badge, BadgeProps, Icon } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/layout';
import Warning from '../../../assets/Warning.svg';

export const AvlystBadge: React.FC<BadgeProps> = (props) => (
    <Badge as={Flex} variant="solid" backgroundColor="error" color="onError" fontSize="0.8rem" {...props}>
        <Icon as={Warning} transform="translateY(-2px)" /> Avlyst
    </Badge>
);
