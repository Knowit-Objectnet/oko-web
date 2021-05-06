import React from 'react';
import { ToolbarProps, View } from 'react-big-calendar';
import { Button, ButtonGroup, Heading, Icon, IconButton, Stack } from '@chakra-ui/react';
import ArrowLeft from '../../assets/ArrowLeft.svg';
import ArrowRight from '../../assets/ArrowRight.svg';
import { calendarConfig, CalendarView } from './CalendarConfig';

interface Props {
    label: string;
    view: View;
    currentView: View;
    onViewChange: (view: View) => void;
}

const ViewToggleButton: React.FC<Props> = ({ label, view, currentView, onViewChange }) => (
    <Button
        fontWeight="normal"
        onClick={() => {
            onViewChange(view);
        }}
        isActive={view === currentView}
    >
        {label}
    </Button>
);

export const CalendarToolbar: React.FC<ToolbarProps> = ({ onNavigate, label, views, view: currentView, onView }) => (
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
                <ViewToggleButton
                    key={view}
                    label={calendarConfig.viewProperties[view].label}
                    view={view}
                    currentView={currentView}
                    onViewChange={onView}
                />
            ))}
        </ButtonGroup>
    </Stack>
);
