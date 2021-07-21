import { Tag, TagLabel, TagLeftIcon, TagProps, TagRightIcon } from '@chakra-ui/react';
import * as React from 'react';
import { colors } from '../../../theme/foundations/colors';

interface Props {
    text: string;
    color: string;
    iconLeft?: any;
    iconRight?: any;
}

export const BadgeDetail: React.FC<Props & TagProps> = ({ text, color, iconLeft, iconRight, ...props }) => {
    return (
        <Tag variant="solid" backgroundColor={color} padding={2} paddingLeft={4} paddingRight={4} {...props}>
            {iconLeft ? <TagLeftIcon as={iconLeft} marginRight={1.5} /> : null}
            <TagLabel fontSize="0.8rem">{text}</TagLabel>
            {iconRight ? <TagRightIcon as={iconRight} marginLeft={1.5} /> : null}
        </Tag>
    );
};
