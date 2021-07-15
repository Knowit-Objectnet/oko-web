import { Button, Icon } from '@chakra-ui/react';
import * as React from 'react';
import { colors } from '../../../theme/foundations/colors';
import Calendar from '../../../assets/Calendar.svg';

export const HentingButton: React.FC = () => (
    <>
        <Button
            variant="outline"
            rightIcon={<Icon as={Calendar} boxSize="1.5rem" />}
            backgroundColor="transparent"
            textColor={colors.DarkBlue}
            fontWeight={400}
            paddingX={8}
            paddingY={5}
        >
            Registrer vekt
        </Button>
    </>
);
