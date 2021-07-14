import React from 'react';
import { LinkBox, LinkBoxProps, LinkOverlay, Text } from '@chakra-ui/react';
import { CalendarEvent } from '../hooks/useCalendarEvents';
import { Link, useLocation } from 'react-router-dom';
import { Box } from '@chakra-ui/layout';
import { formatTime } from '../../../utils/formatDateTime';
import { AvlystBadge } from '../../henting/components/AvlystBadge';
import { useAuth } from '../../../auth/useAuth';

const getEventStyle = (event: CalendarEvent) => {
    if (event.hentingWrapper.planlagtHenting?.avlyst) {
        return {
            backgroundColor: 'errorBackground',
            color: 'onError',
            borderColor: 'error',
        };
    }

    return {
        backgroundColor: 'surface',
        color: 'onSurface',
        borderColor: 'DarkBeige',
    };
};

interface Props extends Pick<LinkBoxProps, 'position' | 'top' | 'left' | 'height' | 'width' | 'margin'> {
    event: CalendarEvent;
    compactView?: boolean;
}

export const EventComponent: React.FC<Props> = ({ event, compactView, ...props }) => {
    const location = useLocation();
    const { user } = useAuth();

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
            {...getEventStyle(event)}
            {...props}
        >
            {/* <Box fontSize="12px" fontWeight="normal" marginRight={compactView ? '1' : 0}>
                <time>{formatTime(event.start)}</time>–<time>{formatTime(event.end)}</time>
            </Box> */}
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
            {/* {event.hentingWrapper.planlagtHenting?.avlyst && !compactView ? (
                <Box paddingTop="1">
                    <AvlystBadge backgroundColor="transparent" padding={0} />
                </Box>
            ) : null} */}
        </LinkBox>
    );
};
