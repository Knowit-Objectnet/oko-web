import * as React from 'react';
import { BoxProps, Flex, Icon, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import Plus from '../../../assets/Plus.svg';
import { colors } from '../../../theme/foundations/colors';
import { Link, useLocation } from 'react-router-dom';
import { ApiPlanlagtHenting } from '../../../services/henting/PlanlagtHentingService';

interface Props {
    henting: ApiPlanlagtHenting;
}

export const RegisterVektButton: React.FC<Props & BoxProps> = ({ henting, ...props }) => {
    const location = useLocation();
    return (
        <LinkBox
            as={Flex}
            align="center"
            backgroundColor={colors.DarkBlue}
            justify="center"
            paddingLeft={4}
            paddingRight={2}
            {...props}
        >
            <LinkOverlay
                as={Link}
                to={{
                    pathname: `/vekt/${henting.id}`,
                    state: { henting: henting, prevPath: location.pathname + location.search },
                }}
            />
            <Text textColor={colors.LightBeige} marginRight={4}>
                Registrer vekt
            </Text>
            <Icon fill={colors.LightBeige} as={Plus} w={10} h={10} />
        </LinkBox>
    );
};
