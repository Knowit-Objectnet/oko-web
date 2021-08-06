import React from 'react';
import { ToolbarProps, View } from 'react-big-calendar';
import { Button, ButtonGroup, Flex, Heading, Icon } from '@chakra-ui/react';
import ArrowLeft from '../../../assets/ArrowLeft.svg';
import ArrowRight from '../../../assets/ArrowRight.svg';
import { ViewProperties, VIEWS } from '../hooks/useCalendarView';
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
        <Flex justifyContent="space-between" marginBottom={5} direction="row" flexWrap="wrap">
            <ButtonGroup
                as={Flex}
                size="sm"
                justifyContent="center"
                flexGrow={1}
                marginBottom={shouldShowMobileView ? '3' : '0'}
            >
                <Button
                    leftIcon={<Icon as={ArrowLeft} />}
                    aria-label="Gå til forrige periode"
                    onClick={() => {
                        onNavigate('PREV');
                    }}
                >
                    Forrige
                </Button>
                <Button
                    onClick={() => {
                        onNavigate('TODAY');
                    }}
                >
                    I dag
                </Button>
                <Button
                    rightIcon={<Icon as={ArrowRight} />}
                    aria-label="Gå til neste periode"
                    onClick={() => {
                        onNavigate('NEXT');
                    }}
                >
                    Neste
                </Button>
            </ButtonGroup>
            <Heading as="h1" fontSize="2xl" flexGrow={100} textAlign="center" fontWeight="medium">
                {label}
            </Heading>
            {!shouldShowMobileView ? (
                <ButtonGroup isAttached size="sm" aria-label="Visningsmodus" flexGrow={1}>
                    {Object.values(VIEWS).map((view: ViewProperties) => (
                        <ViewToggleButton key={view.type} view={view} currentView={currentView} onViewChange={onView} />
                    ))}
                </ButtonGroup>
            ) : null}
        </Flex>
    );
};
