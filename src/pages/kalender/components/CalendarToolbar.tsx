import React from 'react';
import { ToolbarProps, View } from 'react-big-calendar';
import { Button, ButtonGroup, Flex, Heading, Icon, Stack } from '@chakra-ui/react';
import ArrowLeft from '../../../assets/ArrowLeft.svg';
import ArrowRight from '../../../assets/ArrowRight.svg';
import { ViewProperties, VIEWS } from '../hooks/useCalendarView';
import { IconButton } from '../../../components/buttons/IconButton';
import { useCalendarState } from '../CalendarProvider';

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
        <Stack
            // direction={{ base: 'column', tablet: 'row' }}
            justifyContent="space-between"
            marginBottom={5}
            spacing="3"
            direction="row"
        >
            <ButtonGroup
                as={Flex}
                size="sm"
                // width={{ base: 'full', tablet: 'unset' }}
                justifyContent="center"
            >
                <IconButton
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
                    icon={<Icon as={ArrowRight} />}
                    aria-label="Gå til neste periode"
                    onClick={() => {
                        onNavigate('NEXT');
                    }}
                />
            </ButtonGroup>
            <Heading as="h2" fontSize="1.75rem" flexGrow={1} textAlign="center">
                {label}
            </Heading>
            {!shouldShowMobileView ? (
                <ButtonGroup isAttached size="sm" aria-label="Visningsmodus">
                    {Object.values(VIEWS).map((view: ViewProperties) => (
                        <ViewToggleButton key={view.type} view={view} currentView={currentView} onViewChange={onView} />
                    ))}
                </ButtonGroup>
            ) : null}
        </Stack>
    );
};
