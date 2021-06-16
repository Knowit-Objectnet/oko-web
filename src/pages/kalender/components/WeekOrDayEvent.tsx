import React from 'react';
import { EventWrapperProps } from 'react-big-calendar';
import { EventComponent } from './EventComponent';

type Props = Pick<EventWrapperProps, 'style' | 'event'>;

/**
 * Wrapper component that sets the position and size of the event in a "time slot"
 * (a day column in the week or day views)
 */
export const WeekOrDayEvent: React.FC<Props> = ({ event, style }) => {
    const topAsPercent = style?.top ? `${style.top}%` : undefined;

    return (
        <EventComponent
            position="absolute"
            top={topAsPercent}
            left={style?.xOffset}
            width={style?.width}
            height={style?.height}
            event={event}
            margin="-1px 4px 0 -1px"
        />
    );
};
