import * as React from 'react';
import {
    Button,
    HStack,
    Icon,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Portal,
    Heading,
    Text,
} from '@chakra-ui/react';
import Warning from '../../assets/Warning.svg';
import { Box } from '@chakra-ui/layout';
import { FocusLock } from '@chakra-ui/focus-lock';

interface Props {
    message: {
        title: string;
        body?: string;
        buttonLabel: string;
    };
    onConfirm: () => Promise<unknown>;
    isLoading?: boolean;
}

/**
 * Drawer component that asks user to confirm an action on smaller screens.
 * Is used automatically as a replacement for popovers.
 */
export const ConfirmationDrawer: React.FC<Props> = ({ message, onConfirm, isLoading, children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const DrawerTrigger: React.FC = (props) => {
        const child: any = React.Children.only(props.children);
        return React.cloneElement(child, { onClick: onOpen });
    };

    const onDeleteConfirmation = () => {
        onConfirm().then(onClose);
    };

    return (
        <>
            <DrawerTrigger>{children}</DrawerTrigger>
            <Drawer isOpen={isOpen} onClose={onClose} placement="bottom">
                <Portal>
                    <DrawerContent>
                        <FocusLock>
                            <DrawerOverlay />
                            <DrawerContent>
                                <DrawerCloseButton />
                                <DrawerHeader borderBottomWidth="1px">
                                    <HStack spacing="3" alignItems="flex-start">
                                        <Icon as={Warning} marginTop="2px" />
                                        <Box paddingEnd="5">
                                            <Heading as="h2" fontWeight="medium" fontSize="md">
                                                {message.title}
                                            </Heading>
                                        </Box>
                                    </HStack>
                                </DrawerHeader>

                                {message.body ? (
                                    <DrawerBody>
                                        <Text fontSize="sm" paddingTop="1">
                                            {message.body}
                                        </Text>
                                    </DrawerBody>
                                ) : null}

                                <DrawerFooter>
                                    <Button
                                        width="full"
                                        size="sm"
                                        variant="warning"
                                        onClick={onDeleteConfirmation}
                                        isLoading={isLoading}
                                        loadingText="Vennligst vent..."
                                    >
                                        {message.buttonLabel}
                                    </Button>
                                </DrawerFooter>
                            </DrawerContent>
                        </FocusLock>
                    </DrawerContent>
                </Portal>
            </Drawer>
        </>
    );
};
