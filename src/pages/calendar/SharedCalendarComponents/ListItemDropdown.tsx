import * as React from 'react';
import styled from 'styled-components';
import { EventInfo, Colors } from '../../../types';
import { SingleDayCalendar } from '../../../sharedComponents/Calendar/SingleDayCalendar';
import { useState } from 'react';
import CalendarIcon from '../../../assets/Calendar.svg';
import ClickIcon from '../../../assets/Clock.svg';
import LocationIcon from '../../../assets/Location.svg';
import add from 'date-fns/add';

interface WrapperProps {
    color: Colors;
}

const Wrapper = styled.div<WrapperProps>`
    width: 100%;
    display: flex;
    border: solid 2px ${(props) => props.color};
    border-top: none;
    box-sizing: border-box;

    &:not(last-child) {
        margin-bottom: 2px;
    }
`;

interface CalendarProps {
    isEventSelected: boolean;
}

const Calendar = styled.div<CalendarProps>`
    width: ${(props) => (props.isEventSelected ? '40%' : '100%')};
`;

const Event = styled.div`
    width: 60%;
    display: flex;
    flex-direction: column;
`;

const Info = styled.div`
    flex: 1;
    display: flex;
`;

const Specifics = styled.div`
    width: 50%;
    padding: 10px;
    box-sizing: border-box;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    &:not(:last-child) {
        margin-bottom: 15px;
    }
`;

const Icon = styled.div`
    margin: 0px 15px 0px 0px;
`;

const Text = styled.div`
    height: 45px;
    flex: 1;
    background-color: ${Colors.LightBeige};
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Time = styled.div`
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
`;

const TimeText = styled.div`
    height: 45px;
    padding: 0px 5px;
    box-sizing: border-box;
    background-color: ${Colors.LightBeige};
    display: flex;
    align-items: center;
    justify-content: center;
`;

const MessageBox = styled.div`
    width: 50%;
    padding: 10px;
    box-sizing: border-box;
`;

const Message = styled.div`
    background-color: ${Colors.Yellow};
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 5px;
    box-sizing: border-box;
`;

const MessageText = styled.div`
    flex: 1;
`;

const MessageDate = styled.div`
    font-size: 8px;
    line-height: 11px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const Submission = styled.div`
    flex: 1;
    margin: 30px 0px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
`;

const Button = styled.button`
    background-color: ${Colors.Red};
    border: none;
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
    padding: 5px 40px;
`;

interface ListItemDropdownProps {
    events: Array<EventInfo>;
    date: Date;
    min: Date;
    max: Date;
    color: Colors;
}

export const ListItemDropdown: React.FC<ListItemDropdownProps> = (props) => {
    const [selectedEvent, setSelectedEvent] = useState<EventInfo | null>(null);
    const selectedEventResource = selectedEvent && selectedEvent.resource;

    const onSelectEvent = (event: EventInfo) => {
        setSelectedEvent(event);
    };

    let newMin = new Date(props.min);
    newMin = add(newMin, { hours: -1 });
    let newMax = new Date(props.max);
    newMax = add(newMax, { hours: 1 });

    return (
        <Wrapper color={props.color}>
            <Calendar isEventSelected={selectedEvent !== null}>
                <SingleDayCalendar
                    date={props.date}
                    columns={[undefined]}
                    min={newMin}
                    max={newMax}
                    onSelectEvent={onSelectEvent}
                    events={[props.events]}
                />
            </Calendar>
            {selectedEvent ? (
                <Event>
                    <Info>
                        <Specifics>
                            <Row>
                                <Icon>
                                    <CalendarIcon height="2em" />
                                </Icon>
                                <Text>
                                    {selectedEvent.start.toLocaleString('nb-NO', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric',
                                    })}
                                </Text>
                            </Row>
                            <Row>
                                <Icon>
                                    <ClickIcon height="2em" />
                                </Icon>
                                <Time>
                                    <TimeText>
                                        {selectedEvent.start.getHours().toString().padStart(2, '0') +
                                            ':' +
                                            selectedEvent.start.getMinutes().toString().padStart(2, '0')}
                                    </TimeText>
                                    <TimeText>
                                        {selectedEvent.end.getHours().toString().padStart(2, '0') +
                                            ':' +
                                            selectedEvent.end.getMinutes().toString().padStart(2, '0')}
                                    </TimeText>
                                </Time>
                            </Row>
                            <Row>
                                <Icon>
                                    <LocationIcon height="2em" />
                                </Icon>
                                <Text>{selectedEvent.resource?.location.name}</Text>
                            </Row>
                        </Specifics>
                        {selectedEventResource && selectedEventResource.message ? (
                            <MessageBox>
                                <Message>
                                    <MessageText>{selectedEventResource.message.text}</MessageText>
                                    <MessageDate>
                                        {selectedEventResource.message.start.toLocaleString('nb-NO', {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric',
                                        }) +
                                            ' - ' +
                                            selectedEventResource.message.end.toLocaleString('nb-NO', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric',
                                            })}
                                    </MessageDate>
                                </Message>
                            </MessageBox>
                        ) : null}
                    </Info>
                    <Submission>
                        <Button>Avlys</Button>
                    </Submission>
                </Event>
            ) : null}
        </Wrapper>
    );
};
