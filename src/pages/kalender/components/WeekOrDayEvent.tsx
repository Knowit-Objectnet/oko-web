import React from 'react';
import { EventWrapperProps } from 'react-big-calendar';
import { EventComponent } from './EventComponent';

type Props = Pick<EventWrapperProps, 'event' | 'style' | 'onClick'>;

/**
 * Wrapper component that sets the position and size of the event in a "time slot"
 * (a day column in the week or day views)
 */
export const WeekOrDayEvent: React.FC<Props> = ({ event, style, onClick }) => {
    const topAsPercent = style?.top ? `${style.top}%` : undefined;

    return (
        <EventComponent
            position="absolute"
            top={topAsPercent}
            left={style?.xOffset}
            width={style?.width}
            height={style?.height}
            onClick={onClick}
            event={event}
        />
    );
};
