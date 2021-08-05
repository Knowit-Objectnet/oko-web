import React from 'react';
import { LinkBox, LinkBoxProps, LinkOverlay, Text } from '@chakra-ui/react';
import { CalendarEvent } from '../hooks/useCalendarEvents';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../auth/useAuth';
import { getColorOfAktor } from '../../../utils/gradientColors';
import { colors } from '../../../theme/foundations/colors';

interface Props extends Pick<LinkBoxProps, 'position' | 'top' | 'left' | 'height' | 'width' | 'margin'> {
    event: CalendarEvent;
    compactView?: boolean;
}

// const addColorBand = (bandColor: string, backgroundColor: string) => {
//     return `linear-gradient(225deg, ${backgroundColor} 8px, ${bandColor} 8px, ${bandColor} 24px, ${backgroundColor} 24px)`;
// };

export const EventComponent: React.FC<Props> = ({ event, compactView, ...props }) => {
    const location = useLocation();
    const { user } = useAuth();

    // const getEventStyle = (event: CalendarEvent) => {
    //     const defaultColor = user.isStasjon
    //         ? getColorOfAktor(event.partnerColors, event.hentingWrapper.aktorId)
    //         : getColorOfAktor(event.stasjonColors, event.hentingWrapper.stasjonId);
    //
    //     if (event.hentingWrapper.planlagtHenting?.avlyst) {
    //         return {
    //             background: addColorBand(colors.Red, colors.avlystHenting),
    //         };
    //     }
    //
    //     if (event.hentingWrapper.ekstraHenting) {
    //         return {
    //             background: !event.hentingWrapper.ekstraHenting.godkjentUtlysning
    //                 ? 'ekstraHenting'
    //                 : addColorBand(colors.ekstraHenting, defaultColor),
    //         };
    //     }
    //
    //     return {
    //         background: defaultColor,
    //     };
    // };

    const getEventText = () => {
        return user.isAdmin ? (
            <>
                <Text as="span" fontWeight="medium" textAlign="center">
                    {event.hentingWrapper.aktorNavn || 'Ingen påmeldt'}
                </Text>
                <Text as="span" fontStyle="italic" textAlign="center">
                    {event.hentingWrapper.stasjonNavn}
                </Text>
            </>
        ) : (
            <Text as="span" textAlign="center">
                {user.isPartner ? event.hentingWrapper.stasjonNavn : event.hentingWrapper.aktorNavn || 'Ingen påmeldt'}
            </Text>
        );
    };

    return (
        <LinkBox
            as="article"
            display="flex"
            flexDirection={compactView ? 'row' : 'column'}
            alignItems={compactView ? 'center' : 'flex-start'}
            minHeight="5"
            paddingY="2px"
            paddingX="5px"
            height="auto"
            maxHeight="full"
            width="full"
            maxWidth="full"
            textAlign="left"
            fontSize="sm"
            fontWeight="normal"
            lineHeight="1.3"
            overflow="hidden"
            border="1px solid"
            borderRadius="4px"
            justifyContent="center"
            alignContent="center"
            backgroundColor={event.hentingWrapper.type === 'EKSTRA' ? 'LightGreen' : 'accent'}
            {...props}
        >
            {/*{...getEventStyle(event)}*/}
            <LinkOverlay
                display="flex"
                flexDirection={compactView ? 'row' : 'column'}
                width="full"
                as={Link}
                to={{
                    pathname: `/henting/${event.hentingWrapper.id}`,
                    // We pass the henting object, to avoid unnecessary loading state in details view
                    state: { henting: event.hentingWrapper, prevPath: location.pathname + location.search },
                }}
            >
                {getEventText()}
            </LinkOverlay>
        </LinkBox>
    );
};
