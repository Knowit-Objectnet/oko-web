import React from 'react';
import { LinkBox, LinkBoxProps, LinkOverlay, Text } from '@chakra-ui/react';
import { CalendarEvent } from '../hooks/useCalendarEvents';
import { Link, useLocation } from 'react-router-dom';
import { Box } from '@chakra-ui/layout';
import { AvlystBadge } from '../../henting/HentingDetails';
import { formatTime } from '../../../utils/formatDateTime';

const getEventStyle = (event: CalendarEvent) => {
    if (event.henting.avlyst) {
        return {
            backgroundColor: 'errorBackground',
            color: 'onError',
            border: '1px solid',
            borderColor: 'error',
        };
    }

    return {
        backgroundColor: 'surface',
        color: 'onSurface',
        border: '1px solid',
        borderColor: 'DarkBeige',
    };
};

interface Props extends Pick<LinkBoxProps, 'position' | 'top' | 'left' | 'height' | 'width' | 'margin'> {
    event: CalendarEvent;
    compactView?: boolean;
}

export const EventComponent: React.FC<Props> = ({ event, compactView, ...props }) => {
    const location = useLocation();

    return (
        <LinkBox
            as="article"
            display="flex"
            flexDirection={compactView ? 'row' : 'column'}
            // flexDirection="column"
            alignItems={compactView ? 'center' : 'flex-start'}
            borderRadius="4px"
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
            {...getEventStyle(event)}
            {...props}
        >
            <Box fontSize="12px" fontWeight="normal" marginRight={compactView ? '1' : 0}>
                <time>{formatTime(event.start)}</time>–<time>{formatTime(event.end)}</time>
            </Box>
            <LinkOverlay
                display="flex"
                flexDirection={compactView ? 'row' : 'column'}
                as={Link}
                to={{
                    pathname: `/henting/${event.henting.id}`,
                    // We pass the henting object, to avoid unnecessary loading state in details view
                    state: { henting: event.henting, prevPath: location.pathname + location.search },
                }}
            >
                <Text as="span" marginRight={compactView ? '1' : 0} fontWeight="medium">
                    {event.henting.aktorNavn}
                </Text>
                <Text as="span" fontStyle="italic">
                    {event.henting.stasjonNavn}
                </Text>
            </LinkOverlay>
            {event.henting.avlyst && !compactView ? (
                <Box paddingTop="1">
                    <AvlystBadge backgroundColor="transparent" padding={0} />
                </Box>
            ) : null}
        </LinkBox>
    );
};
