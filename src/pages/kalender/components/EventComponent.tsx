import React from 'react';
import { ButtonProps, Button } from '@chakra-ui/react';
import { CalendarEvent } from '../hooks/useCalendarEvents';

type Props = Pick<ButtonProps, 'onClick' | 'position' | 'top' | 'left' | 'height' | 'width'> & {
    event: CalendarEvent;
};

export const EventComponent: React.FC<Props> = ({ event, ...props }) => {
    return (
        <Button
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
            {event.title}
        </Button>
    );
};
