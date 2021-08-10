import React from 'react';
import { ToolbarProps, View } from 'react-big-calendar';
import { Button, ButtonGroup, Flex, Heading } from '@chakra-ui/react';
import { ViewProperties, VIEWS } from '../hooks/useCalendarView';
import { useCalendarState } from '../CalendarProvider';
import { DateNavigation } from './DateNavigation';

interface Props {
    view: ViewProperties;
    currentView: View;
    onViewChange: (view: View) => void;
}

const ViewToggleButton: React.FC<Props> = ({ view, currentView, onViewChange }) => (
    <Button
        onClick={() => {
            onViewChange(view.type);
        }}
        isActive={view.type === currentView}
    >
        {view.label}
    </Button>
);

export const CalendarToolbar: React.FC<ToolbarProps> = ({ onNavigate, label, view: currentView, onView }) => {
    const { shouldShowMobileView } = useCalendarState();

    return (
        <Flex justifyContent="space-between" marginBottom={4} direction="row" flexWrap="wrap">
            <Heading as="h1" fontSize="2xl" flexGrow={100} textAlign="center" fontWeight="medium" order={2}>
                {label}
            </Heading>
            <DateNavigation
                order={1}
                flexGrow={1}
                marginBottom={shouldShowMobileView ? '4' : '0'}
                onPrev={() => onNavigate('PREV')}
                onNext={() => onNavigate('NEXT')}
                onToday={() => onNavigate('TODAY')}
            />
            {!shouldShowMobileView ? (
                <ButtonGroup isAttached size="sm" aria-label="Visningsmodus" flexGrow={1} order={3}>
                    {Object.values(VIEWS).map((view: ViewProperties) => (
                        <ViewToggleButton key={view.type} view={view} currentView={currentView} onViewChange={onView} />
                    ))}
                </ButtonGroup>
            ) : null}
        </Flex>
    );
};
