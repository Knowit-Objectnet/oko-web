import React from 'react';
import { ToolbarProps, View } from 'react-big-calendar';
import { Button, ButtonGroup, Heading, Icon, Stack } from '@chakra-ui/react';
import ArrowLeft from '../../../assets/ArrowLeft.svg';
import ArrowRight from '../../../assets/ArrowRight.svg';
import { ViewProperties, VIEWS } from '../hooks/useCalendarView';
import { IconButton } from '../../../components/buttons/IconButton';

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

export const CalendarToolbar: React.FC<ToolbarProps> = ({ onNavigate, label, view: currentView, onView }) => (
    <Stack direction="row" justifyContent="space-between" marginBottom={5}>
        <ButtonGroup size="sm">
            <IconButton
                // isRound
                icon={<Icon as={ArrowLeft} />}
                aria-label="Gå til forrige periode"
                onClick={() => {
                    onNavigate('PREV');
                }}
            />
            <Button
                size="sm"
                onClick={() => {
                    onNavigate('TODAY');
                }}
            >
                I dag
            </Button>
            <IconButton
                // isRound
                icon={<Icon as={ArrowRight} />}
                aria-label="Gå til neste periode"
                onClick={() => {
                    onNavigate('NEXT');
                }}
            />
        </ButtonGroup>
        <Stack direction="row" spacing={4} marginX="auto">
            <Heading as="h2" fontSize="1.75rem">
                {label}
            </Heading>
        </Stack>
        <ButtonGroup isAttached size="sm" aria-label="Visningsmodus">
            {Object.values(VIEWS).map((view: ViewProperties) => (
                <ViewToggleButton key={view.type} view={view} currentView={currentView} onViewChange={onView} />
            ))}
        </ButtonGroup>
    </Stack>
);
