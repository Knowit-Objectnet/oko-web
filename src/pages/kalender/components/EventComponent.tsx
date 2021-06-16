import React from 'react';
import { LinkBox, LinkBoxProps, LinkOverlay } from '@chakra-ui/react';
import { CalendarEvent } from '../hooks/useCalendarEvents';
import { Link, useRouteMatch } from 'react-router-dom';
import { ApiPlanlagtHenting } from '../../../services/henting/HentingService';

type Props = Pick<LinkBoxProps, 'position' | 'top' | 'left' | 'height' | 'width' | 'margin'> & {
    event: CalendarEvent;
};

export const EventComponent: React.FC<Props> = ({ event, ...props }) => {
    // console.log(props);

    const { url } = useRouteMatch();

    const { resource } = event;
    const planlagtHenting = resource as ApiPlanlagtHenting;

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
            <LinkOverlay as={Link} to={`${url}/${planlagtHenting.id}`}>
                {event.title}
            </LinkOverlay>
        </LinkBox>
    );
};
