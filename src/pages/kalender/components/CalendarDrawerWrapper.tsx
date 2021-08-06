import * as React from 'react';
import {
    Button,
    ButtonProps,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerOverlay,
    useBreakpointValue,
    useDisclosure,
} from '@chakra-ui/react';
import { useCalendarState } from '../CalendarProvider';

const DrawerTriggerButton: React.FC<ButtonProps> = ({ children, ...props }) => (
    <Button size="sm" {...props}>
        {children}
    </Button>
);

interface Props {
    triggerLabel: string;
    triggerIcon: React.ReactElement;
    footerCloseButtonLabel: string;
}

export const CalendarDrawerWrapper: React.FC<Props> = ({
    triggerIcon,
    triggerLabel,
    footerCloseButtonLabel,
    children,
}) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const { shouldHideSidebar } = useCalendarState();

    if (shouldHideSidebar) {
        return (
            <>
                <DrawerTriggerButton leftIcon={triggerIcon} onClick={onOpen} flexGrow={1} flexBasis="50%" minHeight="8">
                    {triggerLabel}
                </DrawerTriggerButton>
                <Drawer placement="left" isOpen={isOpen} onClose={onClose} blockScrollOnMount>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerBody padding="5">{children}</DrawerBody>
                        <DrawerFooter width="full">
                            <Button variant="outline" width="full" onClick={onClose}>
                                {footerCloseButtonLabel}
                            </Button>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </>
        );
    }

    return <>{children}</>;
};
