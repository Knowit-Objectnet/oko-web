import * as React from 'react';
import { Box, BoxProps, Flex, Icon, Text } from '@chakra-ui/react';
import Plus from '../../../assets/Plus.svg';
import { colors } from '../../../theme/foundations/colors';

export const RegisterVektButton: React.FC<BoxProps> = ({ ...props }) => {
    return (
        <Box
            as={Flex}
            align="center"
            backgroundColor={colors.DarkBlue}
            justify="center"
            paddingLeft={4}
            paddingRight={2}
        >
            <Text textColor={colors.LightBeige} marginRight={4}>
                Registrer vekt
            </Text>
            <Icon fill={colors.LightBeige} as={Plus} w={10} h={10} />
        </Box>
    );
};
