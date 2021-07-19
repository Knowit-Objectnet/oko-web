import { Button, Icon } from '@chakra-ui/react';
import * as React from 'react';
import { colors } from '../../../theme/foundations/colors';
import ArrowRight from '../../../assets/ArrowRight.svg';

export const RegistervektButton: React.FC = () => (
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
            Registrer vekt
        </Button>
    </>
);