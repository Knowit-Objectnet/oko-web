import React from 'react';
import { Icon, LinkBox, LinkBoxProps, LinkOverlay, Text } from '@chakra-ui/react';
import { CalendarEvent } from '../hooks/useCalendarEvents';
import { Link, useLocation } from 'react-router-dom';
import { Box } from '@chakra-ui/layout';
import Warning from '../../../assets/Warning.svg';
import { AvlystBadge } from '../../henting';

type Props = Pick<LinkBoxProps, 'position' | 'top' | 'left' | 'height' | 'width' | 'margin'> & {
    event: CalendarEvent;
};

export const EventComponent: React.FC<Props> = ({ event, ...props }) => {
    const location = useLocation();

    return (
        <LinkBox
            as="article"
            display="block"
            backgroundColor="surface"
            color="onSurface"
            borderRadius="4px"
            border="1px solid"
            borderColor="DarkBeige"
            paddingY="2px"
            paddingX="5px"
            height="auto"
            maxHeight="full"
            width="full"
            maxWidth="full"
            overflow="hidden"
            textOverflow="ellipsis"
            fontSize="sm"
            fontWeight="medium"
            {...props}
        >
            <LinkOverlay
                as={Link}
                to={{
                    pathname: `/henting/${event.henting.id}`,
                    // We pass the henting object, to avoid unnecessary loading state in details view
                    state: { henting: event.henting, prevPath: location.pathname + location.search },
                }}
            >
                {/*<Box>*/}
                {/*    {event.start}–{event.end}*/}
                {/*</Box>*/}
                <Box>{event.title}</Box>
                {event.henting.avlyst ? <AvlystBadge /> : null}
            </LinkOverlay>
        </LinkBox>
    );
};
