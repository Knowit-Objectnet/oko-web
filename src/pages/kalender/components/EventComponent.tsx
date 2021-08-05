import React from 'react';
import { LinkBox, LinkBoxProps, LinkOverlay, Text } from '@chakra-ui/react';
import { CalendarEvent } from '../hooks/useCalendarEvents';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../auth/useAuth';
import { colors } from '../../../theme/foundations/colors';
import { HentingDetailsRoutingProps } from '../../henting/HentingDetails';

const addColorBand = (bandColor: string, backgroundColor: string) => {
    return `linear-gradient(225deg, ${backgroundColor} 8px, ${bandColor} 8px, ${bandColor} 24px, ${backgroundColor} 24px)`;
};

const getEventColor = (event: CalendarEvent) => {
    if (event.hentingWrapper.planlagtHenting?.avlyst) {
        return {
            background: addColorBand(colors.Red, colors.avlystHenting),
        };
    }

    if (event.hentingWrapper.ekstraHenting) {
        return {
            background: !event.hentingWrapper.ekstraHenting.godkjentUtlysning
                ? 'ekstraHenting'
                : addColorBand(colors.ekstraHenting, event.color),
        };
    }

    return {
        background: event.color,
    };
};

interface Props extends Pick<LinkBoxProps, 'position' | 'top' | 'left' | 'height' | 'width' | 'margin'> {
    event: CalendarEvent;
    compactView?: boolean;
}

export const EventComponent: React.FC<Props> = ({ event, compactView, ...props }) => {
    const { user } = useAuth();

    const getEventText = () => {
        return user.isAdmin ? (
            <>
                <Text
                    as="span"
                    fontWeight="medium"
                    textAlign="center"
                    whiteSpace={compactView ? 'nowrap' : 'normal'}
                    paddingRight={compactView ? '1' : '0'}
                >
                    {event.hentingWrapper.aktorNavn || 'Ingen påmeldt'}
                </Text>
                <Text as="span" fontStyle="italic" textAlign="center" whiteSpace="nowrap">
                    {event.hentingWrapper.stasjonNavn}
                </Text>
            </>
        ) : (
            <Text as="span" textAlign="center">
                {user.isPartner ? event.hentingWrapper.stasjonNavn : event.hentingWrapper.aktorNavn || 'Ingen påmeldt'}
            </Text>
        );
    };

    // We pass the henting object, to avoid unnecessary loading state in details view
    const linkState: HentingDetailsRoutingProps = { henting: event.hentingWrapper, showBackButton: true };

    return (
        <LinkBox
            as="article"
            display="flex"
            alignItems={compactView ? 'center' : 'flex-start'}
            flexDirection={compactView ? 'row' : 'column'}
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
            {...getEventColor(event)}
            {...props}
        >
            <LinkOverlay
                display="flex"
                flexDirection={compactView ? 'row' : 'column'}
                width="full"
                as={Link}
                to={{
                    pathname: `/henting/${event.hentingWrapper.id}`,
                    state: linkState,
                }}
            >
                {getEventText()}
            </LinkOverlay>
        </LinkBox>
    );
};
