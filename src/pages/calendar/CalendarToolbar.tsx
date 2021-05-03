import React from 'react';
import { ToolbarProps } from 'react-big-calendar';
import { Button, ButtonGroup, Heading, Icon, IconButton, Stack } from '@chakra-ui/react';
import { CalendarView, useCalendar } from './CalendarProvider';
import ArrowLeft from '../../assets/ArrowLeft.svg';
import ArrowRight from '../../assets/ArrowRight.svg';
import { viewProperties } from './CalendarConfig';

const ViewToggleButton: React.FC<{ label: string; view: CalendarView }> = ({ label, view }) => {
    const { state, dispatch } = useCalendar();
    return (
        <Button
            fontWeight="normal"
            onClick={() => {
                dispatch({ type: 'SET_VIEW', view });
            }}
            isActive={state.selectedView === view}
        >
            {label}
        </Button>
    );
};

export const CalendarToolbar: React.FC<ToolbarProps> = ({ onNavigate, label, views }) => (
    <Stack direction="row" justifyContent="space-between" marginBottom={5}>
        <Button
            fontWeight="normal"
            size="sm"
            onClick={() => {
                onNavigate('TODAY');
            }}
        >
            I dag
        </Button>
        <Stack direction="row" spacing={4} marginX="auto">
            <IconButton
                isRound
                icon={<Icon as={ArrowLeft} />}
                aria-label="Gå til forrige periode"
                onClick={() => {
                    onNavigate('PREV');
                }}
            />
            <Heading as="h2" fontSize="1.75rem">
                {label}
            </Heading>
            <IconButton
                isRound
                icon={<Icon as={ArrowRight} />}
                aria-label="Gå til neste periode"
                onClick={() => {
                    onNavigate('NEXT');
                }}
            />
        </Stack>
        {/* TODO: change to useRadioGroup() in stead of ButtonGroup */}
        <ButtonGroup isAttached size="sm">
            {Object.values(views).map((view: CalendarView) => (
                <ViewToggleButton key={view} label={viewProperties[view].label} view={view} />
            ))}
        </ButtonGroup>
    </Stack>
);
