import * as React from 'react';
import { colors } from '../../../theme/foundations/colors';
import { Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { DetailWithIcon } from '../../henting/components/DetailWithIcon';
import Location from '../../../assets/Location.svg';
import Calendar from '../../../assets/Calendar.svg';
import { RegistervektButton } from './RegistervektButton';
import { KategoriBadge } from './KategoriBadge';

export const MissingRegistration: React.FC = () => (
    <>
        <HStack
            justifyContent="space-between"
            alignItems="center"
            paddingX={6}
            paddingY={4}
            backgroundColor={colors.Red}
            marginTop={4}
            spacing={20}
        >
            <Heading fontSize="1.5rem" fontWeight="bold" textAlign="center">
                Ikke registrert vekt
            </Heading>
            <HStack>
                <KategoriBadge name="Bygg" />
                <KategoriBadge name="Barn" />
                <KategoriBadge name="Møbler" />
            </HStack>
            <VStack alignItems="flex-start">
                <DetailWithIcon icon={Location} label="Stasjon">
                    Grønmo
                </DetailWithIcon>
                <DetailWithIcon icon={Calendar} label="Dato og tidspunk">
                    <Text>
                        {/*
                    <time>{getDayString(parseISOIgnoreTimezone(henting.startTidspunkt))}</time>
                    {` kl `}
                    <time>{formatTime(parseISOIgnoreTimezone(henting.startTidspunkt))}</time>
                    {`-`}
                    <time>{formatTime(parseISOIgnoreTimezone(henting.sluttTidspunkt))}</time>
                    */}
                        1.3.21
                        {` kl `}
                        07:00-09:00
                    </Text>
                </DetailWithIcon>
            </VStack>
            <RegistervektButton />
        </HStack>
    </>
);
