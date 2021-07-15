import * as React from 'react';
import { colors } from '../../../theme/foundations/colors';
import { Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { DetailWithIcon } from '../../henting/components/DetailWithIcon';
import Location from '../../../assets/Location.svg';
import Calendar from '../../../assets/Calendar.svg';
import { KategoriBadge } from './KategoriBadge';
import { HentingButton } from './HentingButton';

export const NoMissingRegistration: React.FC = () => (
    <>
        <HStack
            justifyContent="space-between"
            alignItems="center"
            paddingX={6}
            paddingY={4}
            backgroundColor={colors.LightBeige}
            marginTop={4}
            spacing={20}
        >
            <HStack alignItems="center" spacing={4}>
                <Heading fontSize="1.5rem" fontWeight="bold" textAlign="center">
                    104 tonn
                </Heading>
                <Text fontSize="0.8rem" fontWeight="normal">
                    Registrert 20.12.12
                </Text>
            </HStack>
            <VStack spacing={4}>
                {/* For each kategori */}
                <HStack>
                    <KategoriBadge name="Bygg" />
                    <Text fontSize="0.9rem" fontWeight="normal">
                        23 kg
                    </Text>
                </HStack>
                <HStack>
                    <KategoriBadge name="Barn" />
                    <Text fontSize="0.9rem" fontWeight="normal">
                        23 kg
                    </Text>
                </HStack>
                <HStack>
                    <KategoriBadge name="Møbler" />
                    <Text fontSize="0.9rem" fontWeight="normal">
                        23 kg
                    </Text>
                </HStack>
            </VStack>
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
            <HentingButton />
        </HStack>
    </>
);
