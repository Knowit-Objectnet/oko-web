import { Button, Icon, LinkOverlay } from '@chakra-ui/react';
import * as React from 'react';
import { colors } from '../../../theme/foundations/colors';
import ArrowRight from '../../../assets/ArrowRight.svg';
import { Link, useLocation } from 'react-router-dom';
import { ApiHenting } from '../../../services/henting/HentingService';

interface Props {
    henting: ApiHenting | undefined;
}

export const RegistervektButton: React.FC<Props> = ({ henting }) => {
    const location = useLocation();
    return henting ? (
        <>
            <Button
                variant="outline"
                rightIcon={<Icon as={ArrowRight} boxSize="2rem" />}
                backgroundColor="transparent"
                textColor={colors.DarkBlue}
                fontWeight={400}
                paddingX={8}
                paddingY={6}
            >
                <LinkOverlay
                    as={Link}
                    to={{
                        pathname: `/vekt/${henting.id}`,
                        state: { henting: henting, prevPath: location.pathname + location.search },
                    }}
                />
                Registrer vekt
            </Button>
        </>
    ) : null;
};
